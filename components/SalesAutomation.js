// components/SalesAutomation.js
import { useState } from "react";
import { Button, TextField, Card, CardContent } from "@mui/material";
import axios from "axios";

export default function SalesAutomation() {
  const [leads, setLeads] = useState([]);
  const [query, setQuery] = useState("");

  const fetchLeads = async () => {
    const res = await axios.get("https://api.zoominfo.com/companies/search", {
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_ZOOMINFO_API_KEY}` }
    });
    setLeads(res.data);
  };

  return (
    <Card>
      <CardContent>
        <h2>Sales Automation</h2>
        <TextField label="Search Leads" value={query} onChange={(e) => setQuery(e.target.value)} />
        <Button onClick={fetchLeads}>Fetch Leads</Button>
        <ul>
          {leads.map((lead, index) => (
            <li key={index}>{lead.name}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
