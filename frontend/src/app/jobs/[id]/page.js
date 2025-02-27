// src/app/jobs/[id]/page.js

'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchJobDetails, applyToJob } from '../../../lib/api';

export default function JobDetailPage() {
  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function getJob() {
      const data = await fetchJobDetails(id);
      setJob(data);
    }
    if (id) getJob();
  }, [id]);

  const handleApply = async () => {
    const response = await applyToJob(id);
    if (response.success) {
      setApplied(true);
    }
  };

  if (!job) return <div>Loading...</div>;

  return (
    <div>
      <h2>{job.title}</h2>
      <p>{job.description}</p>
      <button onClick={handleApply} disabled={applied}>
        {applied ? 'Applied' : 'Apply'}
      </button>
    </div>
  );
}
