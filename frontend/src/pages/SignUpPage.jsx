"use client"

import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore"
import { Eye, EyeOff, Loader2, Lock, Mail, User, Github, Twitter, ChromeIcon as Google } from "lucide-react"
import { Link } from "react-router-dom"
import AnimatedBackground from "../components/AnimatedBackground"
import VerifyEmail from "../components/VerifyEmail" // Import verification form
import toast from "react-hot-toast"

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  })
  const [isVerifying, setIsVerifying] = useState(false) 

  const { signup, isSigningUp } = useAuthStore()

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required")
    if (!formData.email.trim()) return toast.error("Email is required")
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format")
    if (!formData.password) return toast.error("Password is required")
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters")

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = validateForm()
    if (success === true) {
      await signup(formData)
      setIsVerifying(true) // Show verification form after sign-up
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-base-100">
        <div className="w-full max-w-md space-y-8">
          {isVerifying ? (
            <VerifyEmail email={formData.email} /> // Show verification form
          ) : (
            <>
              {/* Sign Up Form */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mt-3 text-base-content">Create Account</h1>
                <p className="text-base-content/60 text-lg">Get started with your free account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Full Name</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 size-5 text-base-content/90" />
                    <input
                      type="text"
                      className="input input-bordered w-full pl-10 h-12"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Email</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 size-5 text-base-content/90" />
                    <input
                      type="email"
                      className="input input-bordered w-full pl-10 h-12"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Password</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 size-5 text-base-content/90" />
                    <input
                      type={showPassword ? "text" : "password"}
                      className="input input-bordered w-full pl-10 h-12"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-base-content/40"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full h-12 mt-4"
                  disabled={isSigningUp}
                >
                  {isSigningUp ? (
                    <>
                      <Loader2 className="size-5 animate-spin" />
                      Creating your account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              <div className="text-center pt-4">
                <p>
                  Already have an account?{" "}
                  <Link to="/login" className="link link-primary font-medium">
                    Sign in
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <AnimatedBackground
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  )
}

export default SignUpPage
