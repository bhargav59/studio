'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateComparisonTable, GenerateComparisonTableOutput } from '@/ai/flows/dynamic-comparison-engine';
import { Loader2, GitCompareArrows } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import ReactMarkdown from 'react-markdown';

export default function ComparePage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateComparisonTableOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tools, setTools] = useState<string>('');
  const [features, setFeatures] = useState<string>('');

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    const toolList = tools.split(',').map(t => t.trim()).filter(t => t);
    const featureList = features.split(',').map(f => f.trim()).filter(f => f);

    if (toolList.length < 2 || featureList.length < 1) {
        setError("Please provide at least two tools and one feature to compare.");
        setLoading(false);
        return;
    }

    try {
      const response = await generateComparisonTable({
        tools: toolList,
        features: featureList,
      });
      setResult(response);
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred.');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-8">
       <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Compare Tools</h1>
          <p className="text-muted-foreground">Dynamically compare tools side-by-side with our AI-powered engine.</p>
        </div>
      </header>

       <Card>
        <CardHeader>
          <CardTitle>Comparison Setup</CardTitle>
          <CardDescription>Enter comma-separated lists of tools and features you want to compare.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
            <div className="grid gap-2">
                <label htmlFor="tools-input" className="font-medium">Tools</label>
                <Input 
                    id="tools-input"
                    placeholder="e.g., Terraform, Ansible, Pulumi"
                    value={tools}
                    onChange={(e) => setTools(e.target.value)}
                    disabled={loading}
                />
            </div>
            <div className="grid gap-2">
                <label htmlFor="features-input" className="font-medium">Features</label>
                <Input 
                    id="features-input"
                    placeholder="e.g., Ease of Use, Community Support, Cost"
                    value={features}
                    onChange={(e) => setFeatures(e.target.value)}
                    disabled={loading}
                />
            </div>
             <Button onClick={handleGenerate} disabled={loading} className="sm:w-fit">
              {loading ? (
                <>
                  <Loader2 className="mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <GitCompareArrows className="mr-2" />
                  Generate Comparison
                </>
              )}
            </Button>
        </CardContent>
       </Card>

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

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Comparison Result</CardTitle>
            <CardDescription>
              Here is the AI-generated comparison of the tools you selected.
            </CardDescription>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <ReactMarkdown>{result.comparisonTable}</ReactMarkdown>
            <h3 className="font-headline text-xl mt-6">Summary</h3>
            <p>{result.summary}</p>
            <h3 className="font-headline text-xl mt-6">Winner</h3>
            <p>
                The winning tool is <Badge variant="secondary" className="text-base">{result.winner}</Badge>.
            </p>
          </CardContent>
        </Card>
      )}

      {!loading && !result && !error && (
         <div className="flex flex-col items-center justify-center h-[40vh] text-center border-dashed border-2 rounded-lg">
            <GitCompareArrows className="w-16 h-16 mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold tracking-tight font-headline">Ready to Compare?</h2>
            <p className="text-muted-foreground mt-2">Fill in the fields above and generate a comparison.</p>
        </div>
      )}

       {loading && (
         <div className="flex flex-col items-center justify-center h-[40vh] text-center border-dashed border-2 rounded-lg">
            <Loader2 className="w-16 h-16 mb-4 text-muted-foreground animate-spin" />
            <h2 className="text-2xl font-bold tracking-tight font-headline">Generating...</h2>
            <p className="text-muted-foreground mt-2">Please wait while we analyze and compare the tools.</p>
        </div>
      )}
    </div>
  );
}
