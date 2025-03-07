"use client"

import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore"
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
  Github,
  Twitter,
  ChromeIcon as Google,
} from "lucide-react"
import { Link } from "react-router-dom"
import AnimatedBackground from "../components/AnimatedBackground"
import toast from "react-hot-toast"

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  })

  const { signup, isSigningUp } = useAuthStore()

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required")
    if (!formData.email.trim()) return toast.error("Email is required")
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format")
    if (!formData.password) return toast.error("Password is required")
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters")

    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const success = validateForm()
    if (success === true) signup(formData)
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-base-100">
        <div className="w-full max-w-md space-y-8">
         
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center 
                group-hover:bg-primary/20 transition-all duration-300 transform group-hover:scale-105"
              >
                <MessageSquare className="size-7 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mt-3 text-base-content">Create Account</h1>
              <p className="text-base-content/60 text-lg">Get started with your free account</p>
            </div>
          </div>

         
          <div className="grid grid-cols-3 gap-3">
            <button className="btn btn-outline btn-sm h-12 flex items-center justify-center gap-2 transition-all">
              <Google className="size-5" />
            </button>
            <button className="btn btn-outline btn-sm h-12 flex items-center justify-center gap-2 transition-all">
              <Github className="size-5" />
            </button>
            <button className="btn btn-outline btn-sm h-12 flex items-center justify-center gap-2  transition-all">
              <Twitter className="size-5" />
            </button>
          </div>

          
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-base-300"></div>
            <span className="px-3 text-sm text-base-content/60">or continue with email</span>
            <div className="flex-grow h-px bg-base-300"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10 rounded-lg h-12 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="John Doe"
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
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10 rounded-lg h-12 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
                <span className="label-text-alt text-base-content/60">Min. 6 characters</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10 rounded-lg h-12 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-base-content/40 hover:text-base-content transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
            </div>

            <div className="form-control mt-2">
              <label className="label cursor-pointer justify-start gap-2">
                <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
                <span className="label-text">
                  I agree to the{" "}
                  <a href="#" className="link link-primary">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="link link-primary">
                    Privacy Policy
                  </a>
                </span>
              </label>
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
            <p className="text-base-content/70">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>
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

