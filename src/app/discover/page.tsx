'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateReviewFromTrendingTool, GenerateReviewFromTrendingToolOutput } from '@/ai/flows/generate-review-from-trending-tool';
import { Loader2, Sparkles, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { addReview } from '@/lib/data';
import type { Review, Tool } from '@/lib/types';
import { useRouter } from 'next/navigation';

export default function DiscoverPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateReviewFromTrendingToolOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const router = useRouter();

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    setIsSaved(false);

    try {
      const response = await generateReviewFromTrendingTool({
        githubApiUrl: 'https://api.github.com/search/repositories?q=language:typescript+topic:devops&sort=stars&order=desc',
      });
      setResult(response);

      // Automatically save the new review
      const newReview = addReview({
        tool: {
          id: response.tool.toolName, // Simplified ID
          name: response.tool.toolName,
          description: response.tool.toolDescription,
          category: response.tool.toolCategory as Tool['category'],
          website_url: response.tool.websiteUrl || '',
          github_url: response.tool.githubUrl,
          popularity_score: 80, // Default value
          trend: 10, // Default value
        },
        title: `${response.tool.toolName}: An AI-Generated Review`,
        content: response.review.review,
        rating: 4.5, // Default value
        author: 'AI Analyst',
        featured_image: `https://picsum.photos/seed/${response.tool.toolName}/400/225`,
        data_ai_hint: 'tech abstract',
      });

      setIsSaved(true);

      // Redirect to the new review page after a short delay
      setTimeout(() => {
        router.push(`/reviews/${newReview.slug}`);
      }, 2000);

    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred.');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            Discover & Review
          </h1>
          <p className="text-muted-foreground">
            Automatically discover a trending tool and generate a new review.
          </p>
        </div>
        <Button onClick={handleGenerate} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2" />
              Generate New Review
            </>
          )}
        </Button>
      </header>

      {error && (
        <Card className="bg-destructive/10 border-destructive">
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      {isSaved && result && (
        <div className="flex flex-col items-center justify-center h-[40vh] text-center border-dashed border-2 rounded-lg border-green-500 bg-green-500/10">
            <CheckCircle className="w-16 h-16 mb-4 text-green-500" />
            <h2 className="text-2xl font-bold tracking-tight font-headline">Review Generated & Saved!</h2>
            <p className="text-muted-foreground mt-2">Redirecting you to the new post...</p>
        </div>
      )}

      {result && !isSaved && (
        <Card>
          <CardHeader>
            <Badge variant="secondary" className="w-fit mb-2">
              {result.tool.toolCategory}
            </Badge>
            <CardTitle className="font-headline text-2xl">{result.tool.toolName}</CardTitle>
            <CardDescription>{result.tool.toolDescription}</CardDescription>
            <div className="flex gap-4 pt-2">
                <Link href={result.tool.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline">GitHub</Button>
                </Link>
                {result.tool.websiteUrl && (
                    <Link href={result.tool.websiteUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline">Website</Button>
                    </Link>
                )}
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-bold font-headline mb-4">Generated Review</h3>
            <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-headline prose-headings:tracking-tight">
                <ReactMarkdown>{result.review.review}</ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      )}

      {!loading && !result && !error && (
         <div className="flex flex-col items-center justify-center h-[40vh] text-center border-dashed border-2 rounded-lg">
            <Sparkles className="w-16 h-16 mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold tracking-tight font-headline">Ready to Discover?</h2>
            <p className="text-muted-foreground mt-2">Click the "Generate New Review" button to get started.</p>
        </div>
      )}

       {loading && !isSaved && (
         <div className="flex flex-col items-center justify-center h-[40vh] text-center border-dashed border-2 rounded-lg">
            <Loader2 className="w-16 h-16 mb-4 text-muted-foreground animate-spin" />
            <h2 className="text-2xl font-bold tracking-tight font-headline">Generating...</h2>
            <p className="text-muted-foreground mt-2">Please wait while we discover a tool and generate its review.</p>
        </div>
      )}
    </div>
  );
}
