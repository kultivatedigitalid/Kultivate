param([string[]]$Kinds=@('module','worksheet','planning'))
$ErrorActionPreference='Stop'
$taskRoot='C:\Users\Joshua\OneDrive\Documents\Kultivate'
$taskBuild=Join-Path $taskRoot 'tmp\c01l01-v2'
$taskOut=Join-Path $taskRoot 'outputs\Kultivate_Learn_C01L01_Sample_v2_Bahasa_Santai_2026-09-14'
$localRenderDir=Join-Path ([IO.Path]::GetTempPath()) 'kultivate-c01l01-v2-render'
[IO.Directory]::CreateDirectory($localRenderDir) | Out-Null
$names=@{module='C01L01_Modul_Pembelajaran_v2.docx';worksheet='C01L01_Worksheet_Search_to_Sales_v2.docx';planning='C01L01_Slide_Planning_dan_Quality_Check_v2.docx'}
$renderWord=New-Object -ComObject Word.Application
$renderWord.Visible=$false
$renderWord.DisplayAlerts=0
$renderWord.AutomationSecurity=3
$renderWord.Options.UpdateLinksAtOpen=$false
$renderWord.Options.SaveNormalPrompt=$false
try {
 foreach($kind in $Kinds){
  $inputDoc=Join-Path $localRenderDir $names[$kind]
  Copy-Item -LiteralPath (Join-Path $taskOut $names[$kind]) -Destination $inputDoc -Force
  $renderDir=Join-Path $taskBuild ('qa-'+$kind+'-final')
  [IO.Directory]::CreateDirectory($renderDir) | Out-Null
  $renderDoc=$null
  try {
   $renderDoc=$renderWord.Documents.OpenNoRepairDialog($inputDoc,$false,$true,$false)
   $renderDoc.Repaginate()
   $renderDoc.ExportAsFixedFormat((Join-Path $renderDir 'rendered.pdf'),17,$false,0,0,1,1,0,$true,$true,0,$true,$true,$true)
   Write-Output ($kind+': PDF exported')
  } finally {if($null -ne $renderDoc){$renderDoc.Close($false)}}
 }
} finally {$renderWord.Quit()}
