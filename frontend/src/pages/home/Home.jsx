import React, { useEffect, useState } from 'react'
import Table from './Table'
import Search from './Search'
import { Link } from 'react-router-dom'
import useGetAllClients from '../../hooks/useGetAllClients'

function Home() {
  const { loading, clients } = useGetAllClients()
  const [filteredClients, setFilteredClients] = useState([]);

  // Update filtered clients based on search query
  const handleSearch = (query) => {
    if (query) {
      const lowercasedQuery = query?.toLowerCase();
      const results = clients.filter(client =>
        client.clientName?.toLowerCase().includes(lowercasedQuery) ||
        client.clientId?.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredClients(results);
    } else {
      setFilteredClients(clients);
    }
  };

  // Default to showing all clients if no filter is applied
  useEffect(() => {
    setFilteredClients(clients);
  }, [clients]);

  // Handle client deletion
  const handleDelete = (deletedClientId) => {
    // Filter out the deleted client
    setFilteredClients(prevClients => prevClients.filter(client => client._id !== deletedClientId));
    // Optionally, refetch the client list to ensure consistency
    refetch();
  };



  return (
    <div className="px-4 w-full">
      <h1 className="text-lg font-bold my-4 text-center bg-blue-500 text-white p-4 rounded-t-lg">HARDIK TRADERS - CLIENT MANAGEMENT DASHBOARD</h1>
      <Search onSearch={handleSearch} />
      <div className="flex justify-center my-2 ">
        <Link to='/newjob'>
          <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded ">
            New Job Sheet
          </button>
        </Link>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table clients={filteredClients} onDelete={handleDelete} />
      )}

      <h3 className='text-sm my-4 text-center bg-blue-500 text-white p-4 rounded-b-lg'>@ 2024 Hardik Traders</h3>
    </div>
  )
}

export default Home
