import { motion } from "framer-motion";
import { Zap, Shield, Smartphone, Code2, MessagesSquare, Repeat } from "lucide-react";

const reasons = [
  {
    title: "Direct Communication",
    description: "You work directly with me. No account managers, no playing telephone. Clear, fast, and honest communication.",
    icon: <MessagesSquare className="h-6 w-6 text-blue-600" />,
  },
  {
    title: "Modern Technology Stack",
    description: "Built with Next.js, React, and Tailwind CSS. The same tech stack used by industry leaders for maximum performance.",
    icon: <Code2 className="h-6 w-6 text-blue-600" />,
  },
  {
    title: "AI-Assisted Rapid Development",
    description: "I leverage AI coding tools to dramatically accelerate development cycles, saving you time and budget.",
    icon: <Zap className="h-6 w-6 text-blue-600" />,
  },
  {
    title: "Mobile-First Design",
    description: "Every solution is built to look and perform flawlessly on any device, from smartphones to ultrawide monitors.",
    icon: <Smartphone className="h-6 w-6 text-blue-600" />,
  },
  {
    title: "Clean, Maintainable Code",
    description: "I write modular, documented code that is easy to scale and maintain long after the initial launch.",
    icon: <Shield className="h-6 w-6 text-blue-600" />,
  },
  {
    title: "Fast Iteration Cycles",
    description: "Agile workflows ensure that you see progress constantly and can provide feedback early and often.",
    icon: <Repeat className="h-6 w-6 text-blue-600" />,
  },
];

export function WhyWorkWithMe() {
  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            Why Work With Me
          </h2>
          <p className="text-lg text-slate-600">
            As an independent developer, I offer a level of dedication, agility, and technical excellence that large agencies struggle to match.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-slate-50 rounded-2xl p-8 border border-slate-200 transition-colors hover:bg-slate-100"
            >
              <div className="h-12 w-12 rounded-lg bg-white flex items-center justify-center border border-slate-200 mb-6 shadow-sm">
                {reason.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{reason.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
