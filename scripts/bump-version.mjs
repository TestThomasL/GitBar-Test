#!/usr/bin/env node
import { execSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";

const INFO_PLIST_PATH = "macos/GitBar/Info.plist";
const PACKAGE_JSON_PATH = "package.json";

/**
 * @returns {string}
 */
function getCurrentVersion() {
  const packageJson = JSON.parse(readFileSync(PACKAGE_JSON_PATH, "utf8"));
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return packageJson.version;
}

/**
 * @returns {number}
 */
function getCurrentBuildNumber() {
  const infoPlist = readFileSync(INFO_PLIST_PATH, "utf8");
  const match = infoPlist.match(
    /<key>CFBundleVersion<\/key>\s*<string>(\d+)<\/string>/,
  );
  if (!match) {
    throw new Error("Could not find build number in Info.plist");
  }
  return parseInt(match[1], 10);
}

/**
 * @param {string} newVersion
 */
function updatePackageJson(newVersion) {
  const packageJson = JSON.parse(readFileSync(PACKAGE_JSON_PATH, "utf8"));
  packageJson.version = newVersion;
  writeFileSync(PACKAGE_JSON_PATH, `${JSON.stringify(packageJson, null, 2)}\n`);
}

/**
 * @param {string} newVersion
 * @param {number} newBuildNumber
 */
function updateInfoPlist(newVersion, newBuildNumber) {
  let content = readFileSync(INFO_PLIST_PATH, "utf8");

  content = content.replace(
    /<key>CFBundleShortVersionString<\/key>\s*<string>[^<]+<\/string>/,
    `<key>CFBundleShortVersionString</key>\n\t<string>${newVersion}</string>`,
  );

  content = content.replace(
    /<key>CFBundleVersion<\/key>\s*<string>[^<]+<\/string>/,
    `<key>CFBundleVersion</key>\n\t<string>${newBuildNumber}</string>`,
  );

  writeFileSync(INFO_PLIST_PATH, content);
}

/**
 * @param {'major' | 'minor' | 'patch'} type
 * @returns {{ newVersion: string, newBuildNumber: number }}
 */
function bumpVersion(type = "patch") {
  const currentVersion = getCurrentVersion();
  const [major, minor, patch] = currentVersion.split(".").map(Number);

  let newVersion;
  switch (type) {
    case "major":
      newVersion = `${major + 1}.0.0`;
      break;
    case "minor":
      newVersion = `${major}.${minor + 1}.0`;
      break;
    case "patch":
      newVersion = `${major}.${minor}.${patch + 1}`;
      break;
    default:
      throw new Error("Invalid version type. Use major, minor, or patch");
  }

  const newBuildNumber = getCurrentBuildNumber() + 1;

  return { newVersion, newBuildNumber };
}

/**
 * @returns {{ newVersion: string, newBuildNumber: number }}
 */
function bumpOnlyBuildNumber() {
  const currentVersion = getCurrentVersion();
  const newBuildNumber = getCurrentBuildNumber() + 1;
  return { newVersion: currentVersion, newBuildNumber };
}

/**
 * @param {string} version
 * @param {number} buildNumber
 */
function commitAndTag(version, buildNumber) {
  execSync("git add package.json macos/GitBar/Info.plist");
  execSync(`git commit -m "chore(release): v${version} build: ${buildNumber}"`);
  execSync(`git tag -a v${version} -m "v${version}"`);
  execSync("git push && git push --tags");
}

function main() {
  const args = process.argv.slice(2);
  const type = args[0];

  if (!["major", "minor", "patch", "build"].includes(type)) {
    console.error("Please specify version type: major, minor, patch, or build");
    process.exit(1);
  }

  try {
    const { newVersion, newBuildNumber } =
      type === "build" ? bumpOnlyBuildNumber() : bumpVersion(type);

    updatePackageJson(newVersion);
    updateInfoPlist(newVersion, newBuildNumber);
    commitAndTag(newVersion, newBuildNumber);

    // eslint-disable-next-line no-console
    console.log(
      `Successfully bumped version to ${newVersion} (build ${newBuildNumber})`,
    );
  } catch (error) {
    console.error(
      "Error:",
      error instanceof Error ? error.message : String(error),
    );
    process.exit(1);
  }
}

main();
