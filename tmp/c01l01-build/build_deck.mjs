import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { Presentation, PresentationFile, FileBlob } from '@oai/artifact-tool';

const root='C:/Users/Joshua/OneDrive/Documents/Kultivate';
const dir=path.join(root,'tmp/c01l01-build');
const out=path.join(root,'outputs/Kultivate_Learn_C01L01_Sample_2026-09-14');
const skill='C:/Users/Joshua/.codex/plugins/cache/openai-primary-runtime/presentations/26.909.11809/skills/presentations';
const py='C:/Users/Joshua/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe';
const plan=JSON.parse(await fs.readFile(path.join(dir,'slides.json'),'utf8'));
const sources=JSON.parse(await fs.readFile(path.join(dir,'sources.json'),'utf8'));
const P=Presentation.create({slideSize:{width:1280,height:720}});
const C={bg:'#070B12',navy:'#0B1322',white:'#F4F7FB',gray:'#C9D3DF',muted:'#7A8798',cyan:'#67D9FF',line:'#273244'};

function text(s,t,x,y,w,h,size=30,color=C.white,bold=false,align='left',name=''){
  const sh=s.shapes.add({geometry:'textbox',name:name||t.slice(0,35),position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0}});
  sh.text=t; sh.text.style={typeface:'Arial',fontSize:size,bold,color,alignment:align,verticalAlignment:'top',autoFit:'none',wrap:'square',insets:{top:0,right:0,bottom:0,left:0}};
  return sh;
}
function line(s,x,y,w,color=C.line,thickness=1){return s.shapes.add({geometry:'line',name:'separator',position:{left:x,top:y,width:w,height:0},fill:'none',line:{fill:color,width:thickness}})}
function arrow(s,a,b,from='right',to='left',kind='straight',color=C.cyan){return s.shapes.connect(a,b,{kind,fromSide:from,toSide:to,line:{fill:color,width:2},tail:{type:'triangle',width:'sm',length:'sm'}})}
function base(n,title,tag=''){
  const s=P.slides.add(); s.background.fill=C.bg;
  text(s,'KULTIVATE LEARN',64,32,420,28,18,C.gray,true);
  text(s,'COURSE 01  /  LESSON 01',800,32,416,28,18,C.gray,false,'right');
  if(title)text(s,title,64,99,1148,122,49,C.white,true,'left','slide-title');
  if(tag)text(s,tag,64,220,1110,34,22,C.cyan);
  line(s,64,663,1152);
  text(s,'SEO for Business Growth: From Search to Sales',64,679,1020,25,16,C.gray);
  text(s,String(n).padStart(2,'0'),1160,675,56,27,20,C.gray,false,'right');
  return s;
}
function note(s,n,codes=[]){
 const it=plan[n-1];
 const refs=sources.filter(x=>codes.includes(x[0])).map(x=>`${x[0]} ${x[1]} — ${x[2]}\n${x[3]}\n${x[4]}`).join('\n\n');
 s.speakerNotes.textFrame.setText(`Konteks modul: ${it.chapter}.\n${it.source}\n\n${refs}\n\nSumber web diperiksa 14 September 2026. Catatan berisi referensi dan pemetaan modul, tanpa presenter script.`);
}

