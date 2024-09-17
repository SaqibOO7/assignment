import { useState } from "react"
import toast from 'react-hot-toast';

const useUpdateClient = () => {
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState();

  const updateJob = async(id, formData) => {
    setLoading(true)
    try {
        const res = await fetch(`/api/v1/user/update/${id}`, {
            method: "PATCH",
            body: formData,
            headers: {
                'Content-type': 'application/json'
            }
        })

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
  }
  return {updateJob, userData, loading}
}

export default useUpdateClient
