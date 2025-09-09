import { notFound } from 'next/navigation';
import { getReviewBySlug } from '@/lib/data';
import type { Review } from '@/lib/types';
import ReviewDisplay from './review-display';

export default function ReviewPage({ params }: { params: { slug: string } }) {
  const review: Review | undefined = getReviewBySlug(params.slug);

  if (!review) {
    notFound();
  }

  return <ReviewDisplay review={review} />;
}
