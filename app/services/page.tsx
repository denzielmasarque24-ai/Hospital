import type { Metadata } from "next";
import Link from "next/link";

import { SectionTitle } from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "MediWell Healthcare Services",
  description: "Explore MediWell Pharma healthcare services including pharmacy, diagnostics, cardiology, pediatrics, and preventive care.",
};

const services = [
  { title: "Pharmacy", description: "Convenient access to prescribed and wellness medicines at affordable prices.", image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=700&q=80" },
  { title: "Cardiology", description: "Advanced heart screening, treatment planning, and preventive cardiac care.", image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=700&q=80" },
  { title: "Neurology", description: "Expert evaluation and management for neurological conditions and recovery.", image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=700&q=80" },
  { title: "Pathology Lab", description: "Reliable diagnostics and sample analysis with precise reporting.", image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=700&q=80" },
  { title: "Pediatrics", description: "Child-focused care with compassionate clinicians and family guidance.", image: "https://images.unsplash.com/photo-1632053001145-9d3d4d4a0b8d?auto=format&fit=crop&w=700&q=80" },
  { title: "Emergency Care", description: "Rapid, expert response for urgent medical needs and critical support.", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=700&q=80" },
  { title: "General Medicine", description: "Comprehensive ongoing health management for everyday wellbeing.", image: "https://images.unsplash.com/photo-1538108149393-fbbd81895977?auto=format&fit=crop&w=700&q=80" },
  { title: "Diagnostics", description: "Accurate scans, tests, and results that support confident decisions.", image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=700&q=80" },
  { title: "Preventive Healthcare", description: "Checkups and screenings designed to prevent disease before it starts.", image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=700&q=80" },
  { title: "Specialist Consultation", description: "Tailored consultations with experienced professionals across specialties.", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80" },
];

export default function ServicesPage() {
  return (
    <div className="container page-shell">
      <div className="page-banner-compact">
        <SectionTitle
          eyebrow="Our healthcare services"
          title="Our Healthcare Services"
          description="Comprehensive healthcare solutions for you and your family."
        />
      </div>

      <div className="service-grid">
        {services.map((service) => (
          <article key={service.title} className="service-card">
            <div className="service-image">
              <img src={service.image} alt={service.title} />
            </div>
            <div className="service-body">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <Link href="/contact" className="arrow-button" aria-label={`Learn more about ${service.title}`}>
                →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
