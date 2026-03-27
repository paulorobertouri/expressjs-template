# PowerShell script to rename the ExpressJS template project
# Usage: ./rename-template.ps1 NewProjectName
param(
    [Parameter(Mandatory = $true)]
    [string]$NewName
)

# Replace all occurrences of 'expressjs-template' and 'ExpressJS Template' in all files
Get-ChildItem -Path . -Recurse -File | ForEach-Object {
    (Get-Content $_.FullName) -replace 'expressjs-template', $NewName -replace 'ExpressJS Template', $NewName | Set-Content $_.FullName
}

Write-Host "Renamed project to $NewName. Please update package.json manually if needed."
