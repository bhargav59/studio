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
        content: `
# What is Terraform?
Terraform is an open-source infrastructure as code (IaC) tool created by HashiCorp. It allows developers to define and provision data center infrastructure using a high-level configuration language known as HashiCorp Configuration Language (HCL), or optionally JSON. It solves the problem of manual infrastructure setup, which is often slow, error-prone, and difficult to reproduce.

# How does Terraform work?
Terraform works by using a declarative approach. You define the desired end state of your infrastructure in configuration files, and Terraform creates an execution plan to reach that state. The core workflow is:
1.  **Write:** You define infrastructure in configuration files.
2.  **Plan:** Terraform creates an execution plan that outlines the changes needed to reach the desired state.
3.  **Apply:** On approval, Terraform executes the plan and provisions or modifies the infrastructure.

# Key Components of Terraform
- **Providers:** Plugins that interface with cloud providers' APIs (e.g., AWS, Azure, Google Cloud).
- **State File:** A JSON file that keeps track of the resources Terraform manages, mapping them to real-world infrastructure.
- **Modules:** Reusable containers for multiple resources that are used together, promoting organization and code reuse.
- **Configuration Files:** Files written in HCL (`\'\'\'.tf\'\'\') where you declare your resources.

# How do organizations use Terraform?
- **Multi-Cloud Deployments:** Manage resources across different cloud providers with a single toolset.
- **Infrastructure as Code (IaC):** Version control infrastructure, enabling peer review and collaboration.
- **Automated Provisioning:** Integrate with CI/CD pipelines to automate the creation of testing, staging, and production environments.

# Terraform vs. Ansible
While both are IaC tools, they serve different purposes. Terraform excels at **provisioning** infrastructure (creating servers, databases, networks), while Ansible is a configuration management tool focused on **configuring** the software and services within those resources (installing packages, starting services). They are often used together: Terraform builds the house, and Ansible furnishes it.

# Conclusion
Terraform is an industry-standard for infrastructure provisioning. Its declarative nature, strong community, and extensive provider ecosystem make it a powerful choice for any team practicing DevOps or managing cloud infrastructure. While it has a learning curve, its benefits in automation, reliability, and scalability are undeniable.
`,
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
