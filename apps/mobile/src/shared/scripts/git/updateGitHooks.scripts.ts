import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hooksDir = path.resolve(__dirname, '../../gitFiles/hooks');
const destinationDir = path.resolve(__dirname, '../../../../.git/hooks');

async function copyFileAndSetPermissions(hookName: string) {
  const sourceFile = path.join(hooksDir, hookName);
  const destinationFile = path.join(destinationDir, hookName);

  try {
    await fs.copyFile(sourceFile, destinationFile);
    console.log(`File copied successfully to ${destinationFile}`);

    await fs.chmod(destinationFile, 0o755);
    console.log(`Permissions set successfully for ${hookName} hook`);
  } catch (error) {
    console.error(`Failed to process ${hookName} hook: ${error}`);
  }
}

async function updateGitHooks() {
  const hooks = ['pre-commit', 'commit-msg', 'pre-push'];

  for (const hook of hooks) {
    await copyFileAndSetPermissions(hook);
  }
}

updateGitHooks();