// 01 — Series orientation and lesson focus.
{
 const s=base(1,'');
 const logo=new Uint8Array(await fs.readFile(path.join(root,'Kultivate-logo-final.jpeg')));
 s.images.add({blob:logo,contentType:'image/jpeg',alt:'Logo Kultivate dari asset asli',fit:'contain',position:{left:58,top:91,width:295,height:71}});
 text(s,'Menghubungkan pencarian\ndengan peluang bisnis',64,211,1150,185,61,C.white,true,'left','slide-title');
 text(s,'Satu lesson, satu keputusan atau mental model',66,412,1080,52,29,C.gray);
 const vals=[['6','Courses'],['6','Lessons per Course'],['36','Lessons total']];
 for(let i=0;i<3;i++){let x=66+i*365;text(s,vals[i][0],x,510,108,90,69,C.cyan,true);text(s,vals[i][1],x+112,534,240,59,24,C.white);}
 text(s,'1 lesson = 1 video utama',66,616,1100,32,23,C.gray);
 note(s,1);
}
// 02 — A business question, without invented performance graphics.
{
 const s=base(2,'Traffic naik, peluangnya belum jelas','Kondisi ilustratif');
 text(s,'YANG SUDAH TERLIHAT',65,300,504,35,20,C.gray,true);
 text(s,'Website makin\nbanyak dikunjungi',65,356,512,150,44,C.white,true);
 s.shapes.add({geometry:'line',position:{left:620,top:290,width:0,height:272},line:{fill:C.line,width:2}});
 text(s,'YANG PERLU DIPERIKSA',683,300,514,35,20,C.cyan,true);
 text(s,'Kebutuhan siapa\nyang terbantu?',683,356,514,120,41,C.white,true);
 text(s,'Apakah ada inquiry yang sesuai?',683,520,514,85,29,C.gray);
 note(s,2);
}
// 03 — Distinguish demand from a visit count.
{
 const s=base(3,'Demand dan traffic');
 text(s,'Demand',65,300,480,72,57,C.cyan,true);
 text(s,'Kebutuhan terhadap solusi',65,386,500,82,32);
 text(s,'Traffic',687,300,485,72,57,C.white,true);
 text(s,'Kunjungan ke website',687,386,490,82,32);
 line(s,65,520,1130,C.line,2);
 text(s,'Relevansi',65,558,215,40,25,C.cyan,true);
 text(s,'Apakah kebutuhan itu dapat kita layani?',295,554,900,76,33,C.white);
 note(s,3);
}
// 04 — Editable framework with a return path.
{
 const s=base(4,'Empat momen pencarian','Kultivate framework');
 const xs=[64,356,648,940];
 const labels=['Discover','Learn','Compare/\nValidate','Act'];
 const small=['Mengenali\nmasalah','Memahami\nsolusi','Menilai kecocokan\ndan bukti','Mengambil\nlangkah berikutnya'];
 const nodes=[];
 for(let i=0;i<4;i++){
   text(s,String(i+1).padStart(2,'0'),xs[i],268,210,47,26,C.cyan);
   nodes.push(text(s,labels[i],xs[i],354,236,100,34,C.white,true));
   text(s,small[i],xs[i],465,238,92,26,C.gray);
 }
 for(let i=0;i<3;i++)arrow(s,nodes[i],nodes[i+1]);
 arrow(s,nodes[2],nodes[1],'top','top','curved',C.muted);
 text(s,'Momen dapat berulang atau terlewati',64,601,1140,37,25,C.gray);
 note(s,4,['S4']);
}
// 05 — One comparison table with native editable cells.
{
 const s=base(5,'Informasi mengikuti keputusan pembeli','Kultivate framework');
 const vals=[['Discover','Masalah apa yang perlu ditangani?'],['Learn','Bagaimana solusi bekerja?'],['Compare/Validate','Cocok dan bisa dipercaya?'],['Act','Bagaimana memulai?']];
 const t=s.tables.add({rows:4,columns:2,left:64,top:290,width:1152,height:280,columnWidths:[370,782],values:vals});
 t.borders.assign({fill:C.line,width:1,style:'solid'});
 t.cells.block({row:0,column:0,rowCount:4,columnCount:2}).assign({fill:C.bg,textStyle:{typeface:'Arial',fontSize:30,color:C.white},margins:{left:18,right:18,top:12,bottom:12},anchor:'center'});
 t.cells.block({row:0,column:0,rowCount:4,columnCount:1}).assign({textStyle:{typeface:'Arial',fontSize:29,color:C.cyan,bold:true}});
 text(s,'Satu halaman dapat membantu lebih dari satu momen',64,603,1152,39,26,C.gray);
 note(s,5);
}
// 06 — An evidence flow rather than a quantitative funnel.
{
 const s=base(6,'Bukti menuju peluang bisnis','Kultivate framework  •  Peta pemeriksaan, bukan funnel terukur');
 const xs=[64,357,650,943];
 const labels=['Visibility','Kunjungan\nrelevan','Inquiry','Qualified\nopportunity'];
 const captions=['Kemunculan','Konteks kebutuhan','Pesan diterima','Kecocokan diperiksa'];
 const nd=[];
 for(let i=0;i<4;i++){
   nd.push(text(s,labels[i],xs[i],316,230,106,34,C.white,true));
   line(s,xs[i],447,230,C.cyan,2);
   text(s,captions[i],xs[i],472,230,92,26,C.gray);
 }
 for(let i=0;i<3;i++)arrow(s,nd[i],nd[i+1]);
 text(s,'Setiap perpindahan perlu bukti',64,581,650,37,28,C.cyan,true);
 text(s,'Peluang sesuai belum berarti penjualan',64,620,1100,34,24,C.gray);
 note(s,6,['S2']);
}
// 07 — Events are separated from business validation.
{
 const s=base(7,'Klik kontak belum membuktikan inquiry','Contoh ilustratif');
 const xs=[65,460,855],labs=['Klik tombol\nkontak','Pesan benar-benar\nditerima','Kebutuhan\ndiperiksa tim'];
 const nd=[];
 for(let i=0;i<3;i++){
   text(s,String(i+1),xs[i],298,100,64,47,C.cyan,true);
   nd.push(text(s,labs[i],xs[i],385,332,121,36,C.white,true));
 }
 arrow(s,nd[0],nd[1]);arrow(s,nd[1],nd[2]);
 text(s,'Key event mencatat tindakan penting,\nbukan otomatis peluang yang sesuai',65,566,1150,79,31,C.gray);
 note(s,7,['S3']);
}
// 08 — First half of the worked example.
{
 const s=base(8,'Contoh perawatan AC kantor','Contoh hipotetis  •  Bukan keyword hasil riset');
 text(s,'01  DISCOVER',65,300,500,35,23,C.cyan,true);
 text(s,'AC kantor\nsering bermasalah',65,362,510,132,43,C.white,true);
 text(s,'Perlu memahami masalah',65,527,510,70,29,C.gray);
 text(s,'02  LEARN',690,300,500,35,23,C.cyan,true);
 text(s,'Perawatan berkala\nmencakup apa',690,362,510,132,43,C.white,true);
 text(s,'Perlu memahami lingkup layanan',690,527,510,83,29,C.gray);
 note(s,8);
}
// 09 — Same example moves to validation and action.
{
 const s=base(9,'Kecocokan diperiksa sebelum menjadi peluang','Contoh hipotetis');
 text(s,'03  COMPARE / VALIDATE',65,304,575,34,22,C.cyan,true);
 text(s,'Area layanan\nCakupan pekerjaan\nBukti relevan',65,369,529,165,36,C.white,true);
 text(s,'04  ACT',734,304,470,34,22,C.cyan,true);
 text(s,'Kirim kebutuhan\nPahami tindak lanjut',734,369,470,155,36,C.white,true);
 line(s,65,559,1136,C.line,2);
 text(s,'Permintaan masuk masih perlu diperiksa kecocokannya',65,591,1136,67,31,C.gray);
 note(s,9);
}
// 10 — Observation, hypothesis and a useful next check.
{
 const s=base(10,'Observasi dan hipotesis','Contoh hipotetis');
 const rows=[['OBSERVASI','Area layanan tidak tercantum di halaman'],['HIPOTESIS','Calon pembeli ragu lalu batal menghubungi'],['BUKTI BERIKUTNYA','Periksa pertanyaan lokasi dalam inquiry']];
 rows.forEach((r,i)=>{const yy=305+i*107;text(s,r[0],65,yy,309,42,22,C.cyan,true);text(s,r[1],390,yy-3,815,82,32,C.white);if(i<2)line(s,65,yy+82,1135)});
 note(s,10);
}
// 11 — Worksheet continuation with the two meaningful boundaries.
{
 const s=base(11,'Peta awal untuk layanan Anda','Search-to-Sales Mapping Worksheet  •  Bagian C01L01');
 const steps=['Pilih satu layanan','Jawab empat pertanyaan pembeli','Catat satu gap atau unknown','Tentukan bukti berikutnya'];
 steps.forEach((x,i)=>{text(s,String(i+1).padStart(2,'0'),65,303+76*i,61,43,25,C.cyan);text(s,x,143,302+76*i,603,64,30,C.white,i===3)});
 s.shapes.add({geometry:'line',position:{left:795,top:290,width:0,height:328},line:{fill:C.line,width:2}});
 text(s,'Belum tahu\nperilaku search?',852,306,353,92,30,C.white,true);
 text(s,'Periksa dahulu.',852,404,353,43,27,C.cyan);
 text(s,'Inquiry relevan\nterlambat ditangani?',852,479,353,85,28,C.white,true);
 text(s,'Periksa tindak lanjut.',852,582,353,50,25,C.cyan);
 note(s,11);
}
// 12 — One takeaway and a learning CTA.
{
 const s=base(12,'');
 text(s,'Search dinilai lewat\nkeputusan yang dibantunya',64,134,1152,160,57,C.white,true,'left','slide-title');
 text(s,'Periksa bukti menuju inquiry yang sesuai.',64,338,1120,60,37,C.cyan);
 text(s,'Traffic saja belum membuktikan peluang bisnis.',64,410,1136,62,32,C.gray);
 line(s,64,519,1136);
 text(s,'BERIKUTNYA  /  LESSON 02',64,550,1100,31,20,C.gray,true);
 text(s,'Map Customer Demand Before Choosing Keywords',64,593,1130,47,29,C.white,true);
 text(s,'Worksheet C01L01 bersifat opsional',64,644,1000,24,17,C.gray);
 note(s,12);
}

