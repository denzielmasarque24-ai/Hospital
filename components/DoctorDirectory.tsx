"use client";

import { useMemo, useState } from "react";

import { DoctorCard } from "./DoctorCard";

const doctors = [
  {
    name: "Dr. Emily Carter",
    specialty: "Cardiology",
    experience: "12 years experience",
    availability: "Available Today",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Dr. Thomas Reed",
    specialty: "Neurology",
    experience: "10 years experience",
    availability: "Available Tomorrow",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Dr. Olivia Nguyen",
    specialty: "Pediatrics",
    experience: "9 years experience",
    availability: "Available This Week",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Dr. Daniel Brooks",
    specialty: "Internal Medicine",
    experience: "14 years experience",
    availability: "Available Monday",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Dr. Sophia Patel",
    specialty: "Dermatology",
    experience: "8 years experience",
    availability: "Available Friday",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Dr. Henry Lewis",
    specialty: "Cardiology",
    experience: "11 years experience",
    availability: "Available Today",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80",
  },
];

export function DoctorDirectory() {
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState("All");

  const specialties = [
    "All",
    "Cardiology",
    "Neurology",
    "Pediatrics",
    "Internal Medicine",
    "Dermatology",
  ];

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesSpecialty = specialty === "All" || doctor.specialty === specialty;
      const search = query.toLowerCase();
      const matchesQuery =
        doctor.name.toLowerCase().includes(search) ||
        doctor.specialty.toLowerCase().includes(search);

      return matchesSpecialty && matchesQuery;
    });
  }, [query, specialty]);

  return (
    <div className="catalog-shell">
      <div className="catalog-controls">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search doctors"
          aria-label="Search doctors"
        />

        <div className="category-filter" aria-label="Choose doctor specialty">
          {specialties.map((item) => (
            <button
              key={item}
              type="button"
              className={specialty === item ? "filter-chip active" : "filter-chip"}
              onClick={() => setSpecialty(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="doctor-grid">
        {filteredDoctors.map((doctor) => (
          <DoctorCard
            key={doctor.name}
            name={doctor.name}
            specialty={doctor.specialty}
            experience={doctor.experience}
            availability={doctor.availability}
            image={doctor.image}
          />
        ))}
      </div>

      {filteredDoctors.length === 0 ? (
        <div className="empty-state">No doctors match your search.</div>
      ) : null}
    </div>
  );
}
