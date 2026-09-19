import Link from "next/link";

import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
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
              <p className="eyebrow">Trusted care</p>
              <h1>Personalized healthcare for every stage of life.</h1>
              <p>
                Access wellness support, medication guidance, and expert care from a team you can rely on.
              </p>
            </div>

            <div className="auth-stat-grid">
              <div className="auth-stat-card">
                <strong>24/7</strong>
                <span>Virtual support</span>
              </div>
              <div className="auth-stat-card">
                <strong>1.2k+</strong>
                <span>Patients served</span>
              </div>
            </div>
          </div>
        </section>

        <section className="auth-panel" aria-label="Login form section">
          <div className="auth-card">
            <div className="auth-brand compact">
              <div className="auth-brand-icon">✚</div>
              <div className="auth-brand-text">
                <strong>MediWell</strong>
                <span>PHARMA</span>
              </div>
            </div>

            <div className="auth-header">
              <h1>Welcome Back</h1>
              <p>Sign in to your MediWell Pharma account.</p>
            </div>

            <LoginForm />

            <div className="auth-footer">
              <span>Don&apos;t have an account?</span>
              <Link href="/register">Create Account</Link>
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
