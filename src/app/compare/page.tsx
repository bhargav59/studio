import { GitCompareArrows } from "lucide-react";

export default function ComparePage() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <GitCompareArrows className="w-16 h-16 mb-4 text-muted-foreground" />
      <h1 className="text-3xl font-bold tracking-tight font-headline">Compare Tools</h1>
      <p className="text-muted-foreground mt-2">Dynamically compare tools side-by-side with our AI-powered engine.</p>
      <p className="text-sm text-muted-foreground mt-1">This page is under construction.</p>
    </div>
  );
}
