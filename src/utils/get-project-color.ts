import { THEME_COLORS_DARK } from "constants/theme";
import { ThemeColor } from "models/theme";

// Hash function for generating a consistent seed from project ID
function hashProjectId(projectId: string): number {
  let hash = 0;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < projectId.length; i++) {
    const char = projectId.charCodeAt(i);
    hash = Math.imul(hash, 31) + char;
    // eslint-disable-next-line no-bitwise
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Function to get color based on project ID
function getColorForProject(projectId: string): ThemeColor {
  const seed = hashProjectId(projectId);
  const colors = Object.keys(THEME_COLORS_DARK).filter((key) =>
    key.startsWith("accent"),
  ) as ThemeColor[];

  // Get the color index based on the seed
  const index = seed % colors.length;

  // Return the color at the generated index
  return colors[index];
}

export default getColorForProject;
