"use client";

import { motion } from "framer-motion";
import { Laptop, Code2, Database, BarChart3, Settings2, Bot, Calendar, FileText } from "lucide-react";

const services = [
  {
    title: "Website Development",
    description: "Business Websites, Portfolio Websites, and Landing Pages built with Next.js.",
    icon: <Laptop className="h-10 w-10 text-white mb-4" />,
    colSpan: "col-span-1 md:col-span-2 lg:col-span-2",
    rowSpan: "row-span-1 md:row-span-2",
    bg: "bg-[#111111]",
  },
  {
    title: "Custom Web Applications",
    description: "Admin Dashboards, Internal Tools, CRM Systems.",
    icon: <Code2 className="h-8 w-8 text-white mb-4" />,
    colSpan: "col-span-1 md:col-span-1",
    rowSpan: "row-span-1",
    bg: "bg-[#161616]",
  },
  {
    title: "Billing Software",
    description: "Invoice Systems and GST Billing.",
    icon: <FileText className="h-8 w-8 text-white mb-4" />,
    colSpan: "col-span-1 md:col-span-1",
    rowSpan: "row-span-1",
    bg: "bg-[#1c1c1c]",
  },
  {
    title: "Inventory Management",
    description: "Tracking products, stock levels, and supply chains.",
    icon: <Database className="h-8 w-8 text-white mb-4" />,
    colSpan: "col-span-1 md:col-span-2",
    rowSpan: "row-span-1",
    bg: "bg-[#161616]",
  },
  {
    title: "n8n Workflow Automation",
    description: "Connecting your software stack to automate manual business processes.",
    icon: <Settings2 className="h-10 w-10 text-white mb-4" />,
    colSpan: "col-span-1 md:col-span-2 lg:col-span-2",
    rowSpan: "row-span-1 md:row-span-2",
    bg: "bg-[#111111]",
  },
  {
    title: "Appointment Booking",
    description: "Seamless scheduling platforms for service businesses.",
    icon: <Calendar className="h-8 w-8 text-white mb-4" />,
    colSpan: "col-span-1 md:col-span-1",
    rowSpan: "row-span-1",
    bg: "bg-[#1c1c1c]",
  },
  {
    title: "Business Dashboards",
    description: "Aggregated data visualization and real-time reporting.",
    icon: <BarChart3 className="h-8 w-8 text-white mb-4" />,
    colSpan: "col-span-1 md:col-span-1",
    rowSpan: "row-span-1",
    bg: "bg-[#161616]",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

export function ServicesSection() {
  return (
    <section className="py-24 md:py-48 bg-[#0a0a0a] border-t border-white/5 relative">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_bottom,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="flex flex-col items-start mb-16 md:mb-24">
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-extrabold tracking-tighter text-white uppercase leading-[1] max-w-4xl">
            Architecting <span className="text-gray-600">Solutions.</span>
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 grid-flow-dense"
        >
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className={`${service.colSpan} ${service.rowSpan} ${service.bg} group relative overflow-hidden border border-white/5 flex flex-col justify-end p-8 min-h-[250px] transition-all duration-700 ease-out hover:border-white/20`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0" />
              
              <div className="relative z-10 transform transition-transform duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-2">
                {service.icon}
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{service.title}</h3>
                <p className="text-gray-400 font-mono text-sm leading-relaxed max-w-sm">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
