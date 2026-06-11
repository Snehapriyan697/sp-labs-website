"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

const projects = [
  {
    title: "AI Lead Generation Dashboard",
    category: "AI Automation & SaaS",
    description: "A centralized dashboard integrating multiple n8n workflows and AI agents to automatically qualify and route sales leads.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    link: "#",
  },
  {
    title: "Gym Management System",
    category: "Custom Software",
    description: "End-to-end management software for fitness centers including member billing, class scheduling, and access control.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
    link: "#",
  },
  {
    title: "Premium Restaurant Booking",
    category: "Web App Development",
    description: "High-conversion website with a custom integrated reservation system and dynamic menu management.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
    link: "#",
  },
];

export function PortfolioShowcase() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
              Featured Work
            </h2>
            <p className="text-lg text-slate-600">
              Explore some of our recent projects where we've helped businesses transform their digital presence and automate their operations.
            </p>
          </div>
          <Button variant="outline" className="hidden md:flex group" asChild>
            <Link href="/portfolio">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                {/* Fallback color overlay just in case image doesn't load fast */}
                <div className="absolute inset-0 bg-slate-200 animate-pulse" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 relative z-10"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">
                  {project.category}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{project.title}</h3>
                <p className="text-slate-600 text-sm flex-grow mb-6">
                  {project.description}
                </p>
                <div className="mt-auto">
                  <Link 
                    href={project.link}
                    className="inline-flex items-center text-sm font-medium text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    View Case Study <ExternalLink className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <Button variant="outline" className="w-full mt-8 md:hidden group" asChild>
          <Link href="/portfolio">
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
