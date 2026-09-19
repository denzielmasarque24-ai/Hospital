"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          <span>Full Name</span>
          <input type="text" name="name" placeholder="Your full name" required />
        </label>
        <label>
          <span>Email</span>
          <input type="email" name="email" placeholder="you@example.com" required />
        </label>
        <label>
          <span>Phone</span>
          <input type="tel" name="phone" placeholder="+1 234 567" required />
        </label>
        <label>
          <span>Subject</span>
          <input type="text" name="subject" placeholder="How can we help?" required />
        </label>
      </div>

      <label>
        <span>Message</span>
        <textarea name="message" rows={5} placeholder="Write your message here" required />
      </label>

      <button type="submit" className="btn-primary submit-button">
        Send Message
      </button>

      {submitted ? <p className="success-message">Thank you. Your message has been received.</p> : null}
    </form>
  );
}
