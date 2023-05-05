import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import useQuery from './use-query'

const random = () => Math.ceil((Math.random() * (10 - 1) + 1))

const Entry = () => {
  const [query, setQuery] = useQuery<{
    ids?: number[],
    size?: number,
    next?: number,
  }>({
    ids: 'number[]',
    size: 'number',
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
          setQuery({ ids: [random(), random()], size: random() })
        }}
      >
        Random
      </button>
      {
        query?.size ? <button
          style={{ marginLeft: 10 }}
          onClick={() => {
            setQuery({ next: random() })
          }}
        >
          Append
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
    <HashRouter>
      <Entry />
    </HashRouter>
  </React.StrictMode>,
)
