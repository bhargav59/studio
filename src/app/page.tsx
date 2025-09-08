import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { trendingTools } from "@/lib/data"
import { ArrowUpRight, DollarSign, FileText, PlusCircle, Search, Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import RevenueChart from "@/components/revenue-chart"
import Link from "next/link"
import Image from "next/image"
import { recentReviews } from "@/lib/data"

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your CloudWise overview.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Search className="mr-2" />
            Discover
          </Button>
          <Button>
            <PlusCircle className="mr-2" />
            Generate Review
          </Button>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Affiliate Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,295.50</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reviews Generated</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+125</div>
            <p className="text-xs text-muted-foreground">+18.7% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Tools Discovered</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+32</div>
            <p className="text-xs text-muted-foreground">+5 since yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5.0</div>
            <p className="text-xs text-muted-foreground">Across all reviewed tools</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="font-headline">Trending Tools</CardTitle>
            <CardDescription>
              The most popular and fastest-growing tools this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tool</TableHead>
                  <TableHead className="hidden sm:table-cell">Category</TableHead>
                  <TableHead className="hidden md:table-cell">Popularity</TableHead>
                  <TableHead className="text-right">Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trendingTools.map((tool) => (
                  <TableRow key={tool.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="hidden h-9 w-9 sm:flex">
                          <AvatarImage src={`https://avatar.vercel.sh/${tool.name}.png`} alt={tool.name} />
                          <AvatarFallback>{tool.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-0.5">
                          <p className="font-medium">{tool.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{tool.description}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="secondary">{tool.category}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{tool.popularity_score}/100</TableCell>
                    <TableCell className="text-right text-green-600 flex justify-end items-center">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      {tool.trend}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline">Affiliate Revenue</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <RevenueChart />
          </CardContent>
        </Card>
      </div>

       <div>
        <h2 className="text-2xl font-bold tracking-tight font-headline mb-4">Recent Reviews</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recentReviews.map((review) => (
            <Card key={review.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
                        <Badge variant="outline" className="mb-2">{review.tool.category}</Badge>
                        <h3 className="text-lg font-semibold font-headline">{review.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{review.content}</p>
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

    </div>
  )
}
