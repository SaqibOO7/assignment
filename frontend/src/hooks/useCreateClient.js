import { useState } from 'react'
import toast from 'react-hot-toast';

const useCreateClient = () => {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState()

    const createJob = async (formData) => {
        setLoading(true)
        try {
            const res = await fetch("/api/v1/user/save", {
                method: "POST",
                body: formData,
            })

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error)
            }
            setUserData(data);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { createJob, loading, userData }

}

export default useCreateClient
