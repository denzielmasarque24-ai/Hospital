"use client";

import { useEffect, useState } from "react";

import { Modal } from "@/components/ui/Modal";

import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export type AuthMode = "login" | "register";

type AuthModalProps = {
  open: boolean;
  mode: AuthMode;
  onClose: () => void;
  onModeChange: (mode: AuthMode) => void;
};

export function AuthModal({ open, mode, onClose, onModeChange }: AuthModalProps) {
  const [activeMode, setActiveMode] = useState<AuthMode>(mode);

  useEffect(() => {
    setActiveMode(mode);
  }, [mode]);

  const handleSwitchToRegister = () => {
    setActiveMode("register");
    onModeChange("register");
  };

  const handleSwitchToLogin = () => {
    setActiveMode("login");
    onModeChange("login");
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="auth-modal-shell">
        <button type="button" className="modal-close" aria-label="Close login modal" onClick={onClose}>
          ×
        </button>

        <div className="auth-modal-brand" aria-label="MediWell Pharma logo">
          <span className="auth-modal-icon">✚</span>
          <div>
            <strong>MediWell</strong>
            <small>PHARMA</small>
          </div>
        </div>

        <div className="auth-modal-header">
          <h2>{activeMode === "login" ? "Welcome Back" : "Create Your Account"}</h2>
          <p>
            {activeMode === "login"
              ? "Sign in to your MediWell Pharma account."
              : "Join MediWell Pharma and access trusted healthcare services."}
          </p>
        </div>

        {activeMode === "login" ? (
          <LoginForm onClose={onClose} onSwitchToRegister={handleSwitchToRegister} />
        ) : (
          <RegisterForm onClose={onClose} onSwitchToLogin={handleSwitchToLogin} />
        )}
      </div>
    </Modal>
  );
}
