import React, { useState } from 'react'

function Search({ onSearch }) {

    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <div className="flex gap-2">
            <input
                className="shadow appearance-none border rounded py-2 px-3 text-grey-darker w-full"
                type="text"
                placeholder="Search by Client Name or ID..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                onClick={handleSearch}
            >
                Search
            </button>
        </div>
    )
}

export default Search
