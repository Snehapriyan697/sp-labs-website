"use client"

import { useState } from "react"
import { login } from "../auth/actions"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, Lock, Gamepad2, ArrowRight, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

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
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="glass-card p-8 sm:p-10 neon-border">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 bg-neon-purple/10 border border-neon-purple/20 rounded-2xl mb-5">
              <Gamepad2 size={32} className="text-neon-purple" />
            </div>
            <h1 className="text-3xl font-black">Welcome Back</h1>
            <p className="text-gray-500 mt-2 text-sm">Log in to continue your gaming journey</p>
          </div>

          <form action={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail size={16} className="text-gray-600" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  className="block w-full pl-10 pr-4 py-3 bg-gaming-surface border border-gaming-border rounded-xl text-white placeholder-gray-600 focus:ring-neon-blue focus:border-neon-blue/50 transition-colors text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-400">Password</label>
                <Link href="#" className="text-xs text-neon-blue hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock size={16} className="text-gray-600" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  className="block w-full pl-10 pr-12 py-3 bg-gaming-surface border border-gaming-border rounded-xl text-white placeholder-gray-600 focus:ring-neon-blue focus:border-neon-blue/50 transition-colors text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-600 hover:text-gray-400"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="remember" className="w-4 h-4 rounded border-gaming-border bg-gaming-surface text-neon-purple focus:ring-neon-purple/50" />
              <span className="text-sm text-gray-500">Remember me</span>
            </label>

            {error && (
              <div className="p-3 rounded-xl bg-neon-red/10 border border-neon-red/30 text-neon-red text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-neon-purple to-neon-blue text-white font-bold rounded-xl hover:shadow-[0_0_25px_rgba(179,71,234,0.3)] transition-all flex justify-center items-center gap-2 disabled:opacity-60 text-sm"
            >
              {isLoading ? "Logging in..." : (<>Log In <ArrowRight size={16} /></>)}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-neon-purple font-semibold hover:underline">
              Sign up free
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
