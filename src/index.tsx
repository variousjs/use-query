import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import useQuery from './use-query'

const random = () => Math.ceil((Math.random() * (10 - 1) + 1))

const Entry = () => {
  const [query, setQuery] = useQuery<{
    ids: number[],
    names: string[],
    size: number,
    next: string,
  }>({
    ids: 'number[]',
    size: 'number',
    next: 'string',
    names: 'string[]',
  })

  useEffect(() => {
    if (!query) {
      return
    }

    console.log(query)
  }, [query])

  return (
    <div style={{ padding: 50 }}>
      <h3>Query Params</h3>
      {
        query ? <pre style={{ padding: 10, borderRadius: 5, border: '1px solid #444', minWidth: 300 }}>
          {JSON.stringify(query, null, 2)}
        </pre> : null
      }
      <button
        onClick={() => {
          setQuery({
            ids: [random(), random()],
            size: random(),
            names: random() > 5 ? [random().toString(), random().toString()] : [],
            next: undefined,
          })
        }}
      >
        Random
      </button>
      {
        query && !query.next ? <button
          style={{ marginLeft: 10 }}
          onClick={() => {
            setQuery({ next: random().toString() })
          }}
        >
          Append
        </button> : null
      }
      {
        query?.next ? <button
          style={{ marginLeft: 10 }}
          onClick={() => {
            const { next, ...rest } = query
            setQuery(rest, true)
          }}
        >
          Subtract
        </button> : null
      }
      <button
        style={{ marginLeft: 10 }}
        onClick={() => {
          setQuery({}, true)
        }}
      >
        Reset
      </button>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Entry />
    </Router>
  </React.StrictMode>,
)
