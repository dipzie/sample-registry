import { exec } from "child_process";

export function getStoreApps() {
  return new Promise((resolve, reject) => {
    const cmd = `
      powershell -NoProfile -Command "
        Get-AppxPackage |
        Select Name, Version, Publisher
      "
    `;

    exec(cmd, { maxBuffer: 1024 * 1024 * 10 }, (err, stdout) => {
      if (err) return reject(err);
      resolve(stdout);
    });
  });
}
