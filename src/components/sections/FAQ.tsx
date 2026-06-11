"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What is your typical project timeline?",
    answer: "Project timelines vary based on complexity. A standard landing page might take 2-3 weeks, while a full-scale web application or custom billing software can take 2-4 months. We provide a detailed roadmap during our initial discovery phase."
  },
  {
    question: "Do you offer post-launch support and maintenance?",
    answer: "Yes! We believe in long-term partnerships. We offer flexible maintenance retainers to keep your software updated, secure, and running smoothly long after the initial launch."
  },
  {
    question: "What tech stack do you specialize in?",
    answer: "We specialize in modern, high-performance technologies. For web development, we use React and Next.js. For backend and APIs, we use Node.js and Python. For automation, we heavily leverage n8n and custom AI scripts."
  },
  {
    question: "Can you integrate AI into my existing business processes?",
    answer: "Absolutely. We can analyze your current workflows and integrate AI solutions—such as automated customer support bots, lead qualification systems, and intelligent document processing—to save you hours of manual work."
  },
  {
    question: "How does your pricing work?",
    answer: "We offer both project-based pricing for clearly defined scopes and retainer-based pricing for ongoing development and automation services. We focus on delivering high ROI rather than competing on the lowest price."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600">
            Everything you need to know about our services and how we work.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="border border-slate-200 rounded-xl overflow-hidden"
              >
                <button
                  className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 bg-white hover:bg-slate-50 transition-colors"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="font-semibold text-slate-900 pr-8">{faq.question}</span>
                  <ChevronDown 
                    className={cn(
                      "h-5 w-5 text-slate-400 transition-transform duration-200 shrink-0",
                      isOpen && "transform rotate-180 text-blue-600"
                    )} 
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-5 text-slate-600 border-t border-slate-100 pt-4 bg-white">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
