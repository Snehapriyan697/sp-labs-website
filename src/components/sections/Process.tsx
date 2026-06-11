"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discovery & Strategy",
    description: "We start by understanding your business goals, target audience, and technical requirements to create a comprehensive project roadmap.",
  },
  {
    number: "02",
    title: "Design & Architecture",
    description: "Our team designs intuitive user interfaces and plans a scalable technical architecture tailored exactly to your needs.",
  },
  {
    number: "03",
    title: "Development & Integration",
    description: "We build your solution using modern, high-performance tech stacks, ensuring clean code and seamless third-party integrations.",
  },
  {
    number: "04",
    title: "Testing & Launch",
    description: "Rigorous quality assurance testing guarantees a bug-free experience before we deploy your project to production.",
  },
];

export function Process() {
  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Abstract background element */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-900/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-indigo-900/20 blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Our Development Process
            </h2>
            <p className="text-lg text-slate-400 mb-8 max-w-lg">
              We follow a streamlined, transparent workflow to ensure your project is delivered on time, within budget, and exceeds expectations.
            </p>
            
            <ul className="space-y-4">
              {[
                "Transparent communication via Slack/Teams",
                "Weekly progress updates and demos",
                "Agile methodology for flexibility",
                "Post-launch support and maintenance"
              ].map((item, i) => (
                <li key={i} className="flex items-center text-slate-300">
                  <CheckCircle2 className="h-5 w-5 text-blue-500 mr-3 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6"
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 border border-slate-700 text-blue-400 font-bold">
                    {step.number}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
