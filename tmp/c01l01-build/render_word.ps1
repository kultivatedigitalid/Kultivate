param([string]$InputPath,[string]$OutputDir)
$ErrorActionPreference='Stop'
$inputDoc=(Resolve-Path -LiteralPath $InputPath).Path
$renderDir=[IO.Path]::GetFullPath($OutputDir)
[IO.Directory]::CreateDirectory($renderDir) | Out-Null
Write-Output 'Creating isolated Word renderer'
$renderWord=New-Object -ComObject Word.Application
Write-Output 'Word instance created'
$renderWord.Visible=$false
$renderWord.DisplayAlerts=0
$renderWord.AutomationSecurity=3
$renderWord.Options.UpdateLinksAtOpen=$false
$renderWord.Options.SaveNormalPrompt=$false
$renderDoc=$null
try {
    Write-Output 'Opening document'
    $renderDoc=$renderWord.Documents.OpenNoRepairDialog($inputDoc,$false,$true,$false)
    Write-Output 'Document opened'
    $renderDoc.Repaginate()
    $renderDoc.SaveAs2((Join-Path $renderDir 'rendered.pdf'),17)
    Write-Output 'PDF exported'
} finally {
    if($null -ne $renderDoc){$renderDoc.Close($false)}
    $renderWord.Quit()
}
& 'C:\Users\Joshua\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\poppler\Library\bin\pdftoppm.exe' -png -r 110 (Join-Path $renderDir 'rendered.pdf') (Join-Path $renderDir 'page')
Get-ChildItem -LiteralPath $renderDir -Filter 'page-*.png' | Select-Object Name,Length
