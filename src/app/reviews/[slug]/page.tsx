import { notFound } from 'next/navigation';
import Image from 'next/image';
import { recentReviews } from '@/lib/data';
import { Badge } from '@/components/ui/badge';

export function generateStaticParams() {
  return recentReviews.map(review => ({
    slug: review.slug,
  }));
}

export default function ReviewPage({ params }: { params: { slug: string } }) {
  const review = recentReviews.find(r => r.slug === params.slug);

  if (!review) {
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

      <div className="prose prose-lg max-w-none">
        <p>{review.content}</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod,
          nulla sit amet aliquam scelerisque, justo nibh sagittis nisl, id
          lacinia purus sem et nulla. Nunc tincidunt, nisl et aliquam
          ullamcorper, nunc nisl aliquam nisl, id lacinia purus sem et nulla.
          Donec id elit non mi porta gravida at eget metus.
        </p>
        <p>
          In this review, we'll take a closer look at {review.tool.name}, its
          key features, and how it compares to other tools in the{' '}
          {review.tool.category} space. Whether you're a seasoned pro or just
          getting started, this article will give you the insights you need to
          make an informed decision.
        </p>
        <h2 className="text-2xl font-bold tracking-tight font-headline mt-8">
          Key Features
        </h2>
        <ul>
          <li>
            Seamless integration with popular cloud providers and on-premise
            systems.
          </li>
          <li>
            A rich and extensible plugin architecture for ultimate flexibility.
          </li>
          <li>
            An intuitive and user-friendly interface for managing complex
            workflows.
          </li>
          <li>
            Comprehensive documentation and a vibrant community for support.
          </li>
        </ul>
        <p>
          Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
          lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac,
          vestibulum at eros.
        </p>
      </div>
    </article>
  );
}
