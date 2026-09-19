"use client";

import { useState } from "react";

import { supabase } from "@/lib/supabase/client";

type RegisterFormProps = {
  onClose: () => void;
  onSwitchToLogin: () => void;
};

export function RegisterForm({ onClose, onSwitchToLogin }: RegisterFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const nextErrors: {
      fullName?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!fullName.trim()) {
      nextErrors.fullName = "Please enter your full name.";
    }

    if (!email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      nextErrors.password = "Please enter your password.";
    } else if (password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password.";
    } else if (confirmPassword !== password) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const getFriendlyErrorMessage = (message: string) => {
    const normalized = message.toLowerCase();

    if (normalized.includes("already registered") || normalized.includes("already exists")) {
      return "This email is already registered. Please sign in or use a different email.";
    }

    if (normalized.includes("invalid email")) {
      return "Please enter a valid email address.";
    }

    if (normalized.includes("weak password")) {
      return "Password must be at least 8 characters.";
    }

    if (normalized.includes("network") || normalized.includes("fetch")) {
      return "Network error. Please try again.";
    }

    return "We could not create your account right now. Please try again.";
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");
    setSuccessMessage("");

    if (!validate()) {
      return;
    }

    if (!supabase) {
      setSubmitError("Supabase is not configured yet.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
          },
        },
      });

      if (error) {
        setSubmitError(getFriendlyErrorMessage(error.message));
        return;
      }

      if (data.session) {
        onClose();
        return;
      }

      setSuccessMessage("Account created. Please check your email to verify your account.");
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch {
      setSubmitError("We could not create your account right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <label htmlFor="auth-register-name">Full Name</label>
        <input
          id="auth-register-name"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          type="text"
          autoComplete="name"
          placeholder="Your full name"
        />
        {errors.fullName ? <span className="field-error">{errors.fullName}</span> : null}
      </div>

      <div className="form-row">
        <label htmlFor="auth-register-email">Email Address</label>
        <input
          id="auth-register-email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
        />
        {errors.email ? <span className="field-error">{errors.email}</span> : null}
      </div>

      <div className="form-row">
        <label htmlFor="auth-register-password">Password</label>
        <input
          id="auth-register-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          autoComplete="new-password"
          placeholder="Minimum 8 characters"
        />
        {errors.password ? <span className="field-error">{errors.password}</span> : null}
      </div>

      <div className="form-row">
        <label htmlFor="auth-register-confirm">Confirm Password</label>
        <input
          id="auth-register-confirm"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          type="password"
          autoComplete="new-password"
          placeholder="Confirm your password"
        />
        {errors.confirmPassword ? <span className="field-error">{errors.confirmPassword}</span> : null}
      </div>

      {submitError ? <p className="auth-error">{submitError}</p> : null}
      {successMessage ? <p className="auth-success">{successMessage}</p> : null}

      <button type="submit" className="auth-submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating Account..." : "Create Account"}
      </button>

      <div className="auth-switch-row">
        <span>Already have an account?</span>
        <button type="button" className="auth-switch-button" onClick={onSwitchToLogin}>
          Log In
        </button>
      </div>
    </form>
  );
}
