#Requires -Version 5.0

param (
    [parameter(Mandatory = $false,HelpMessage="Build the build & dev images instead of pulling from the registry")] [switch]$buildBuild,
    [parameter(Mandatory = $false,HelpMessage="Build the dev image instead of pulling from the registry")] [switch]$buildDev,
    [parameter(Mandatory = $false,HelpMessage="Port to listen on")] [string]$port,
    [parameter(Mandatory = $false,HelpMessage="Skip pulling build/dev images")] [switch]$skipPull,
    [parameter(Mandatory = $false,HelpMessage="Use DIR to for the theme, to devlop the theme at the same time")] [string]$theme,
    [parameter(Mandatory = $false,HelpMessage="Upload/push the build image after building")] [switch]$upload
)

$DefaultPort = 9001
$ListenPort = $DefaultPort
$Image = "rancher/docs"
$Tag = "dev"
$twitterConsumer = $env:TWITTER_CONSUMER
$twitterSecret = $env:TWITTER_SECRET

$dirPath = Split-Path -Parent $MyInvocation.MyCommand.Definition
$baseDirPath = Get-Location
if ($dirPath -eq $baseDirPath) {
  $baseDirPath = (Resolve-Path "$dirPath\..").Path
}
pushd $baseDirPath

if ($port) {
    $ListenPort = $port
}

$ThemeVolume = ""
if ($theme) {
    Write-Host "Using theme from $theme"
    $ThemeVolume = "-v ${baseDirPath}/${theme}:/run/node_modules/rancher-website-theme"
}

if ($buildBuild) {
    Write-Host "Building ${Image}:build"
    docker build --no-cache -f Dockerfile.build --build-arg TWITTER_CONSUMER=$twitterConsumer --build-arg TWITTER_SECRET=$twitterSecret -t ${Image}:build .
    if ($upload) {
        docker push ${Image}:build
    }
    $buildDev = $true
} elseif ($skipPull) {
    Write-Host "Skipping pull of ${Image}:build"
} else {
    Write-Host "Pulling ${Image}:build"
    docker pull ${Image}:build
}

if ($buildDev) {
    $Tag = "local"
    Write-Host "Building ${Image}:${Tag}"
    docker build -f Dockerfile.dev -t ${Image}:${Tag} .
} elseif ($skipPull) {
    Write-Host "Skipping pull of ${Image}:${Tag}"
} else {
    Write-Host "Pulling ${Image}:${Tag}"
    docker pull ${Image}:${Tag}
}

Write-Host "Starting server on http://localhost:${ListenPORT}"
docker run --rm -p ${ListenPort}:${ListenPort} -it `
  -v ${baseDirPath}/archetypes:/run/archetypes `
  -v ${baseDirPath}/assets:/run/assets `
  -v ${baseDirPath}/content:/run/content `
  -v ${baseDirPath}/data:/run/data `
  -v ${baseDirPath}/layouts:/run/layouts `
  -v ${baseDirPath}/scripts:/run/scripts `
  -v ${baseDirPath}/static:/run/static `
  -v ${baseDirPath}/.git:/run/.git `
  -v ${baseDirPath}/config.toml:/run/config.toml `
  ${ThemeVolume} ${Image}:${Tag} --port=${ListenPort}

popd
