import { useEffect, useRef, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

type QueryObject = Record<string, string | number | string[] | number[] | undefined>
type Types<T extends QueryObject> = Record<
  keyof T,
  'string[]' | 'number' | 'string' | 'number[]'
>

function useQuery<T extends QueryObject>(types?: Partial<Types<T>>) {
  const history = useHistory()
  const { search } = useLocation()
  const queryArgs = useRef<QueryObject>({})
  const [query, setQuery] = useState<QueryObject>()

  useEffect(() => {
    const searchValue = new URLSearchParams(search)
    const next = {} as QueryObject
    for (const [key, value] of searchValue.entries()) {
      next[key] = value
    }

    if (types) {
      Object.keys(types).forEach((key) => {
        const type = types[key]
        const current = next[key] as string
        if (current === undefined) {
          return
        }
        if (type === 'string[]' || type === 'number[]') {
          next[key] = current.includes(',') ? current.split(',') : undefined
          if (next[key] && type === 'number[]') {
            next[key] = (next[key] as string[]).map((t) => Number(t))
          }
        }
        if (type === 'number') {
          next[key] = Number(current) || undefined
        }
      })
    }

    queryArgs.current = next
    setQuery(next)
  }, [search])

  const set = (args: T, replace?: boolean) => {
    const next = replace ? args : { ...queryArgs.current, ...args }
    queryArgs.current = next
    const query = new URLSearchParams(next as Record<string, any>)
    history.replace({ search: query.toString() })
  }

  return [query, set] as [T | undefined, typeof set]
}

export default useQuery
