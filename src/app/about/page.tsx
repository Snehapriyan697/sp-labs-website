import { Metadata } from "next";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Code2, Zap, Shield, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about SP Labs, an independent developer specializing in custom software and AI automation.",
};

const values = [
  {
    title: "Engineering Excellence",
    description: "I write clean, scalable, and maintainable code. I don't cut corners because technical debt is the enemy of growth.",
    icon: <Code2 className="h-6 w-6 text-blue-600" />,
  },
  {
    title: "Speed of Execution",
    description: "In the modern digital landscape, speed is a feature. I deliver fast load times for end-users and rapid development cycles for my clients.",
    icon: <Zap className="h-6 w-6 text-blue-600" />,
  },
  {
    title: "Uncompromising Security",
    description: "From encrypted databases to secure API endpoints, I treat your data and your users' data with the highest level of protection.",
    icon: <Shield className="h-6 w-6 text-blue-600" />,
  },
  {
    title: "Direct Partnership",
    description: "You work directly with me. No account managers, no communication gaps. Just a dedicated developer focused on your ROI.",
    icon: <Target className="h-6 w-6 text-blue-600" />,
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="py-20 md:py-32 bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
              Engineering <span className="text-blue-600">Growth.</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              I am the developer behind SP Labs, an independent studio specializing in building high-performance websites, custom software, and AI automation systems for ambitious businesses.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">My Approach</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Most business software is clunky, slow, and hard to use. Most websites look the same and fail to convert. My mission is to change that for independent businesses.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                I bridge the gap between world-class design and elite engineering. I help companies modernize their operations, automate tedious workflows, and present a breathtaking digital storefront to their customers.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Whether you need a Next.js business platform, a Telegram support bot, or a custom billing system, I have the expertise to deliver it flawlessly.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <div className="h-12 w-12 rounded-lg bg-white flex items-center justify-center border border-slate-200 mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{value.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">My Technology Stack</h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Python", "PostgreSQL", "Supabase", "Framer Motion", "n8n", "OpenAI", "Vercel"].map((tech) => (
              <span key={tech} className="px-6 py-3 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-medium">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
