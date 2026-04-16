param(
  [string]$AvdName = '',
  [int]$WaitSeconds = 180
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Write-Log { param($m) Write-Output "[INFO] $m" }
function Write-Err { param($m) Write-Error "[ERROR] $m" }

Push-Location -Path (Split-Path -Path $PSScriptRoot -Parent)

# ── Step 0: Expo Prebuild ────────────────────────────────────────────────────
# Genera la carpeta android/ si no existe (necesario en oyente-premium-RadioFD)
if (-not (Test-Path 'android')) {
  Write-Log 'android/ folder not found. Running expo prebuild --platform android --clean...'
  $npxPre = 'npx'
  & $npxPre expo prebuild --platform android --clean | Write-Output
  if ($LASTEXITCODE -ne 0) {
    Write-Err 'expo prebuild failed. Aborting.'
    Pop-Location
    exit 1
  }
  Write-Log 'expo prebuild completed.'
} else {
  Write-Log 'android/ folder already exists, skipping expo prebuild.'
}

# ── Step 1: Ensure assets dir ────────────────────────────────────────────────
$assetsDir = 'android\app\src\main\assets'
if (-not (Test-Path $assetsDir)) { Write-Log "Creating assets dir $assetsDir"; New-Item -ItemType Directory -Path $assetsDir | Out-Null }

# ── Step 2: Clean caches ─────────────────────────────────────────────────────
Write-Log 'Cleaning local caches (node_modules/.cache and Metro temp dirs)...'
try {
  $localCache = Join-Path (Get-Location) 'node_modules\.cache'
  if (Test-Path $localCache) {
    Write-Log "Removing $localCache"
    Remove-Item -Recurse -Force $localCache -ErrorAction SilentlyContinue
  }
  if ($env:TEMP) {
    $metroDirs = Get-ChildItem -Path $env:TEMP -Directory -ErrorAction SilentlyContinue | Where-Object { $_.Name -like 'metro-*' }
    foreach ($d in $metroDirs) {
      Write-Log "Removing Metro temp dir: $($d.FullName)"
      Remove-Item -Recurse -Force $d.FullName -ErrorAction SilentlyContinue
    }
  }
} catch {
  Write-Err "Failed cleaning caches: $($_.Exception.Message)"
}

# ── Step 3: Bundle handled by Expo/Gradle ────────────────────────────────────
Write-Log 'Skipping manual JS bundle. Expo/Gradle will generate the embedded bundle during assembleRelease.'

# ── Step 4: Build release APK ────────────────────────────────────────────────
Push-Location android
Write-Log 'Cleaning stale Gradle/autolinking outputs...'
foreach ($path in @(
  'app\build\generated\autolinking',
  'build\generated\autolinking',
  'app\build\outputs\apk'
)) {
  if (Test-Path $path) {
    Remove-Item -Recurse -Force $path -ErrorAction SilentlyContinue
  }
}
Write-Log 'Building release APK with Gradle...'
$gradlew = '.\gradlew.bat'
if (-not (Test-Path $gradlew)) { Write-Err "gradlew.bat not found in $(Get-Location)"; Pop-Location; Pop-Location; exit 3 }
& $gradlew assembleRelease --console=plain | Write-Output
if ($LASTEXITCODE -ne 0) {
  Write-Err 'Gradle assembleRelease failed. Review the compiler errors shown above. Aborting before APK lookup.'
  Pop-Location
  Pop-Location
  exit 8
}

$apkCandidates = Get-ChildItem -Path 'app\build\outputs\apk' -Recurse -Filter '*.apk' -ErrorAction SilentlyContinue |
  Where-Object { $_.FullName -match '\\release\\' } |
  Sort-Object LastWriteTime -Descending

if (-not $apkCandidates) {
  Write-Err 'Gradle finished but no release APK was found under android\app\build\outputs\apk.'
  Pop-Location
  Pop-Location
  exit 4
}

$apkPath = $apkCandidates[0].FullName
Write-Log "Built APK: $apkPath"

# ── Step 6: Device / emulator check ─────────────────────────────────────────
Push-Location -Path ..
Write-Log 'Checking connected devices (adb devices)'
$devs = & adb devices
Write-Output $devs
$hasDevice = ($devs -match '\tdevice')

if (-not $hasDevice) {
  Write-Log 'No device online. Listing AVDs.'
  $avds = & emulator -list-avds
  Write-Output $avds
  if ($AvdName -and $AvdName.Trim() -ne '') { $chosen = $AvdName } else {
    $first = $avds -split "\r?\n" | Where-Object { $_ -ne '' } | Select-Object -First 1
    $chosen = $first
  }
  if (-not $chosen) { Write-Err 'No AVD available. Create one in Android Studio AVD Manager.'; Pop-Location; Pop-Location; exit 5 }
  Write-Log "Starting AVD: $chosen"
  Start-Process -FilePath emulator -ArgumentList "-avd $chosen" -NoNewWindow
  Write-Log 'Waiting for emulator to boot...'
  $elapsed = 0
  while ($elapsed -lt $WaitSeconds) {
    Start-Sleep -Seconds 2
    $elapsed += 2
    $devs = & adb devices
    if ($devs -match '\tdevice') { $hasDevice = $true; break }
    Write-Output "Waiting... $elapsed s"
  }
  if (-not $hasDevice) { Write-Err 'Emulator did not appear as device within timeout.'; Pop-Location; Pop-Location; exit 6 }
}

# ── Step 7: Install APK ──────────────────────────────────────────────────────
Write-Log 'Starting background adb log capture to rn_live_log.txt'
if (Test-Path .\rn_live_log.txt) { Remove-Item .\rn_live_log.txt -Force -ErrorAction SilentlyContinue }
& adb logcat -c
$logJob = Start-Job -ScriptBlock { adb logcat *:S ReactNative:V ReactNativeJS:V > (Join-Path (Get-Location) 'rn_live_log.txt') }
Start-Sleep -Milliseconds 200

Write-Log 'Installing APK on device/emulator...'
adb install -r $apkPath | Write-Output

# ── Step 8: Launch app ───────────────────────────────────────────────────────
Write-Log 'Launching app'
& adb shell am start -n "com.radio.app/.MainActivity"
if ($LASTEXITCODE -ne 0) {
  Write-Log 'Primary launch failed, trying monkey fallback'
  & adb shell monkey -p com.radio.app -c android.intent.category.LAUNCHER 1
}

# ── Step 9: Finalize log capture ─────────────────────────────────────────────
try {
  if ($logJob -and (Get-Job -Id $logJob.Id -ErrorAction SilentlyContinue)) {
    Write-Log 'Stopping background adb log capture...'
    Stop-Job -Job $logJob -Force -ErrorAction SilentlyContinue
    Remove-Job -Job $logJob -Force -ErrorAction SilentlyContinue
  }
} catch {
  # ignore
}
if (Test-Path .\rn_live_log.txt) {
  Write-Log 'Last 200 lines from rn_live_log.txt:'
  Get-Content .\rn_live_log.txt -Tail 200 | Write-Output
}

Pop-Location; Pop-Location
Write-Log 'Done.'
