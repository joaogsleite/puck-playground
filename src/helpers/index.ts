/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'

export function isServer() {
  return typeof window === 'undefined'
}

export function useHybrid<A, R>(promise: (args: A) => Promise<R>, args: A) {
  if (isServer()) {
    return React.use(promise(args))
  } else {
    const [data, setData] = React.useState<R>()
    React.useEffect(() => {
      promise(args).then((data) => setData(data))
    }, [promise, args])
    return data
  }
}