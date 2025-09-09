import { notFound } from 'next/navigation';
import Image from 'next/image';
import { recentReviews } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

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
        <p className="lead text-xl text-muted-foreground">{review.content}</p>
        <p>
          In the ever-evolving landscape of cloud engineering and DevOps, staying ahead requires a deep understanding of the tools that shape the industry. In this review, we'll take a closer look at {review.tool.name}, a powerful tool in the {review.tool.category} space. We will explore its core functionalities, its strengths, and potential weaknesses to help you determine if it's the right fit for your team's workflow.
        </p>
        
        <Card className="my-8 bg-accent/20 border-accent">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Core Idea</CardTitle>
            </CardHeader>
            <CardContent>
                <p>At its heart, {review.tool.name} is designed to solve a critical problem: managing complexity at scale. Whether it's provisioning infrastructure, orchestrating containerized applications, or monitoring distributed systems, this tool provides a structured and efficient approach. It empowers teams to automate processes, reduce manual errors, and accelerate their development and deployment cycles.</p>
            </CardContent>
        </Card>

        <h2 className="text-3xl font-bold tracking-tight font-headline mt-12">
          Key Features & Analysis
        </h2>
        <p>
          Every powerful tool is defined by its features. Here are some of the standout capabilities of {review.tool.name}:
        </p>
        <ul className="space-y-4">
          <li className="flex items-start gap-4">
            <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold">Seamless Integration</h4>
              <p className="text-muted-foreground">The tool offers extensive integrations with popular cloud providers (like AWS, Google Cloud, and Azure) and a wide array of on-premise systems, providing a unified experience across hybrid environments.</p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
            <div>
                <h4 className="font-semibold">Rich and Extensible Architecture</h4>
                <p className="text-muted-foreground">A flexible plugin or provider model allows for ultimate customization. This means you can extend its core functionality to fit your specific use cases and integrate with bespoke in-house tools.</p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
            <div>
                <h4 className="font-semibold">Intuitive Workflow Management</h4>
                <p className="text-muted-foreground">Despite the complexity it manages, the tool presents a user-friendly interface and a clear, declarative syntax for defining and managing even the most intricate workflows.</p>
            </div>
          </li>
           <li className="flex items-start gap-4">
            <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
            <div>
                <h4 className="font-semibold">Vibrant Community and Support</h4>
                <p className="text-muted-foreground">Backed by comprehensive documentation and an active open-source or enterprise community, users have access to a wealth of knowledge, tutorials, and support channels.</p>
            </div>
          </li>
        </ul>
        <h2 className="text-3xl font-bold tracking-tight font-headline mt-12">
          Conclusion
        </h2>
        <p>
          In conclusion, {review.tool.name} stands out as a formidable player in its domain. Its robust feature set, focus on automation, and strong community make it a compelling choice for any modern engineering team. While the initial learning curve can be a factor, the long-term benefits in efficiency, reliability, and scalability are well worth the investment.
        </p>
      </div>
    </article>
  );
}
