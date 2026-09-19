"use client";

import { useState } from "react";

const jobs = [
  {
    title: "Medical Representative",
    department: "Sales & Business Development",
    location: "New York",
    type: "Full-time",
    description: "Drive product awareness and support clinics with tailored pharmaceutical solutions.",
  },
  {
    title: "Registered Pharmacist",
    department: "Pharmacy",
    location: "Brooklyn",
    type: "Full-time",
    description: "Support prescription fulfillment and patient counseling in our modern outpatient pharmacy.",
  },
  {
    title: "Laboratory Technician",
    department: "Diagnostics",
    location: "Queens",
    type: "Full-time",
    description: "Perform laboratory analyses with precision and maintain high-quality testing protocols.",
  },
  {
    title: "Nurse",
    department: "Clinical Care",
    location: "Manhattan",
    type: "Part-time",
    description: "Assist patients, coordinate care plans, and ensure smooth day-to-day clinical operations.",
  },
  {
    title: "IT Support Specialist",
    department: "Technology",
    location: "Remote",
    type: "Full-time",
    description: "Provide dependable IT support across healthcare systems and operational technology tools.",
  },
  {
    title: "Administrative Assistant",
    department: "Operations",
    location: "New Jersey",
    type: "Contract",
    description: "Coordinate appointments, records, and administrative support across departments.",
  },
];

export function CareersBoard() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="careers-wrap">
      <div className="job-list">
        {jobs.map((job) => (
          <article key={job.title} className="job-card">
            <div className="job-topline">
              <div>
                <h3>{job.title}</h3>
                <span>{job.department}</span>
              </div>
              <span className="job-type">{job.type}</span>
            </div>

            <div className="job-meta">
              <span>{job.location}</span>
            </div>

            <p>{job.description}</p>

            <button type="button" className="btn-primary compact" onClick={() => setSelected(job.title)}>
              Apply Now
            </button>
          </article>
        ))}
      </div>

      {selected ? (
        <div className="job-modal" aria-live="polite">
          <div className="job-modal-box">
            <h3>Application for {selected}</h3>
            <p>Submit your resume and details below. This is a frontend-only demo form.</p>
            <form className="modal-form">
              <label>
                <span>Full Name</span>
                <input type="text" placeholder="Your name" required />
              </label>
              <label>
                <span>Email</span>
                <input type="email" placeholder="you@example.com" required />
              </label>
              <label>
                <span>Resume Link</span>
                <input type="text" placeholder="https://" required />
              </label>
              <button type="button" className="btn-primary compact" onClick={() => setSelected(null)}>
                Submit Application
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
