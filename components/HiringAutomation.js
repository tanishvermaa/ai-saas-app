import { useState } from "react";
import { Button, Card, CardContent } from "@mui/material";
import axios from "axios";

export default function HiringAutomation() {
  const [candidates, setCandidates] = useState([]);

  const fetchCandidates = async () => {
    const res = await axios.get("https://api.linkedin.com/v2/jobSearch", {
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID}` }
    });
    setCandidates(res.data);
  };

  return (
    <Card>
      <CardContent>
        <h2>Hiring Automation</h2>
        <Button onClick={fetchCandidates}>Find Candidates</Button>
        <ul>
          {candidates.map((candidate, index) => (
            <li key={index}>{candidate.name}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
