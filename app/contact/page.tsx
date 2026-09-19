import type { Metadata } from "next";

import { ContactForm } from "@/components/ContactForm";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Contact MediWell Pharma",
  description: "Contact MediWell Pharma for appointments, questions, support, and healthcare assistance.",
};

export default function ContactPage() {
  return (
    <div className="container page-shell">
      <div className="page-banner-compact">
        <SectionTitle eyebrow="Reach out" title="Contact Us" description="We are here to support your health and wellness needs." />
      </div>

      <div className="contact-grid">
        <div className="contact-card">
          <h3>Contact Information</h3>
          <p>123 Healthcare Street<br />New York, USA 10001</p>
          <p>Phone: +1 234 567 8900</p>
          <p>Email: info@mediwellpharma.com</p>
          <p>Business Hours:</p>
          <ul>
            <li>Monday-Friday: 8:00 AM - 6:00 PM</li>
            <li>Saturday: 9:00 AM - 3:00 PM</li>
            <li>Sunday: Emergency Services</li>
          </ul>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
