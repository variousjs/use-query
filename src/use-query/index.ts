import { useEffect, useRef, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

const useQuery = (
  format?: Record<string, 'array' | 'number'>,
) => {
  const history = useHistory()
  const { search } = useLocation()
  const queryArgs = useRef<Record<string, any>>({})
  const [query, setQuery] = useState<Record<string, any>>()

  useEffect(() => {
    const searchValue = new URLSearchParams(search)
    const next = {} as Record<string, string | string[] | number | undefined>
    for (const [key, value] of searchValue.entries()) {
      next[key] = value
    }

    if (format) {
      Object.keys(format).forEach((key) => {
        const type = format[key]
        const current = next[key] as string
        if (current === undefined) {
          return
        }
        if (type === 'array') {
          next[key] = current.includes(',') ? current.split(',') : undefined
        }
        if (type === 'number') {
          next[key] = Number(current) || undefined
        }
      })
    }

    queryArgs.current = next
    setQuery(next)
  }, [search])

  const set = (args: Record<string, any>, replace?: boolean) => {
    if (replace) {
      queryArgs.current = args
    } else {
      queryArgs.current = { ...queryArgs.current, ...args }
    }
    const query = new URLSearchParams(queryArgs.current)
    history.replace({ search: query.toString() })
  }

  return [query, set] as [typeof query, typeof set]
}

export default useQuery
