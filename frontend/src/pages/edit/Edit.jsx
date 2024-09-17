import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import useUpdateClient from '../../hooks/useUpdateClient';
import useGetOneClient from '../../hooks/useGetOneClient';


//onClick open the update page
function Edit() {

  const { id } = useParams();
  const { updateJob, loading: updateLoading } = useUpdateClient();
  const { getClient, userData, loading: clientLoading } = useGetOneClient();

  const [formData, setFormData] = useState({
    clientName: '',
    contactInfo: '',
    receivedDate: '',
    inventoryReceived: '',
    inventoryImage: '',
    reportedIssues: '',
    clientNotes: '',
    assignedTechnician: '',
    Deadline: '',
    estimatedAmount: '',
    status: ''
  });

  useEffect(() => {
    if (id) {
      getClient(id);
    }
  }, [id, getClient]);

  useEffect(() => {
    if (userData) {
      setFormData({
        clientName: userData.clientName || '',
        contactInfo: userData.contactInfo || '',
        receivedDate: userData.receivedDate || '',
        inventoryReceived: userData.inventoryReceived || '',
        reportedIssues: userData.reportedIssues || '',
        clientNotes: userData.clientNotes || '',
        assignedTechnician: userData.assignedTechnician || '',
        Deadline: userData.Deadline || '',
        estimatedAmount: userData.estimatedAmount || '',
        status: userData.status || '',
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      inventoryImage: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    if (formData.inventoryImage instanceof File) {
      formDataToSend.append('inventoryImage', formData.inventoryImage);
    }
    await updateJob(id, formDataToSend);

    // Submit form logic here
  };

  if (clientLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-5 bg-white">
      <h2 className="text-2xl font-bold text-center rounded-t-lg text-white mb-4 w-full bg-blue-500 p-4">EDIT JOB SHEET</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Client Name:</label>
          <input type="text" name="clientName" value={formData.clientName} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Contact Info (Phone Number):</label>
          <input type="text" name="contactInfo" value={formData.contactInfo} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Received Date:</label>
          <input type="date" name="receivedDate" value={formData.receivedDate} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Inventory Received:</label>
          <input type="text" name="inventoryReceived" value={formData.inventoryReceived} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Upload Inventory Image/Document/Video:</label>
          <input type="file" name="inventoryImage" onChange={handleFileChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Reported Issues:</label>
          <textarea name="reportedIssues" value={formData.reportedIssues} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="3"></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Client Notes:</label>
          <textarea name="clientNotes" value={formData.clientNotes} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="3"></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Assigned Technician:</label>
          <input type="text" name="assignedTechnician" value={formData.assignedTechnician} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Deadline:</label>
          <input type="date" name="Deadline" value={formData.Deadline} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Estimated Amount:</label>
          <input type="text" name="estimatedAmount" value={formData.estimatedAmount} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Status:</label>
          <select name="status" value={formData.status} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${updateLoading ? 'opacity-50 cursor-not-allowed' : ''}`} type="submit" disabled={updateLoading}>
            {updateLoading ? 'Updating...' : 'Save Changes'}
          </button>
        </div>
        <Link to="/" className='flex items-center justify-center text-blue-500 hover:text-blue-700 font-bold mt-2'>
          Cancel
        </Link>
      </form>
    </div>
  )
}

export default Edit
