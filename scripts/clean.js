import fs from "fs";
import path from "path";

const __dirname = path.resolve();
const packagesDir = path.resolve(__dirname, "packages");

function removeNodeModulesAndLockFiles(directory) {
  // Remove node_modules directory
  const nodeModulesPath = path.join(directory, "node_modules");
  if (fs.existsSync(nodeModulesPath)) {
    fs.rmSync(nodeModulesPath, { recursive: true, force: true });
    console.log(`Removed node_modules in ${directory}`);
  }

  // Remove package-lock.json file (for npm)
  const npmLockPath = path.join(directory, "package-lock.json");
  if (fs.existsSync(npmLockPath)) {
    fs.rmSync(npmLockPath);
    console.log(`Removed package-lock.json in ${directory}`);
  }

  // Remove yarn.lock file (for Yarn)
  const yarnLockPath = path.join(directory, "yarn.lock");
  if (fs.existsSync(yarnLockPath)) {
    fs.rmSync(yarnLockPath);
    console.log(`Removed yarn.lock in ${directory}`);
  }

  // Remove pnpm-lock.yaml file (for pnpm)
  const pnpmLockPath = path.join(directory, "pnpm-lock.yaml");
  if (fs.existsSync(pnpmLockPath)) {
    fs.rmSync(pnpmLockPath);
    console.log(`Removed pnpm-lock.yaml in ${directory}`);
  }
}

function cleanDirectory(directory) {
  // Remove node_modules and lock files in the directory
  removeNodeModulesAndLockFiles(directory);

  // Check if the directory is the root directory
  if (directory !== __dirname) {
    // If not, recursively clean its subdirectories
    fs.readdirSync(directory).forEach((item) => {
      const itemPath = path.join(directory, item);
      if (fs.lstatSync(itemPath).isDirectory()) {
        cleanDirectory(itemPath);
      }
    });
  }
}

function cleanPackages() {
  // Clean the root directory
  cleanDirectory(__dirname);

  // Clean packages directory
  fs.readdirSync(packagesDir).forEach((packageName) => {
    const packageDir = path.join(packagesDir, packageName);
    if (fs.lstatSync(packageDir).isDirectory()) {
      cleanDirectory(packageDir);
    }
  });
}

cleanPackages();
