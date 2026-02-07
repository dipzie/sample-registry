import { exec } from "child_process";

export function getWin32Apps() {
  return new Promise((resolve, reject) => {
    const cmd = `
      powershell -NoProfile -Command "
        Get-ItemProperty
          HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*,
          HKLM:\\Software\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*,
          HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\* |
        Where-Object { $_.DisplayName } |
        Select DisplayName, DisplayVersion, Publisher
      "
    `;

    exec(cmd, { maxBuffer: 1024 * 1024 * 10 }, (err, stdout) => {
      if (err) return reject(err);
      resolve(stdout);
    });
  });
}
