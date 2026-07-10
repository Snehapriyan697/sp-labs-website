"use client"

import { useState } from "react"
import { login } from "../auth/actions"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, Lock, Gamepad2, ArrowRight } from "lucide-react"

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    setError(null)
    const result = await login(formData)
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
            <Gamepad2 size={48} className="mx-auto text-neon-blue mb-4" />
            <h1 className="text-3xl font-bold neon-text">Welcome Back</h1>
            <p className="text-gray-400 mt-2">Enter the Nexus to continue your journey</p>
          </div>

          <form action={handleSubmit} className="space-y-6">
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
                  className="block w-full pl-10 pr-3 py-3 bg-gaming-surface border border-gaming-border rounded-xl focus:ring-neon-blue focus:border-neon-blue transition-colors text-white"
                  placeholder="player@nexus.com"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="block text-sm font-medium text-gray-300">Password</label>
                <Link href="#" className="text-sm text-neon-purple hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-500" />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  className="block w-full pl-10 pr-3 py-3 bg-gaming-surface border border-gaming-border rounded-xl focus:ring-neon-blue focus:border-neon-blue transition-colors text-white"
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
              className="w-full py-3 px-4 bg-neon-blue text-gaming-bg font-bold rounded-xl hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all flex justify-center items-center gap-2 disabled:opacity-70"
            >
              {isLoading ? "Connecting..." : (
                <>Login <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link href="/register" className="text-neon-blue font-semibold hover:underline">
              Create one now
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
