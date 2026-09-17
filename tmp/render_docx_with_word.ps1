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

$word = $null
$doc = $null
try {
    $word = New-Object -ComObject Word.Application
    $word.Visible = $false
    $word.DisplayAlerts = 0
    $doc = $word.Documents.Open($resolvedInput, $false, $true)
    $doc.SaveAs2($pdfPath, 17)
}
finally {
    if ($null -ne $doc) {
        $doc.Close($false)
        [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($doc)
    }
    if ($null -ne $word) {
        $word.Quit()
        [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($word)
    }
    [GC]::Collect()
    [GC]::WaitForPendingFinalizers()
}

$pdftoppm = 'C:\Users\Joshua\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\poppler\Library\bin\pdftoppm.exe'
& $pdftoppm -png -r 150 $pdfPath (Join-Path $resolvedOutput $Prefix)
if ($LASTEXITCODE -ne 0) {
    throw "pdftoppm failed with exit code $LASTEXITCODE"
}

Get-ChildItem -LiteralPath $resolvedOutput -Filter "$Prefix-*.png" | Sort-Object Name | Select-Object -ExpandProperty FullName
