import Link from "next/link";

import { RegisterForm } from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="auth-page">
      <div className="container auth-layout">
        <section className="auth-visual" aria-label="MediWell Pharma healthcare overview">
          <div className="auth-visual-inner">
            <div className="auth-brand">
              <div className="auth-brand-icon">✚</div>
              <div className="auth-brand-text">
                <strong>MediWell</strong>
                <span>PHARMA</span>
              </div>
            </div>

            <div className="auth-visual-copy">
              <p className="eyebrow">Better health starts here</p>
              <h1>Modern care, trusted guidance, and support you can count on.</h1>
              <p>
                Create your account to access personalized care, appointment booking, and a healthcare experience built around your needs.
              </p>
            </div>

            <div className="auth-stat-grid">
              <div className="auth-stat-card">
                <strong>40+</strong>
                <span>Expert specialists</span>
              </div>
              <div className="auth-stat-card">
                <strong>98%</strong>
                <span>Patient satisfaction</span>
              </div>
            </div>
          </div>
        </section>

        <section className="auth-panel" aria-label="Registration form section">
          <div className="auth-card">
            <div className="auth-brand compact">
              <div className="auth-brand-icon">✚</div>
              <div className="auth-brand-text">
                <strong>MediWell</strong>
                <span>PHARMA</span>
              </div>
            </div>

            <div className="auth-header">
              <h1>Create Your Account</h1>
              <p>Join MediWell Pharma and access trusted healthcare services.</p>
            </div>

            <RegisterForm />

            <div className="auth-footer">
              <span>Already have an account?</span>
              <Link href="/login">Sign In</Link>
            </div>

            <Link href="/" className="secondary-link">
              Back to Home
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
