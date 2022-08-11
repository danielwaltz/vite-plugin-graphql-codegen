import fs from 'node:fs';

export function restartVite(fileName: string) {
  if (!fileName) return;

  const time = new Date();

  try {
    fs.utimesSync(fileName, time, time);
  } catch (error) {
    fs.closeSync(fs.openSync(fileName, 'w'));
  }
}
