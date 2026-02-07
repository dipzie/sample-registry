# =========================================
# Windows Software Installation Inventory
# Read-only snapshot (NO Node, NO npm)
# =========================================

$ErrorActionPreference = "SilentlyContinue"

# --- Timestamp ---
$timestamp = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssZ")

# --- Output path ---
$outputDir = "..\output"
$outputFile = "$outputDir\inventory.json"

if (!(Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir | Out-Null
}

$software = @()

# --- Win32 Installed Applications (Registry) ---
$registryPaths = @(
  "HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall\*",
  "HKLM:\Software\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall\*",
  "HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\*"
)

foreach ($path in $registryPaths) {
  Get-ItemProperty $path |
    Where-Object { $_.DisplayName } |
    ForEach-Object {
      $software += @{
        name      = $_.DisplayName
        version   = $_.DisplayVersion
        publisher = $_.Publisher
        source    = "registry"
        type      = "win32"
      }
    }
}

# --- Microsoft Store / AppX Applications ---
Get-AppxPackage | ForEach-Object {
  $software += @{
    name      = $_.Name
    version   = $_.Version.ToString()
    publisher = $_.Publisher
    source    = "appx"
    type      = "store"
  }
}

# --- Snapshot object ---
$snapshot = @{
  captured_at = $timestamp
  os          = "windows"
  software    = $software
}

# --- Write JSON snapshot ---
$snapshot | ConvertTo-Json -Depth 6 | Out-File -Encoding UTF8 $outputFile

Write-Host "✅ Software inventory snapshot created:"
Write-Host "   $outputFile"
