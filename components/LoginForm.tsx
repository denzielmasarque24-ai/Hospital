"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { supabase } from "@/lib/supabase/client";

const initialFormState = {
  email: "",
  password: "",
};

export function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof typeof initialFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
    if (submitError) setSubmitError("");
  };

  const validate = () => {
    const nextErrors: { email?: string; password?: string } = {};

    if (!form.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!form.password) {
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
      setSubmitError("Supabase is not configured. Please add your project URL and anon key.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email.trim(),
        password: form.password,
      });

      if (error) {
        setSubmitError("Invalid email or password.");
        return;
      }

      router.push("/");
    } catch {
      setSubmitError("Invalid email or password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <label htmlFor="login-email">Email Address</label>
        <input
          id="login-email"
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
        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={form.password}
          onChange={(event) => handleChange("password", event.target.value)}
          aria-invalid={Boolean(errors.password)}
          placeholder="Enter your password"
        />
        {errors.password ? <span className="field-error">{errors.password}</span> : null}
      </div>

      {submitError ? <p className="auth-error">{submitError}</p> : null}

      <button type="submit" className="auth-submit" disabled={isSubmitting}>
        {isSubmitting ? "Signing In..." : "Sign In"}
      </button>

      <div className="auth-inline-link">
        <Link href="/register">Create Account</Link>
      </div>
    </form>
  );
}
