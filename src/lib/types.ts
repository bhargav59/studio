export type Tool = {
  id: string;
  name: string;
  description: string;
  category: 'CI/CD' | 'Monitoring' | 'Security' | 'Networking' | 'Database' | 'DevOps' | 'Cloud Engineering';
  website_url: string;
  github_url: string;
  popularity_score: number;
  trend: number;
};

export type Review = {
  id: string;
  tool: Tool;
  title: string;
  slug: string;
  content: string;
  rating: number;
  author: string;
  published_date: string;
  featured_image: string;
  data_ai_hint: string;
};
