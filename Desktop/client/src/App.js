import React, { useEffect, useState } from "react";

function App() {
  const [leads, setLeads] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    source: "",
    notes: "",
    followUpDate: ""
  });
  const [search, setSearch] = useState("");

  const API = "http://localhost:5002/api/leads";

  // Fetch
  const fetchLeads = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();

      // ✅ Prevent crash if API response is wrong
      if (Array.isArray(data)) {
        setLeads(data);
      } else {
        console.error("Unexpected response:", data);
        setLeads([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setLeads([]);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Add
  const addLead = async () => {
    if (!form.name || !form.email) return;

    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...form, status: "New" })
    });

    setForm({
      name: "",
      email: "",
      phone: "",
      source: "",
      notes: "",
      followUpDate: ""
    });

    fetchLeads();
  };

  // Update
  const updateStatus = async (id, newStatus, followUpDate) => {
    try {
      await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          status: newStatus,
          followUpDate: followUpDate
        })
      });

      fetchLeads();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  // Delete
  const deleteLead = async (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchLeads();
  };

  // Filter
  const filtered = leads.filter((l) => {
    const name = (l.name || "").toLowerCase();
    const email = (l.email || "").toLowerCase();
    const term = search.toLowerCase();

    return name.includes(term) || email.includes(term);
  });

  console.log("Leads:", leads); // ✅ debug

  return (
    <div style={{ background: "#1e293b", minHeight: "100vh", color: "white", padding: "20px" }}>
      <div className="container">

        {/* ✅ Debug heading (keep for now) */}
        <h1>App Loaded</h1>

        <h2 className="text-center mb-4">Mini CRM</h2>

        {/* FORM */}
        <div className="card p-3 mb-4" style={{ background: "#334155", color: "white" }}>
          <div className="row g-2">
            <div className="col">
              <input
                className="form-control"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="col">
              <input
                className="form-control"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="col">
              <input
                className="form-control"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>

            <div className="col">
              <input
                className="form-control"
                placeholder="Source"
                value={form.source}
                onChange={(e) => setForm({ ...form, source: e.target.value })}
              />
            </div>

            <div className="col">
              <input
                className="form-control"
                placeholder="Notes"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>

            <div className="col">
              <input
                type="date"
                className="form-control"
                value={form.followUpDate}
                onChange={(e) => setForm({ ...form, followUpDate: e.target.value })}
              />
            </div>

            <div className="col">
              <button className="btn btn-success w-100" onClick={addLead}>
                Add
              </button>
            </div>
          </div>
        </div>

        {/* SEARCH */}
        <input
          className="form-control mb-3"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* LIST */}
        {filtered.length === 0 && <p>No leads found</p>}

        {filtered.map((lead) => (
          <div key={lead._id} className="card p-3 mb-3 shadow" style={{ background: "#475569", color: "white" }}>
            <h5>{lead.name}</h5>
            <p>{lead.email} | {lead.phone}</p>

            <p>Source: {lead.source}</p>
            <p>Notes: {lead.notes}</p>
            <p>Follow-up: {lead.followUpDate?.slice(0, 10)}</p>

            <p>Status: <b>{lead.status || "New"}</b></p>

            <div className="d-flex gap-2">

              <select
                className="form-select form-select-sm w-auto"
                value={lead.status || "New"}
                onChange={(e) =>
                  updateStatus(lead._id, e.target.value, lead.followUpDate)
                }
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Converted">Converted</option>
              </select>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteLead(lead._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default App;