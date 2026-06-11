import { Metadata } from "next";
import { ContactCTA } from "@/components/sections/ContactCTA";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore our recent case studies and projects delivered by Snehapriyan Digital Solutions.",
};

const allProjects = [
  {
    title: "AI Lead Generation Dashboard (Concept)",
    category: "Demo Project",
    description: "A centralized dashboard integrating multiple n8n workflows and AI agents to automatically qualify and route sales leads.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    link: "#",
    techStack: ["Next.js", "Tailwind", "n8n", "OpenAI API", "PostgreSQL"],
  },
  {
    title: "Premium Gym Management System (Demo)",
    category: "Sample Application",
    description: "End-to-end management software for fitness centers including member billing, class scheduling, and access control.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
    link: "#",
    techStack: ["React", "Node.js", "Stripe API", "AWS"],
  },
  {
    title: "Restaurant Booking & Menu Platform (Concept)",
    category: "Sample Application",
    description: "High-conversion website concept with an integrated reservation system and dynamic menu management.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
    link: "#",
    techStack: ["Next.js", "Framer Motion", "Supabase", "Twilio API"],
  },
  {
    title: "Retail Billing Software",
    category: "Custom Software",
    description: "A lightning-fast, offline-capable point of sale (POS) and inventory management system designed for multi-location retail stores.",
    image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=2070&auto=format&fit=crop",
    link: "#",
    techStack: ["Electron", "React", "SQLite", "Express"],
  },
  {
    title: "Medical Appointment Booking App",
    category: "Mobile App Development",
    description: "A cross-platform mobile application allowing patients to easily book consultations, access telehealth video calls, and manage prescriptions securely.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
    link: "#",
    techStack: ["React Native", "Firebase", "WebRTC", "HIPAA Compliant DB"],
  },
  {
    title: "Telegram Support Bot",
    category: "AI Automation",
    description: "An intelligent Telegram bot that handles level 1 customer support inquiries, processes refunds, and seamlessly escalates complex issues to human agents.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop",
    link: "#",
    techStack: ["Python", "Telegraf", "Anthropic Claude", "Zendesk API"],
  },
];

export default function PortfolioPage() {
  return (
    <>
      <section className="py-20 md:py-32 bg-slate-950 text-white border-b border-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Work.</span>
            </h1>
            <p className="text-xl text-slate-400">
              A collection of sample projects, demo applications, and proof-of-concepts showcasing my technical capabilities.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {allProjects.map((project, index) => (
              <div key={index} className="group flex flex-col">
                <Link href={project.link} className="block overflow-hidden rounded-2xl mb-6 relative border border-slate-200">
                  <div className="relative h-[300px] md:h-[400px] w-full bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-300" />
                </Link>
                
                <div className="flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                      {project.category}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    <Link href={project.link}>{project.title}</Link>
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed mb-6 flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.techStack.map((tech, idx) => (
                      <span key={idx} className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-500/10">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-auto">
                    <Link 
                      href={project.link}
                      className="inline-flex items-center font-medium text-slate-900 hover:text-blue-600 transition-colors"
                    >
                      Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
