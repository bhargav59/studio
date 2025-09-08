import { Search } from "lucide-react";

export default function DiscoverPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <Search className="w-16 h-16 mb-4 text-muted-foreground" />
      <h1 className="text-3xl font-bold tracking-tight font-headline">Discover Tools</h1>
      <p className="text-muted-foreground mt-2">Find trending cloud and DevOps tools by monitoring GitHub repositories.</p>
      <p className="text-sm text-muted-foreground mt-1">This page is under construction.</p>
    </div>
  );
}
