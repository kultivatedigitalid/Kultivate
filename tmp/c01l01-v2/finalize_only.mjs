import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { Presentation, PresentationFile, FileBlob } from '@oai/artifact-tool';

const root='C:/Users/Joshua/OneDrive/Documents/Kultivate';
const dir=path.join(root,'tmp/c01l01-v2');
const out=path.join(root,'outputs/Kultivate_Learn_C01L01_Sample_v2_Bahasa_Santai_2026-09-14');
const skill='C:/Users/Joshua/.codex/plugins/cache/openai-primary-runtime/presentations/26.909.11809/skills/presentations';
const py='C:/Users/Joshua/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe';
await fs.mkdir(path.join(dir,'checked-delivery'),{recursive:true});
const candidate=path.join(dir,'candidate.pptx');
const {finalizePresentation}=await import(pathToFileURL(path.join(skill,'container_tools/artifact_tool_utils.mjs')).href);
process.env.RUNTIME_NODE_MODULES='C:/Users/Joshua/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const result=await finalizePresentation({
 workspaceDir:root,candidatePath:candidate,finalPath:path.join(dir,'checked-delivery/C01L01_Teaching_Slides_v2.pptx'),pythonExecutable:py,
 integrityValidatorPath:path.join(skill,'container_tools/inspect_presentation_package_integrity.py'),
 layoutValidatorPath:path.join(skill,'container_tools/inspect_presentation_layout_geometry.py'),
 layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-bullet-geometry','--validate-heading-fit','--require-native-table-slide','5'],
 requiredNativeTableOwnerSlides:[5],fontPolicy:{basis:'design',families:['Arial']},verifyArtifactToolImport:true,
 receiptPath:path.join(dir,'finalizer/validation-final.json')
});
console.log(JSON.stringify(result));
