"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] pt-24 pb-32 md:pt-48 md:pb-56 flex flex-col items-center justify-center min-h-[90vh]">
      {/* Background decoration: Industrial/Minimal */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_0%,_transparent_100%)]" />
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
      
      <div className="container relative z-10 mx-auto px-4 md:px-6 flex flex-col items-center text-center w-full">
        <motion.h1
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.95] tracking-tighter font-extrabold text-white w-full max-w-[90vw] md:max-w-7xl uppercase"
        >
          ENGINEERING ELITE DIGITAL <span className="text-gray-500">SYSTEMS.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
          className="mt-8 text-xl md:text-2xl text-gray-400 max-w-3xl font-light font-mono tracking-wide"
        >
          Precision-built web applications and workflow automation for companies that demand high performance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
          className="mt-16 flex flex-col sm:flex-row gap-6 w-full justify-center"
        >
          <Button size="lg" asChild className="group h-16 px-12 rounded-none bg-white hover:bg-gray-200 text-black text-lg font-bold uppercase tracking-widest transition-transform duration-500 hover:scale-105">
            <Link href="/contact">
              Initiate Project
              <ArrowRight className="ml-4 h-5 w-5 transition-transform duration-500 group-hover:translate-x-2" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="h-16 px-12 rounded-none border-gray-700 bg-transparent text-white hover:bg-gray-900 hover:border-gray-500 text-lg font-bold uppercase tracking-widest transition-transform duration-500 hover:scale-105">
            <Link href="/services">System Specs</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
