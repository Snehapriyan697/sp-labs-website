import { Metadata } from "next";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Laptop, Code2, FileText, Database, Calendar, BarChart3, Settings2, Bot, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description: "Comprehensive software development, app development, and AI automation services by Snehapriyan Digital Solutions.",
};

const detailedServices = [
  {
    id: "web-development",
    title: "Website Development",
    description: "I build high-performance, responsive websites. From business landing pages to comprehensive company portals, I deliver clean code and exceptional user experiences.",
    icon: <Laptop className="h-8 w-8 text-blue-600" />,
    features: ["Business Websites", "Portfolio Websites", "Landing Pages", "Company Websites", "Educational Websites"],
  },
  {
    id: "custom-web-apps",
    title: "Custom Web Applications",
    description: "Complex logic and databases built securely and efficiently. I build web apps tailored precisely to how your business operates.",
    icon: <Code2 className="h-8 w-8 text-blue-600" />,
    features: ["Admin Dashboards", "Internal Tools", "CRM Systems", "Management Systems", "Next.js & React"],
  },
  {
    id: "billing-software",
    title: "Billing Software",
    description: "Custom invoicing and billing solutions tailored for your business model.",
    icon: <FileText className="h-8 w-8 text-blue-600" />,
    features: ["Invoice Systems", "GST Billing Integration", "Customer Management", "Secure Payment Processing"],
  },
  {
    id: "inventory",
    title: "Inventory Management Systems",
    description: "Off-the-shelf software doesn't always fit. I build tailored inventory systems for your specific operational needs.",
    icon: <Database className="h-8 w-8 text-blue-600" />,
    features: ["Stock Tracking", "Supply Chain Management", "Barcode/QR Generation", "Low Stock Alerts"],
  },
  {
    id: "booking",
    title: "Appointment Booking Systems",
    description: "Custom booking engines that integrate seamlessly into your existing workflows and calendars.",
    icon: <Calendar className="h-8 w-8 text-blue-600" />,
    features: ["Service Scheduling", "Calendar Sync (Google/Outlook)", "Automated Reminders", "Availability Management"],
  },
  {
    id: "dashboards",
    title: "Business Dashboards",
    description: "Make data-driven decisions with real-time analytics dashboards that aggregate data from all your business tools.",
    icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
    features: ["Real-time KPI tracking", "Custom data visualizations", "Multi-source data aggregation", "Export and reporting tools"],
  },
  {
    id: "n8n",
    title: "n8n Workflow Automation",
    description: "Connect your entire tech stack. I design and deploy complex n8n workflows that save you hundreds of manual hours every month.",
    icon: <Settings2 className="h-8 w-8 text-blue-600" />,
    features: ["CRM integrations", "Automated reporting", "Marketing automation", "Data synchronization"],
  },
  {
    id: "bots",
    title: "Telegram Bots & Python Automation",
    description: "Automate interactions and data extraction with custom scripts and robust bots.",
    icon: <Bot className="h-8 w-8 text-blue-600" />,
    features: ["Custom Telegram Bots", "Web Scraping & Data Extraction", "Automated Support Triaging", "Python Scripting"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="py-20 md:py-32 bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
              Services tailored for <span className="text-blue-600">scale.</span>
            </h1>
            <p className="text-xl text-slate-600">
              I build solutions that solve actual business problems, streamline operations, and drive growth.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-24">
            {detailedServices.map((service, index) => (
              <div 
                key={service.id} 
                id={service.id}
                className={`flex flex-col md:flex-row gap-12 items-start ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="flex-1 space-y-6">
                  <div className="h-16 w-16 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100">
                    {service.icon}
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900">{service.title}</h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3 pt-4 border-t border-slate-100">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-slate-700">
                        <CheckCircle2 className="h-5 w-5 text-blue-500 mr-3 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 w-full">
                  <div className="bg-slate-100 rounded-2xl h-80 md:h-[400px] w-full border border-slate-200 flex items-center justify-center p-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 opacity-50" />
                    <div className="relative z-10 text-center">
                      <div className="text-slate-400 mb-2">{service.icon}</div>
                      <div className="text-slate-400 font-medium">Concept Illustration</div>
                    </div>
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
