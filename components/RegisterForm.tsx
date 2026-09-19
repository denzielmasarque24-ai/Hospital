"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { supabase } from "@/lib/supabase/client";

const initialFormState = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof typeof initialFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
    if (submitError) setSubmitError("");
    if (successMessage) setSuccessMessage("");
  };

  const validate = () => {
    const nextErrors: {
      fullName?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!form.fullName.trim()) {
      nextErrors.fullName = "Please enter your full name.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!form.password) {
      nextErrors.password = "Please enter your password.";
    } else if (form.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    if (!form.confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password.";
    } else if (form.confirmPassword !== form.password) {
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

    if (normalized.includes("invalid email") || normalized.includes("email")) {
      return "Please enter a valid email address.";
    }

    if (normalized.includes("weak password") || normalized.includes("password") && normalized.includes("at least")) {
      return "Password must be at least 8 characters.";
    }

    if (normalized.includes("network") || normalized.includes("fetch")) {
      return "Network error. Please check your connection and try again.";
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
      setSubmitError("Supabase is not configured. Please add your project URL and anon key.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email.trim(),
        password: form.password,
        options: {
          data: {
            full_name: form.fullName.trim(),
          },
        },
      });

      if (error) {
        setSubmitError(getFriendlyErrorMessage(error.message));
        return;
      }

      if (data.session) {
        router.push("/");
        return;
      }

      setSuccessMessage("Account created successfully. Please check your email to confirm your account.");
      setForm(initialFormState);
    } catch {
      setSubmitError("We could not create your account right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <label htmlFor="register-name">Full Name</label>
        <input
          id="register-name"
          name="fullName"
          type="text"
          autoComplete="name"
          value={form.fullName}
          onChange={(event) => handleChange("fullName", event.target.value)}
          aria-invalid={Boolean(errors.fullName)}
          placeholder="Your full name"
        />
        {errors.fullName ? <span className="field-error">{errors.fullName}</span> : null}
      </div>

      <div className="form-row">
        <label htmlFor="register-email">Email Address</label>
        <input
          id="register-email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(event) => handleChange("email", event.target.value)}
          aria-invalid={Boolean(errors.email)}
          placeholder="you@example.com"
        />
        {errors.email ? <span className="field-error">{errors.email}</span> : null}
      </div>

      <div className="form-row">
        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={form.password}
          onChange={(event) => handleChange("password", event.target.value)}
          aria-invalid={Boolean(errors.password)}
          placeholder="Minimum 8 characters"
        />
        {errors.password ? <span className="field-error">{errors.password}</span> : null}
      </div>

      <div className="form-row">
        <label htmlFor="register-confirm-password">Confirm Password</label>
        <input
          id="register-confirm-password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={form.confirmPassword}
          onChange={(event) => handleChange("confirmPassword", event.target.value)}
          aria-invalid={Boolean(errors.confirmPassword)}
          placeholder="Re-enter your password"
        />
        {errors.confirmPassword ? <span className="field-error">{errors.confirmPassword}</span> : null}
      </div>

      {submitError ? <p className="auth-error">{submitError}</p> : null}
      {successMessage ? <p className="auth-success">{successMessage}</p> : null}

      <button type="submit" className="auth-submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating Account..." : "Create Account"}
      </button>

      <div className="auth-inline-link">
        <Link href="/login">Sign In</Link>
      </div>
    </form>
  );
}
