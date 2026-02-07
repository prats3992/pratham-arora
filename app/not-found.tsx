import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";
import { BentoGrid } from "@/components/bento/bento-grid";
import { BentoItem } from "@/components/bento/bento-item";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 p-4 font-sans selection:bg-lime-400 selection:text-black">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Navigation / Header */}
        <header className="flex justify-between items-center py-6 border-b border-white/5 mb-8">
            <Link href="/" className="text-xl font-serif font-bold text-white tracking-tight hover:text-lime-400 transition-colors">
                PA
            </Link>
             <Link href="/">
                <Button variant="ghost" className="text-slate-400 hover:text-white hover:bg-white/5 group">
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    Return to Base
                </Button>
            </Link>
        </header>

        <BentoGrid className="auto-rows-[minmax(200px,auto)]">
            {/* 404 Main Message */}
            <BentoItem colSpan={4} className="flex flex-col items-center justify-center p-12 text-center bg-red-950/10 border-red-500/20">
                 <div className="p-6 rounded-full bg-red-500/10 text-red-500 mb-6 animate-pulse">
                    <FileQuestion className="h-16 w-16" />
                 </div>
                 <h1 className="text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-t from-red-600 to-red-400 mb-4">
                    404
                 </h1>
                 <h2 className="text-2xl font-bold text-slate-200 mb-2">Signal Lost</h2>
                 <p className="text-slate-400 max-w-md mx-auto">
                    The requested data sector could not be located. It may have been archived, corrupted, or never existed in this timeline.
                 </p>
                 
                 <div className="flex gap-4 mt-8">
                    <Link href="/">
                        <Button className="bg-lime-400 text-slate-950 hover:bg-lime-300 font-bold">
                            <Home className="mr-2 h-4 w-4" />
                            Return Home
                        </Button>
                    </Link>
                    <Link href="/projects">
                         <Button variant="outline" className="border-white/10 hover:bg-white/5 text-slate-300">
                            Check Archives
                        </Button>
                    </Link>
                 </div>
            </BentoItem>
        </BentoGrid>
      </div>
    </div>
  );
}
