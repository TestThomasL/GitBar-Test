// Extracts parameters from a URL based on a pattern
// For example, given the URL /facebook/react/issues/123 and the pattern /:owner/:repo/issues/:issueId
// extractParams will return { owner: "facebook", repo: "react", issueId: "123" }
function extractParams(url: string, pattern: string) {
  // Extract the pathname from the full URL
  const { pathname } = new URL(url);

  // Create a regex pattern from the input pattern
  const regexPattern = pattern
    .replace(/:[^/]+/g, "([^/]+)") // Replace :param with regex group to match segments
    .replace(/\//g, "\\/"); // Escape forward slashes for regex

  const regex = new RegExp(`^${regexPattern}$`);

  // Execute regex on the pathname
  const match = pathname.match(regex);
  if (!match) return null;

  // Extract parameter names (e.g., :owner, :repo, :issueId)
  const keys = [...pattern.matchAll(/:([^/]+)/g)].map((key) => key[1]);

  // Build the params object
  const params: Record<string, string> = {};
  keys.forEach((key, index) => {
    params[key] = match[index + 1];
  });

  return params;
}

export default extractParams;
