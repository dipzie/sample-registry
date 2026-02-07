# Windows Software Inventory (Node.js)

A **read-only Windows software installation inventory tool** built with **Node.js only**.

This project lists **installed applications** on a Windows machine by reading:

- Windows Registry (Win32 desktop apps)
- Microsoft Store / AppX packages

⚠️ This tool **does NOT** include:

- No behavior tracking
- No usage monitoring
- No intelligence / PSBI
- No modification or enforcement

It is **installation-only**.

---

## Features

- Lists installed Win32 desktop applications
- Lists installed Microsoft Store (AppX) applications
- Outputs a normalized JSON inventory
- Read-only and safe
- No native addons
- No admin drivers

---

## Requirements

- Windows 10 / 11
- Node.js v18+ (recommended)
- PowerShell (already included in Windows)

---

## Installation

```bash
git clone https://github.com/YOUR_USERNAME/win-software-inventory.git
cd win-software-inventory
```
