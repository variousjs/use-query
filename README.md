# use-query

use url query params

https://variousjs.github.io/use-query/

## Install

```bash
npm i @variousjs/use-query
```

## Usage

```tsx
import React, { useEffect } from 'react'
import useQuery from '@variousjs/use-query'

interface Query {
  ids: number[],
  size: string,
}

export default () => {
  const [query, setQuery] = useQuery<Query>({
    ids: 'number[]',
    size: 'string',
  })

  useEffect(() => {
    if (!query) {
      return
    }

    console.log(query)
  }, [query])

  retrun (
    <div>
      <button
        onClick={() => {
          setQuery({
            ids: [1, 2],
            size: 'sabc',
          })
        }}
      >
        Set
      </button>
    </div>
  )
}
```

## API

```ts
type QueryObject = Record<string, string | number | string[] | number[] | undefined>

type Types<T extends QueryObject> = Record<keyof T, 'string[]' | 'number' | 'string' | 'number[]'>

function useQuery<T extends QueryObject>(
  types?: Partial<Types<T>>
): [
  Partial<T> | undefined,
  (args: Partial<T>, replace?: boolean) => void
]
```
