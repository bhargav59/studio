import { FileText } from "lucide-react";

export default function ReviewsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <FileText className="w-16 h-16 mb-4 text-muted-foreground" />
      <h1 className="text-3xl font-bold tracking-tight font-headline">Tool Reviews</h1>
      <p className="text-muted-foreground mt-2">Browse in-depth, AI-generated reviews of the latest cloud and DevOps tools.</p>
      <p className="text-sm text-muted-foreground mt-1">This page is under construction.</p>
    </div>
  );
}
