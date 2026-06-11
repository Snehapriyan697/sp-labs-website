"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Laptop, Code2, Database, BarChart3, Settings2, Bot, Calendar, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const services = [
  {
    title: "Website Development",
    description: "Business Websites, Portfolio Websites, and Landing Pages built with Next.js.",
    icon: <Laptop className="h-6 w-6 text-blue-600" />,
  },
  {
    title: "Custom Web Applications",
    description: "Admin Dashboards, Internal Tools, CRM Systems, and Management Systems.",
    icon: <Code2 className="h-6 w-6 text-blue-600" />,
  },
  {
    title: "Billing Software",
    description: "Invoice Systems, GST Billing, and Customer Management solutions.",
    icon: <FileText className="h-6 w-6 text-blue-600" />,
  },
  {
    title: "Inventory Management Systems",
    description: "Custom solutions for tracking products, stock levels, and supply chains.",
    icon: <Database className="h-6 w-6 text-blue-600" />,
  },
  {
    title: "Appointment Booking Systems",
    description: "Seamless scheduling platforms for service-based businesses.",
    icon: <Calendar className="h-6 w-6 text-blue-600" />,
  },
  {
    title: "Business Dashboards",
    description: "Aggregated data visualization and real-time business reporting.",
    icon: <BarChart3 className="h-6 w-6 text-blue-600" />,
  },
  {
    title: "n8n Workflow Automation",
    description: "Connecting your software stack to automate manual business processes.",
    icon: <Settings2 className="h-6 w-6 text-blue-600" />,
  },
  {
    title: "Telegram Bots & Python",
    description: "Automated bots and custom Python scripts for data extraction and tasks.",
    icon: <Bot className="h-6 w-6 text-blue-600" />,
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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ServicesSection() {
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            Core Services
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl">
            Specialized development and automation services tailored for independent businesses.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full hover:shadow-md transition-shadow duration-300 border-slate-200/60">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">{service.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
