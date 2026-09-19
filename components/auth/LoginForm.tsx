"use client";

import { useState } from "react";

import { supabase } from "@/lib/supabase/client";

type LoginFormProps = {
  onClose: () => void;
  onSwitchToRegister: () => void;
};

export function LoginForm({ onClose, onSwitchToRegister }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const nextErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      nextErrors.password = "Please enter your password.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");

    if (!validate()) {
      return;
    }

    if (!supabase) {
      setSubmitError("Supabase is not configured yet.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setSubmitError("Invalid email or password.");
        return;
      }

      onClose();
    } catch {
      setSubmitError("Invalid email or password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <label htmlFor="auth-login-email">Email Address</label>
        <input
          id="auth-login-email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
        />
        {errors.email ? <span className="field-error">{errors.email}</span> : null}
      </div>

      <div className="form-row">
        <label htmlFor="auth-login-password">Password</label>
        <input
          id="auth-login-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
        />
        {errors.password ? <span className="field-error">{errors.password}</span> : null}
      </div>

      {submitError ? <p className="auth-error">{submitError}</p> : null}

      <button type="submit" className="auth-submit" disabled={isSubmitting}>
        {isSubmitting ? "Signing In..." : "Sign In"}
      </button>

      <div className="auth-switch-row">
        <span>Don&apos;t have an account?</span>
        <button type="button" className="auth-switch-button" onClick={onSwitchToRegister}>
          Register
        </button>
      </div>
    </form>
  );
}
