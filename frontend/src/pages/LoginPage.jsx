"use client"

import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore"
import AuthImagePattern from "../components/AuthImagePattern"
import { Link } from "react-router-dom"
import { Eye, EyeOff, Loader2, Lock, Cat, Mail, MessageSquare, Github, Twitter, ChromeIcon as Google } from "lucide-react"
import AnimatedBackground from "../components/AnimatedBackground"

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const { login, isLoggingIn } = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    login(formData)
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
                <Cat className="size-7 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mt-3 text-base-content">Welcome Back</h1>
              <p className="text-base-content/60 text-lg">Sign in to your account</p>
            </div>
          </div>

        
          <div className="grid grid-cols-3 gap-3">
            <button className="btn btn-outline btn-sm h-12 flex items-center justify-center gap-2  transition-all">
              <Google className="size-5" />
            </button>
            <button className="btn btn-outline btn-sm h-12 flex items-center justify-center gap-2 transition-all">
              <Github className="size-5" />
            </button>
            <button className="btn btn-outline btn-sm h-12 flex items-center justify-center gap-2 transition-all">
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
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10 rounded-lg h-12 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="name@cit.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
                <Link to="/forgot-password" className="label-text-alt link link-primary">
                  Forgot password?
                </Link>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10 rounded-lg h-12 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder=""
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

            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checkbox-primary"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <span className="label-text">Remember me for 30 days</span>
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full h-12 mt-4 text-base font-medium transition-all duration-300 hover:shadow-md hover:shadow-primary/20"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="text-center pt-4">
            <p className="text-base-content/70">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="link link-primary font-medium hover:underline">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      <AnimatedBackground
      title="Join WildChats"
      subtitle="See who's online, start conversations, and connect with fellow Wildcats in real time."
    />

    </div>
  )
}

export default LoginPage

