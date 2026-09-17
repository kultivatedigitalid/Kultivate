param(
    [Parameter(Mandatory = $true)][string]$InputPath,
    [Parameter(Mandatory = $true)][string]$OutputDir,
    [string]$Prefix = 'page'
)

$ErrorActionPreference = 'Stop'
$resolvedInput = (Resolve-Path -LiteralPath $InputPath).Path
$resolvedOutput = [System.IO.Path]::GetFullPath($OutputDir)
[System.IO.Directory]::CreateDirectory($resolvedOutput) | Out-Null
$pdfPath = Join-Path $resolvedOutput 'rendered.pdf'

$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0
$doc = $null
try {
    $doc = $word.Documents.Open($resolvedInput, $false, $true)
    $doc.ExportAsFixedFormat($pdfPath, 17, $false, 0, 0, 1, 9999, 0, $true, $true, 1, $true, $true, $false)
}
finally {
    if ($null -ne $doc) {
        $doc.Close($false)
        [void][System.Runtime.InteropServices.Marshal]::FinalReleaseComObject($doc)
    }
    $word.Quit()
    [void][System.Runtime.InteropServices.Marshal]::FinalReleaseComObject($word)
    [GC]::Collect()
    [GC]::WaitForPendingFinalizers()
}

if (-not (Test-Path -LiteralPath $pdfPath)) {
    throw "Word did not create the PDF output"
}

$pdftoppm = 'C:\Users\Joshua\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\poppler\Library\bin\pdftoppm.exe'
& $pdftoppm -png -r 150 $pdfPath (Join-Path $resolvedOutput $Prefix)
if ($LASTEXITCODE -ne 0) {
    throw "pdftoppm failed with exit code $LASTEXITCODE"
}

Get-ChildItem -LiteralPath $resolvedOutput -Filter "$Prefix-*.png" | Sort-Object Name | Select-Object -ExpandProperty FullName


