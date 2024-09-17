import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast';

const useGetOneClient = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState();

  const getClient = useCallback(async(id) => {
    setLoading(true)
    try {
        const res = await fetch(`/api/v1/user/getjob/${id}`)
        const data = await res.json();
        if(data.error){
            throw new Error(data.error)
        }
        setUserData(data);

    } catch (error) {
        toast.error(error.message);
    } finally {
        setLoading(false);
    }
  }, [])
  
  return {loading, getClient, userData};
}

export default useGetOneClient
