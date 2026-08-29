import { useEffect, useState } from "react";
import api from "../api/api";

function AdminUsers() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingUsers = async () => {
    try {
      const res = await api.get("/api/auth/pending-users");
      setPendingUsers(res.data.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const handleApprove = async (id) => {
    try {
      await api.put(`/api/auth/approve-user/${id}`);
      alert("User Approved Successfully! ✅");
      setPendingUsers(pendingUsers.filter((u) => u._id !== id));
    } catch (err) {
      alert("Failed to approve user");
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm("Reject and delete this signup request?")) return;
    try {
      await api.delete(`/api/auth/reject-user/${id}`);
      alert("User Rejected ❌");
      setPendingUsers(pendingUsers.filter((u) => u._id !== id));
    } catch (err) {
      alert("Failed to reject user");
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "800px", margin: "auto" }}>
      <h2>Pending User Approval Requests</h2>

      {loading ? (
        <p>Loading pending users...</p>
      ) : pendingUsers.length === 0 ? (
        <p>No pending user requests.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => handleApprove(user._id)}
                    style={{ backgroundColor: "#22c55e", color: "#fff", border: "none", padding: "6px 12px", marginRight: "10px", borderRadius: "4px", cursor: "pointer" }}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(user._id)}
                    style={{ backgroundColor: "#ef4444", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminUsers;