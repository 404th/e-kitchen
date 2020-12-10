import { useState, useCallback } from 'react'
import axios from 'axios'
// url, method, data, headers
export const useHttp = () => {
  
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(null)

  const information = useCallback(
    async function ( url, method="GET", data=null, headers={} ) {
    setLoading(true)
    try {
      const info = await axios( { url, method, data, headers } )
      setLoading(false)
      return info
    } catch(err) {
      setError(err.message || "Something went wrong!")
      setLoading(false)
      throw err
    }
  },
    [  ],
  )
  const clearError = () => setError(null)
  return ({
    loading,
    information,
    error,
    clearError
  })
}




