'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getRecentReviews, getReviewBySlug } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from 'react';
import type { Review } from '@/lib/types';


export default function ReviewPage({ params }: { params: { slug: string } }) {
  const [review, setReview] = useState<Review | null | undefined>(null);

  useEffect(() => {
    setReview(getReviewBySlug(params.slug));
  }, [params.slug]);


  if (review === null) {
      return (
        <div className="flex justify-center items-center h-64">
            <p>Loading review...</p>
        </div>
      )
  }

  if (review === undefined) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 mb-8">
        <Badge variant="outline" className="w-fit">
          {review.tool.category}
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight font-headline">
          {review.title}
        </h1>
        <div className="flex items-center text-sm text-muted-foreground">
          <span>By {review.author}</span>
          <span className="mx-2">•</span>
          <span>{review.published_date}</span>
        </div>
      </div>

      <Image
        alt={review.title}
        className="aspect-video w-full object-cover rounded-lg mb-8"
        height="450"
        src={review.featured_image}
        width="800"
        data-ai-hint={review.data_ai_hint}
      />

      <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-headline prose-headings:tracking-tight">
        <ReactMarkdown>{review.content}</ReactMarkdown>
      </div>
    </article>
  );
}
