"use client"

import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore"
import { Eye, EyeOff, Loader2, Lock, Mail, User,Cat, Github, Twitter, ChromeIcon as Google } from "lucide-react"
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
      setIsVerifying(true) 
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-base-100">
        <div className="w-full max-w-md space-y-8">

          {isVerifying ? (
            <VerifyEmail email={formData.email} /> 
          ) : (
            <>
             
              <div className="text-center mb-8">
              <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
              >
                <Cat className="size-7 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome to <i className="font-serif">WildChats</i></h1>
              <p className="text-base-content/60">Sign up with your institutional email.</p>
            </div>
              
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
                       placeholder="name@cit.edu"
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
                  className="btn btn-primary w-full h-12 mt-4 text-base font-medium transition-all duration-300 hover:shadow-md hover:shadow-primary/20"
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
      title="WildChats"
      subtitle="See who's online, start conversations, and connect with fellow Wildcats in real time."
    />

    </div>
  )
}

export default SignUpPage
