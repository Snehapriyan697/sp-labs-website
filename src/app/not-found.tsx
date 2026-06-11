import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ArrowLeft } from 'lucide-react'
 
export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-32 px-4 text-center">
      <div className="text-blue-600 font-bold text-9xl mb-4">404</div>
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">Page Not Found</h2>
      <p className="text-slate-600 max-w-md mx-auto mb-8">
        We couldn't find the page you were looking for. It might have been moved, deleted, or never existed in the first place.
      </p>
      <Button asChild size="lg">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Homepage
        </Link>
      </Button>
    </div>
  )
}
