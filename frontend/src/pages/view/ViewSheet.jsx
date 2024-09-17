import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import useGetOneClient from '../../hooks/useGetOneClient';
import useDeleteClient from '../../hooks/useDeleteClient';
import useSaveNote from '../../hooks/useSaveNote';

function ViewSheet() {

  const { id } = useParams(); // Get client ID from URL
  const { loading, getClient, userData } = useGetOneClient()
  const { deleteJob, Dloading } = useDeleteClient()
  const { loading: noteLoading, saveNotes } = useSaveNote();

  const [noteContent, setNoteContent] = useState();

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        await deleteJob(id);
        // Notify parent component about deletion
      } catch (error) {
        console.error("Failed to delete client:", error);
      }
    }
  };

  const handleSaveNote = async () => {
    try {
      await saveNotes(id, noteContent);
    } catch (error) {
      console.error("Failed to save note:", error);
    }
  }

  console.log(userData?.notes?.content)

  useEffect(() => {
    if (id) {
      getClient(id);
    }
  }, [id]);


  // Set the note content when userData is available
  useEffect(() => {
    if (userData?.notes?.content) {
      setNoteContent(userData?.notes?.content);
    }
    else {
      setNoteContent("")
    }
  }, [userData]);


  // Function to handle printing the note
  const handlePrint = () => {
    window.print();
  };



  if (loading) {
    return <div>Loading...</div>;
  }

  // if (!userData) {
  //   return <div>No data available</div>;
  // }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div id="job-sheet" className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-white bg-blue-900 p-4 text-center rounded-t-lg">
          VIEW JOB SHEET
        </h1>
        <div className="border border-gray-200">
          <table className="max-w-4xl bg-white">
            <tbody>
              <tr>
                <td className="border bg-blue-900 text-white font-semibold p-2">Client Name:</td>
                <td className="border p-2">{userData?.clientName}</td>
              </tr>
              <tr>
                <td className="border bg-blue-900 text-white font-semibold p-2">Contact Info:</td>
                <td className="border p-2">{userData?.contactInfo}</td>
              </tr>
              <tr>
                <td className="border bg-blue-900 text-white font-semibold p-2">Received Date:</td>
                <td className="border p-2">{new Date(userData?.receivedDate).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td className="border bg-blue-900 text-white font-semibold p-2">Inventory Received:</td>
                <td className="border p-2">{userData?.inventoryReceived}</td>
              </tr>
              <tr>
                <td className="border bg-blue-900 text-white font-semibold p-2">Inventory Image/Document/Video:</td>
                <td className="border p-2">
                  {userData?.inventoryImage ? (
                    userData.inventoryImage.endsWith('.pdf') ? (
                      <a
                        href={userData.inventoryImage}
                        download // This will trigger download for PDFs
                        className="text-blue-600 hover:underline"
                      >
                        View File
                      </a>
                    ) : (
                      <a
                        href={userData.inventoryImage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View File
                      </a>
                    )
                  ) : (
                    <span>No file available</span>
                  )}
                </td>
              </tr>
              <tr>
                <td className="border bg-blue-900 text-white font-semibold p-2">Reported Issues:</td>
                <td className="border p-2">{userData?.reportedIssues}</td>
              </tr>
              <tr>
                <td className="border bg-blue-900 text-white font-semibold p-2">Client Notes:</td>
                <td className="border p-2">{userData?.clientNotes}</td>
              </tr>
              <tr>
                <td className="border bg-blue-900 text-white font-semibold p-2">Assigned Technician:</td>
                <td className="border p-2">{userData?.assignedTechnician}</td>
              </tr>
              <tr>
                <td className="border bg-blue-900 text-white font-semibold p-2">Estimated Amount:</td>
                <td className="border p-2">{userData?.estimatedAmount}</td>
              </tr>
              <tr>
                <td className="border bg-blue-900 text-white font-semibold p-2">Deadline:</td>
                <td className="border p-2">{new Date(userData?.Deadline).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td className="border bg-blue-900 text-white font-semibold p-2">Status:</td>
                <td className="border p-2">{userData?.status}</td>
              </tr>
            </tbody>
          </table>
          <div className="p-4">
            <label htmlFor="note" className="block mb-2">Add or Update Note:</label>
            <textarea
              id="note"
              rows="4"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your note here"
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
            ></textarea>
          </div>
        </div>


        <button
          onClick={handleSaveNote}
          className="mt-3 bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-800 w-full"
          disabled={noteLoading}
        >
          {noteLoading ? 'Saving...' : 'Save Note'}
        </button>



        <div className="mt-4 flex justify-between">
          <Link to={`/edit/${id}`}>
            <button className="text-blue-600 hover:underline">Edit</button>
          </Link>
          <button className="text-blue-600 hover:underline"

            onClick={() => handleDeleteClick(id)}
            disabled={Dloading}
          >
            Delete
          </button>
        </div>

        <div className="mt-2 text-center">
          <Link to="/">
            <button className="text-blue-600 hover:underline">Back</button>
          </Link>
        </div>

        <div className='flex justify-end'>
          <button
            onClick={handlePrint}
            className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-blue-800 h-full"
          >
            Print / Save as PDF
          </button>
        </div>
      </div>
    </div>
  )
}

export default ViewSheet
