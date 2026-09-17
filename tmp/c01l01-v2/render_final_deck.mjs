import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {FileBlob, PresentationFile} from '@oai/artifact-tool';
const root='C:/Users/Joshua/OneDrive/Documents/Kultivate';
const dir=path.join(root,'tmp/c01l01-v2');
const file=path.join(root,'outputs/Kultivate_Learn_C01L01_Sample_v2_Bahasa_Santai_2026-09-14/C01L01_Teaching_Slides_v2.pptx');
const P=await PresentationFile.importPptx(await FileBlob.load(file));
await fs.mkdir(path.join(dir,'qa-final-slides'),{recursive:true});
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const checks=[];
for(let i=0;i<P.slides.items.length;i++){
 const im=await P.export({slide:P.slides.items[i],format:'png',scale:1});
 const bytes=new Uint8Array(await im.arrayBuffer());
 const name=`slide-${String(i+1).padStart(2,'0')}.png`;
 await fs.writeFile(path.join(dir,'qa-final-slides',name),bytes);
 checks.push({slide:i+1,same:sha(bytes)===sha(await fs.readFile(path.join(dir,'qa-slides',name)))});
}
await fs.writeFile(path.join(dir,'final-render-comparison.json'),JSON.stringify(checks,null,2));
console.log(checks);
