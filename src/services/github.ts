/**
 * @fileoverview Service for interacting with the GitHub API.
 */

// Define a type for the repository data we expect from the GitHub API.
// This helps ensure type safety and code clarity.
export type Repository = {
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
};

/**
 * Fetches trending repositories from the specified GitHub API URL.
 *
 * @param apiUrl - The GitHub API URL to fetch data from.
 * @returns A promise that resolves to an array of repository objects.
 * @throws An error if the API request fails.
 */
export async function getTrendingRepositories(
  apiUrl: string
): Promise<Repository[]> {
  try {
    const response = await fetch(apiUrl, {
      // It's a good practice to include a User-Agent header for the GitHub API.
      headers: {
        'User-Agent': 'CloudEngineered-App/1.0',
      },
      // Use Next.js's caching mechanism to avoid hitting the API on every request.
      // Revalidate the data every hour.
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return data.items as Repository[];
  } catch (error) {
    console.error('Failed to fetch from GitHub API:', error);
    // Re-throw the error to be handled by the caller.
    throw new Error('Could not fetch trending repositories from GitHub.');
  }
}
