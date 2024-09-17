import React, { useState } from 'react'
import toast from 'react-hot-toast';

const useSaveNote = () => {
    const [loading, setLoading] = useState(false);

    const saveNotes = async (clientId, content) => {
        console.log(clientId, content)
        setLoading(true);
        try {
            const res = await fetch(`/api/v1/user/note/${clientId}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content })
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error)
            }

            toast.success('Note saved successfully!');

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, saveNotes }
}

export default useSaveNote
