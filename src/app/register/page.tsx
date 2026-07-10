"use client"

import { useState } from "react"
import { signup } from "../auth/actions"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, Lock, User, Gamepad2, ArrowRight, Eye, EyeOff, Check, X } from "lucide-react"

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState("")

  const passwordChecks = [
    { label: "At least 8 characters", ok: password.length >= 8 },
    { label: "Contains a number", ok: /\d/.test(password) },
    { label: "Contains uppercase", ok: /[A-Z]/.test(password) },
  ]

  const strength = passwordChecks.filter(c => c.ok).length
  const strengthLabel = strength === 0 ? "" : strength === 1 ? "Weak" : strength === 2 ? "Fair" : "Strong"
  const strengthColor = strength === 1 ? "bg-neon-red" : strength === 2 ? "bg-neon-orange" : strength === 3 ? "bg-neon-green" : "bg-gaming-border"

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    setError(null)
    if (formData.get("password") !== formData.get("confirmPassword")) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }
    if (strength < 2) {
      setError("Password is too weak. Add numbers and uppercase letters.")
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
    <div className="flex-grow flex items-center justify-center p-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="glass-card p-8 sm:p-10 neon-border-purple">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 bg-neon-blue/10 border border-neon-blue/20 rounded-2xl mb-5">
              <Gamepad2 size={32} className="text-neon-blue" />
            </div>
            <h1 className="text-3xl font-black">Create Account</h1>
            <p className="text-gray-500 mt-2 text-sm">Join the Nexus and start playing</p>
          </div>

          <form action={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <User size={16} className="text-gray-600" />
                </div>
                <input type="text" name="username" required
                  className="block w-full pl-10 pr-4 py-3 bg-gaming-surface border border-gaming-border rounded-xl text-white placeholder-gray-600 focus:ring-neon-blue focus:border-neon-blue/50 transition-colors text-sm"
                  placeholder="PlayerOne"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail size={16} className="text-gray-600" />
                </div>
                <input type="email" name="email" required
                  className="block w-full pl-10 pr-4 py-3 bg-gaming-surface border border-gaming-border rounded-xl text-white placeholder-gray-600 focus:ring-neon-blue focus:border-neon-blue/50 transition-colors text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock size={16} className="text-gray-600" />
                </div>
                <input
                  type={showPassword ? "text" : "password"} name="password" required minLength={6}
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 bg-gaming-surface border border-gaming-border rounded-xl text-white placeholder-gray-600 focus:ring-neon-blue focus:border-neon-blue/50 transition-colors text-sm"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-600 hover:text-gray-400">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Strength indicator */}
              {password.length > 0 && (
                <div className="mt-2.5 space-y-2">
                  <div className="flex gap-1">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= strength ? strengthColor : "bg-gaming-border"}`} />
                    ))}
                  </div>
                  <div className="space-y-1">
                    {passwordChecks.map((check, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs">
                        {check.ok ? <Check size={12} className="text-neon-green" /> : <X size={12} className="text-gray-600" />}
                        <span className={check.ok ? "text-gray-400" : "text-gray-600"}>{check.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock size={16} className="text-gray-600" />
                </div>
                <input type="password" name="confirmPassword" required minLength={6}
                  className="block w-full pl-10 pr-4 py-3 bg-gaming-surface border border-gaming-border rounded-xl text-white placeholder-gray-600 focus:ring-neon-blue focus:border-neon-blue/50 transition-colors text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <label className="flex items-start gap-2 cursor-pointer pt-1">
              <input type="checkbox" required className="w-4 h-4 mt-0.5 rounded border-gaming-border bg-gaming-surface text-neon-purple focus:ring-neon-purple/50" />
              <span className="text-xs text-gray-500 leading-relaxed">
                I agree to the <a href="#" className="text-neon-blue hover:underline">Terms of Service</a> and <a href="#" className="text-neon-blue hover:underline">Privacy Policy</a>
              </span>
            </label>

            {error && (
              <div className="p-3 rounded-xl bg-neon-red/10 border border-neon-red/30 text-neon-red text-sm text-center">
                {error}
              </div>
            )}

            <button type="submit" disabled={isLoading}
              className="w-full py-3.5 px-4 mt-2 bg-gradient-to-r from-neon-purple to-neon-blue text-white font-bold rounded-xl hover:shadow-[0_0_25px_rgba(179,71,234,0.3)] transition-all flex justify-center items-center gap-2 disabled:opacity-60 text-sm"
            >
              {isLoading ? "Creating Account..." : (<>Create Account <ArrowRight size={16} /></>)}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-neon-purple font-semibold hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
