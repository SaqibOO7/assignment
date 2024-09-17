import { useEffect, useState } from "react"
import toast from 'react-hot-toast';

const useGetAllClients = () => {
    const [loading, setLoading] = useState(false);
    const [clients, setClients] = useState([])

    useEffect(() => {
        const getAllClients = async () => {
            setLoading(true)
            try {
                const res = await fetch("/api/v1/user")
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error)
                }
                setClients(data);

            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false);
            }
        }
        getAllClients();
    }, [])

    return { loading, clients }
}

export default useGetAllClients
