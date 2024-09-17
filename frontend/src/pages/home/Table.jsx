import React from 'react'
import { Link } from 'react-router-dom'
import useDeleteClient from '../../hooks/useDeleteClient';

function Table({ clients, onDelete }) {
    const {deleteJob, Dloading} = useDeleteClient()

    const handleDeleteClick = async (id) => {
        if (window.confirm("Are you sure you want to delete this client?")) {
            try {
                await deleteJob(id);
                // Notify parent component about deletion
                onDelete(id);
            } catch (error) {
                console.error("Failed to delete client:", error);
            }
        }
    };

    return (

        <div className="overflow-x-auto w-full">
        <table className="table-fixed w-full my-4">
            <thead>
                <tr className="bg-blue-500 text-white text-sm">
                    <th className="w-10 px-4 py-2">#</th>
                    <th className="w-40 px-4 py-2">Client Id</th>
                    <th className="w-40 px-4 py-2">Client Name</th>
                    <th className="w-40 px-4 py-2">Contact Info</th>
                    <th className="w-40 px-4 py-2">Received Date</th>
                    <th className="w-40 px-4 py-2">Inventory Received</th>
                    <th className="w-40 px-4 py-2">Reported Issues</th>
                    <th className="w-40 px-4 py-2">Client Notes</th>
                    <th className="w-40 px-4 py-2">Assigned Technician</th>
                    <th className="w-40 px-4 py-2">Estimated Amount</th>
                    <th className="w-40 px-4 py-2">Deadline</th>
                    <th className="w-40 px-4 py-2">Status</th>
                    <th className="w-40 px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {/* Example row */}


                {clients.length === 0 ? (
                    <tr>
                        <td colSpan="13" className="text-center py-4">No clients found.</td>
                    </tr>
                ) : (
                    clients.map((client, index) => (
                        <tr key={client._id}>
                            <td className="border px-4 py-2 whitespace-normal break-words">{index + 1}</td>
                            <td className="border px-4 py-2 whitespace-normal break-words">{client._id}</td>
                            <td className="border px-4 py-2 whitespace-normal break-words">{client.clientName}</td>
                            <td className="border px-4 py-2 whitespace-normal break-words">{client.contactInfo}</td>
                            <td className="border px-4 py-2 whitespace-normal break-words">{new Date(client.receivedDate).toLocaleDateString()}</td>
                            <td className="border px-4 py-2 whitespace-normal break-words">{client.inventoryReceived}</td>
                            <td className="border px-4 py-2 whitespace-normal break-words">{client.reportedIssues}</td>
                            <td className="border px-4 py-2 whitespace-normal break-words">{client.clientNotes}</td>
                            <td className="border px-4 py-2 whitespace-normal break-words">{client.assignedTechnician}</td>
                            <td className="border px-4 py-2 whitespace-normal break-words">{client.estimatedAmount}</td>
                            <td className="border px-4 py-2 whitespace-normal break-words">{new Date(client.Deadline).toLocaleDateString()}</td>
                            <td className="border px-4 py-2 whitespace-normal break-words">{client.status}</td>
                            <td className="border px-4 py-2 whitespace-normal break-words">
                                <div className='flex gap-1'>
                                    <Link to={`/view/${client._id}`}>
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded">
                                            View
                                        </button>
                                    </Link>
                                    <Link to={`/edit/${client._id}`}>
                                        <button
                                            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-1 rounded"
                                        >Edit</button>
                                    </Link>
                                    <button
                                        className={`bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-1 rounded ${Dloading ? "cursor-not-allowed" : ""}`}
                                        onClick={() => handleDeleteClick(client._id)}
                                        disabled={Dloading}
                                    >Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))
                )}

            </tbody>
        </table >
        </div>
    )
}

export default Table
