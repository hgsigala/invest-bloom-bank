import { Sprout } from "lucide-react"
import Link from "next/link"

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="relative">
        <div className="size-10 bg-primary rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
          <Sprout className="size-6 text-white" />
        </div>
        <div className="absolute -bottom-1 -right-1 size-4 bg-secondary rounded-full border-2 border-primary" />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-primary leading-tight">Invest Bloom</span>
        <span className="text-sm text-muted-foreground leading-tight">Bank</span>
      </div>
    </Link>
  )
}

