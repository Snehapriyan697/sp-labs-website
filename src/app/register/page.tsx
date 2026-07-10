"use client"

import { useState } from "react"
import { signup } from "../auth/actions"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, Lock, User, Gamepad2, ArrowRight } from "lucide-react"

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    setError(null)
    
    // Basic client-side validation
    if (formData.get("password") !== formData.get("confirmPassword")) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    const result = await signup(formData)
    if (result?.error) {
      setError(result.error)
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-grow flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass-card p-8 neon-border">
          <div className="text-center mb-8">
            <Gamepad2 size={48} className="mx-auto text-neon-purple mb-4" />
            <h1 className="text-3xl font-bold neon-text">Join Nexus</h1>
            <p className="text-gray-400 mt-2">Create your player profile</p>
          </div>

          <form action={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-500" />
                </div>
                <input
                  type="text"
                  name="username"
                  required
                  className="block w-full pl-10 pr-3 py-3 bg-gaming-surface border border-gaming-border rounded-xl focus:ring-neon-purple focus:border-neon-purple transition-colors text-white"
                  placeholder="PlayerOne"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-500" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 bg-gaming-surface border border-gaming-border rounded-xl focus:ring-neon-purple focus:border-neon-purple transition-colors text-white"
                  placeholder="player@nexus.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-500" />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  minLength={6}
                  className="block w-full pl-10 pr-3 py-3 bg-gaming-surface border border-gaming-border rounded-xl focus:ring-neon-purple focus:border-neon-purple transition-colors text-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-500" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  minLength={6}
                  className="block w-full pl-10 pr-3 py-3 bg-gaming-surface border border-gaming-border rounded-xl focus:ring-neon-purple focus:border-neon-purple transition-colors text-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 mt-4 bg-neon-purple text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(188,19,254,0.4)] transition-all flex justify-center items-center gap-2 disabled:opacity-70"
            >
              {isLoading ? "Creating Account..." : (
                <>Register <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-neon-purple font-semibold hover:underline">
              Log in here
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
