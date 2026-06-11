import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ContactCTA() {
  return (
    <section className="py-24 bg-blue-600">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-blue-700/50 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 border border-blue-500/30">
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
              Ready to scale your business?
            </h2>
            <p className="text-lg text-blue-100">
              Let's discuss how our custom software and automation solutions can help you achieve your goals faster. Available worldwide.
            </p>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-50 w-full sm:w-auto group" asChild>
              <Link href="/contact">
                Get a Free Consultation
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-blue-300 text-white hover:bg-blue-700 hover:text-white w-full sm:w-auto" asChild>
              <Link href="/services">View Services</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
