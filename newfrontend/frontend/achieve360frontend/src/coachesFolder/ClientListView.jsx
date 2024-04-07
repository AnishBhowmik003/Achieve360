import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ClientListView() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Placeholder for fetching client list from the API
    setClients([{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }]);
  }, []);

  return (
    <div>
      <h2>Client List</h2>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            <Link to={`/client/${client.id}`}>{client.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientListView;