await fs.mkdir(path.join(dir,'qa-slides'),{recursive:true});
await fs.mkdir(path.join(dir,'finalizer'),{recursive:true});
const candidate=path.join(dir,'candidate.pptx');
await (await PresentationFile.exportPptx(P)).save(candidate);
await fs.writeFile(path.join(dir,'presentation.json'),JSON.stringify(P.toProto()));
for(let i=0;i<P.slides.items.length;i++){
 const s=P.slides.items[i];
 const img=await P.export({slide:s,format:'png',scale:1});
 await fs.writeFile(path.join(dir,'qa-slides',`slide-${String(i+1).padStart(2,'0')}.png`),new Uint8Array(await img.arrayBuffer()));
 const layout=await s.export({format:'layout'}); await fs.writeFile(path.join(dir,'qa-slides',`slide-${i+1}.layout.json`),await layout.text());
}
const {finalizePresentation}=await import(pathToFileURL(path.join(skill,'container_tools/artifact_tool_utils.mjs')).href);
process.env.RUNTIME_NODE_MODULES='C:/Users/Joshua/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const result=await finalizePresentation({
 workspaceDir:root,candidatePath:candidate,finalPath:path.join(out,'C01L01_Teaching_Slides.pptx'),pythonExecutable:py,
 integrityValidatorPath:path.join(skill,'container_tools/inspect_presentation_package_integrity.py'),
 layoutValidatorPath:path.join(skill,'container_tools/inspect_presentation_layout_geometry.py'),
 layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-bullet-geometry','--validate-heading-fit','--require-native-table-slide','5'],
 requiredNativeTableOwnerSlides:[5],fontPolicy:{basis:'design',families:['Arial']},verifyArtifactToolImport:true,
 receiptPath:path.join(dir,'finalizer/validation.json')
});
console.log(JSON.stringify(result));
