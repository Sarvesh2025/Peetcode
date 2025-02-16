import React, { useState, useEffect } from "react";

const EmailVerificationPage = () => {
  const [verificationStatus, setVerificationStatus] = useState("pending"); // pending, success, error
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    // Check for verification token in URL
    const token = new URLSearchParams(window.location.search).get("token");
    if (token) {
      // Add verification logic here
      setVerificationStatus("success");
    } else {
      setVerificationStatus("error");
    }
  }, []);

  const handleResendEmail = () => {
    // Add resend verification email logic here
    setResendCooldown(60);
    const timer = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-2">
          Email Verification
        </h2>
        <p className="text-gray-600 text-center mb-6">
          {verificationStatus === "pending"
            ? "We've sent you a verification email. Please check your inbox."
            : verificationStatus === "success"
            ? "Your email has been verified!"
            : "There was a problem verifying your email."}
        </p>

        {verificationStatus === "success" ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            Your email has been successfully verified. You can now access all
            features of your account.
          </div>
        ) : verificationStatus === "error" ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            The verification link may have expired or is invalid. Please request
            a new verification email.
          </div>
        ) : null}

        {verificationStatus !== "success" && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 text-center">
              Didn't receive the email? Check your spam folder or request a new
              verification email.
            </p>
            <button
              onClick={handleResendEmail}
              disabled={resendCooldown > 0}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {resendCooldown > 0
                ? `Resend email (${resendCooldown}s)`
                : "Resend verification email"}
            </button>
          </div>
        )}

        <div className="mt-4 text-center">
          <a
            href="/login"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Back to login
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
