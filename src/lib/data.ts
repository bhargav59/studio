import type { Tool, Review } from './types';

export const trendingTools: Tool[] = [
  {
    id: '1',
    name: 'Terraform',
    description: 'Infrastructure as Code',
    category: 'DevOps',
    website_url: 'https://www.terraform.io/',
    github_url: 'https://github.com/hashicorp/terraform',
    popularity_score: 95,
    trend: 12.5,
  },
  {
    id: '2',
    name: 'Kubernetes',
    description: 'Container Orchestration',
    category: 'Cloud Engineering',
    website_url: 'https://kubernetes.io/',
    github_url: 'https://github.com/kubernetes/kubernetes',
    popularity_score: 98,
    trend: 8.2,
  },
  {
    id: '3',
    name: 'Prometheus',
    description: 'Monitoring & Alerting',
    category: 'Monitoring',
    website_url: 'https://prometheus.io/',
    github_url: 'https://github.com/prometheus/prometheus',
    popularity_score: 92,
    trend: 15.1,
  },
  {
    id: '4',
    name: 'Ansible',
    description: 'Configuration Management',
    category: 'DevOps',
    website_url: 'https://www.ansible.com/',
    github_url: 'https://github.com/ansible/ansible',
    popularity_score: 88,
    trend: 5.7,
  },
  {
    id: '5',
    name: 'Jenkins',
    description: 'Automation Server',
    category: 'CI/CD',
    website_url: 'https://www.jenkins.io/',
    github_url: 'https://github.com/jenkinsci/jenkins',
    popularity_score: 85,
    trend: 2.3,
  },
];

const mockTool1 = trendingTools[0];
const mockTool2 = trendingTools[1];
const mockTool3 = trendingTools[2];

export const recentReviews: Review[] = [
    {
        id: 'rev1',
        tool: mockTool1,
        title: 'Terraform: A Deep Dive into IaC Supremacy',
        slug: 'terraform-deep-dive',
        content: 'Discover why Terraform remains the king of Infrastructure as Code. We explore its provider ecosystem, state management, and performance in large-scale environments.',
        rating: 4.9,
        author: 'Alex Johnson',
        published_date: 'June 25, 2024',
        featured_image: 'https://picsum.photos/400/225',
        data_ai_hint: 'abstract code',
    },
    {
        id: 'rev2',
        tool: mockTool2,
        title: 'Is Kubernetes Still Worth the Complexity?',
        slug: 'kubernetes-complexity-review',
        content: 'Kubernetes powers the modern cloud, but its learning curve is steep. This review breaks down when to choose K8s and when to look for simpler alternatives.',
        rating: 4.7,
        author: 'Maria Garcia',
        published_date: 'June 22, 2024',
        featured_image: 'https://picsum.photos/400/226',
        data_ai_hint: 'server racks',
    },
    {
        id: 'rev3',
        tool: mockTool3,
        title: 'Monitoring with Prometheus: The Complete Guide',
        slug: 'prometheus-monitoring-guide',
        content: 'From installation to advanced PromQL queries, our comprehensive guide covers everything you need to know to master monitoring with Prometheus and Grafana.',
        rating: 4.8,
        author: 'Sam Chen',
        published_date: 'June 20, 2024',
        featured_image: 'https://picsum.photos/400/227',
        data_ai_hint: 'data dashboard',
    },
]
