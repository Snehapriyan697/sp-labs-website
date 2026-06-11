import { Hammer } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const currentProjects = [
  {
    title: "Modern Business Website Platform",
    type: "Web Development",
    status: "In Development",
  },
  {
    title: "Retail Billing Software",
    type: "Custom Software",
    status: "Active Development",
  },
  {
    title: "n8n Lead Qualification System",
    type: "Automation",
    status: "Prototyping",
  },
  {
    title: "Appointment Booking Dashboard",
    type: "Web Application",
    status: "Refactoring",
  },
];

export function CurrentlyBuilding() {
  return (
    <section className="py-24 bg-slate-950 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-4 text-blue-400">
              <Hammer className="h-5 w-5" />
              <span className="font-semibold tracking-wider text-sm uppercase">Currently Building</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Active Projects & Solutions
            </h2>
            <p className="text-slate-400 max-w-2xl text-lg">
              Here's a look at the types of systems and software I am actively building for modern businesses.
            </p>
          </div>
          <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800" asChild>
            <Link href="/contact">Start Your Project</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentProjects.map((project, index) => (
            <div 
              key={index} 
              className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 flex flex-col justify-between h-full"
            >
              <div>
                <div className="text-xs font-medium text-slate-500 mb-3 uppercase tracking-wider">
                  {project.type}
                </div>
                <h3 className="text-lg font-bold text-slate-200 mb-4">{project.title}</h3>
              </div>
              <div className="inline-flex items-center text-xs font-medium text-blue-400 mt-auto">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
                {project.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
