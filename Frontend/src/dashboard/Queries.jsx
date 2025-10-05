import React, { useState } from "react";
import axios from "axios";

function Queries() {
  const [contacts, setContacts] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToggleTable = async () => {
    if (showTable) {
      // If table is already shown, just hide it
      setShowTable(false);
    } else {
      // If table is hidden, fetch data and show it
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:4001/api/contact");
        setContacts(res.data);
        setShowTable(true);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <div className="ml-100 p-6 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>

        <button
          onClick={handleToggleTable}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Loading..." : showTable ? "Close Table" : "See Queries"}
        </button>

        {showTable && (
          <div className="bg-white shadow rounded-lg p-4">
            {contacts.length === 0 ? (
              <p>No messages yet.</p>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Email</th>
                    <th className="p-2 border">Message</th>
                    <th className="p-2 border">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact._id} className="hover:bg-gray-100">
                      <td className="p-2 border">{contact.name}</td>
                      <td className="p-2 border">{contact.email}</td>
                      <td className="p-2 border">{contact.message}</td>
                      <td className="p-2 border">
                        {new Date(contact.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Queries;
