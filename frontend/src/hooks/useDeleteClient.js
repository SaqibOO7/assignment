import { useState } from "react"
import toast from 'react-hot-toast';


const useDeleteClient = () => {
    const[Dloading, setDLoading] = useState(false);

    const deleteJob = async(clientId) => {
        setDLoading(true)
        try {
            
            const res = await fetch(`/api/v1/user/delete/${clientId}`, {
                method: "DELETE",
                headers: {
                    'Content-type': 'application/json'
                }
            })

            const data = await res.json();
            if(data.error){
                throw new Error(data.error)
            }

        } catch (error) {
            toast.error(error.message);
        } finally {
            setDLoading(false);
        }
    }
    return {deleteJob, Dloading}
  
}

export default useDeleteClient
