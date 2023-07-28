const fs = require("fs");
const path = require("path");

function removeFilesRecursively(dirPath, fileNames) {
  try {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      const isDirectory = fs.statSync(filePath).isDirectory();

      if (isDirectory) {
        removeFilesRecursively(filePath, fileNames);
      } else {
        if (fileNames.includes(file)) {
          fs.unlinkSync(filePath);
          console.log(`Removed: ${filePath}`);
        }
      }
    });

    // Remove the node_modules directory if it exists
    const nodeModulesPath = path.join(dirPath, "node_modules");
    if (fs.existsSync(nodeModulesPath)) {
      fs.rmdirSync(nodeModulesPath, { recursive: true });
      console.log(`Removed directory: ${nodeModulesPath}`);
    }
  } catch (err) {
    console.error(`Error while processing ${dirPath}: ${err.message}`);
  }
}

const workspaceRoot = path.resolve(__dirname, "packages");
const filesToRemove = ["yarn.lock", "package-lock.json"];

// Remove from the root directory first
removeFilesRecursively(path.resolve(__dirname, '../'), filesToRemove);

// Then, remove from packages
removeFilesRecursively(workspaceRoot, filesToRemove);

console.log("Cleanup completed!");
