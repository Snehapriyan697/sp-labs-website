import Link from "next/link";
import { Mail, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-2xl tracking-tight text-slate-900">
                SP Labs<span className="text-blue-600">.</span>
              </span>
            </Link>
            <p className="text-sm">
              Premium web development, app development, and AI automation services for businesses worldwide.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link href="#" aria-label="Visit my personal website or social profile" className="text-slate-400 hover:text-slate-900 transition-colors">
                <Globe size={20} aria-hidden="true" />
                <span className="sr-only">Social</span>
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Services</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/services" className="hover:text-blue-600 transition-colors">Website Development</Link></li>
              <li><Link href="/services" className="hover:text-blue-600 transition-colors">App Development</Link></li>
              <li><Link href="/services" className="hover:text-blue-600 transition-colors">AI Automation & n8n</Link></li>
              <li><Link href="/services" className="hover:text-blue-600 transition-colors">Custom Software</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-blue-600 transition-colors">About Us</Link></li>
              <li><Link href="/portfolio" className="hover:text-blue-600 transition-colors">Portfolio</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <a href="mailto:hellosplabs@gmail.com" className="hover:text-blue-600 transition-colors">hellosplabs@gmail.com</a>
              </li>
              <li>Available Worldwide</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; {new Date().getFullYear()} SP Labs. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
