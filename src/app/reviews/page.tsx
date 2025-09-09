import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { recentReviews } from '@/lib/data';

export default function ReviewsPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            Tool Reviews
          </h1>
          <p className="text-muted-foreground">
            Browse in-depth, AI-generated reviews of the latest cloud and DevOps
            tools.
          </p>
        </div>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recentReviews.map(review => (
          <Card
            key={review.id}
            className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <Link href={`/reviews/${review.slug}`} className="block">
              <CardContent className="p-0">
                <Image
                  alt={review.title}
                  className="aspect-video w-full object-cover"
                  height="225"
                  src={review.featured_image}
                  width="400"
                  data-ai-hint={review.data_ai_hint}
                />
                <div className="p-4">
                  <Badge variant="outline" className="mb-2">
                    {review.tool.category}
                  </Badge>
                  <h3 className="text-lg font-semibold font-headline">
                    {review.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {review.content}
                  </p>
                  <div className="flex items-center mt-4 text-xs text-muted-foreground">
                    <span>By {review.author}</span>
                    <span className="mx-2">•</span>
                    <span>{review.published_date}</span>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
