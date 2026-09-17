from pathlib import Path
import json,re
ROOT=Path(__file__).resolve().parents[2]/'website'
def write(p,t): (ROOT/p).write_text(t,encoding='utf-8',newline='\n')
def change(p,a,b):
    t=(ROOT/p).read_text(encoding='utf-8');assert a in t,(p,a[:65]);write(p,t.replace(a,b))
meta={
 'en':{'home':['Digital growth, built around your business','SEO, Web Services, Visual Strategy, and Social Media Management. Help your business get found, understood, and chosen.'], 'services':['Services for Your Priorities','SEO, Web Services, Visual Strategy, and Social Media Management shaped around your business and how customers make decisions.'], 'footer':'Search, websites, visual strategy, and social media. Built around your business.'},
 'id':{'home':['Pertumbuhan digital untuk bisnis Anda','SEO, Web Services, Visual Strategy, dan Social Media Management agar bisnis Anda lebih mudah ditemukan, dipahami, dan dipilih.'], 'services':['Layanan untuk Prioritas Anda','SEO, Web Services, Visual Strategy, dan Social Media Management berdasarkan bisnis Anda dan cara pelanggan mengambil keputusan.'], 'footer':'Search, website, visual strategy, dan social media. Dimulai dari bisnis Anda.'}
}
for loc,m in meta.items():
    for key,p in [('home',f'src/pages/{loc}/index.astro'),('services',f'src/pages/{loc}/services/index.astro')]:
        t=(ROOT/p).read_text(encoding='utf-8');t=re.sub(r'title="[^"]+"','title="'+m[key][0]+'"',t,count=1);t=re.sub(r'description="[^"]+"','description="'+m[key][1]+'"',t,count=1);write(p,t)
    p=f'src/i18n/{loc}.ts';t=(ROOT/p).read_text(encoding='utf-8');t=re.sub(r"'footer.tagline': '[^']+'","'footer.tagline': '"+m['footer']+"'",t);t=t.replace("'contact.service_social': 'Content Management'","'contact.service_social': 'Social Media Management'").replace("'contact.service_system': 'AEO & GEO'","'contact.service_visual': 'Visual Strategy'");write(p,t)
change('src/data/site.ts',"tagline: 'SEO Agency for Search and AI Visibility'","tagline: 'Found. Understood. Chosen.'")
p='src/components/home/ConnectedSystem.astro'
swaps={
 'Empat tahap yang menghubungkan search dan website tanpa memaksakan seluruh capability ke dalam satu scope.':'Bisnis dan pelanggan menjadi titik awal. Search, website, visual, dan social media mengikuti prioritas yang paling berguna.',
 'Four stages connect search and the website without forcing every capability into one scope.':'Start with the business and the buyer. Search, websites, visual strategy, and social media follow the most useful priorities.',
 'Riset demand, keyword, pertanyaan AI, dan audit website menunjukkan hambatan utama.':'Pahami bisnis, pertanyaan pelanggan, search demand, dan expertise yang sudah Anda miliki.',
 'Demand research, keywords, AI questions, and a website audit reveal the main constraint.':'Understand the business, buyer questions, search demand, and the expertise you already hold.',
 'SEO strategy, information architecture, UX, dan prioritas teknis membentuk arah kerja.':'Tentukan pesan, struktur, dan prioritas berdasarkan cara pelanggan memahami nilai dan mengambil keputusan.',
 'SEO strategy, information architecture, UX, and technical priorities shape the direction.':'Shape the message, architecture, and priorities around how customers understand value and decide.',
 'On-page SEO, AEO & GEO, content structure, design, dan development dikerjakan dalam satu alur.':'Bangun halaman, sistem visual, dan konten dari fondasi yang sama, sesuai scope yang dibutuhkan.',
 'On-page SEO, AEO & GEO, content structure, design, and development move in one flow.':'Build pages, visual systems, and content from the same foundation, with the scope the business needs.',
 'Performance, analytics, search monitoring, dan maintenance menentukan langkah berikutnya.':'Pelajari visibility, perhatian yang relevan, dan inquiry untuk menentukan langkah berikutnya.',
 'Performance, analytics, search monitoring, and maintenance guide the next step.':'Learn from visibility, relevant attention, and enquiries to decide what should improve next.'
}
for a,b in swaps.items():change(p,a,b)

p='src/scripts/service-recommendation.mjs';t=(ROOT/p).read_text();a=t.index('export const quizBlueprint');b=t.index('const order =',a)
questions=[
 {'id':'goal','answers':{'visibility':{'seo':6,'web':2},'clarity':{'web':6,'visual':2},'recognition':{'visual':6},'publishing':{'social':6}}},
 {'id':'foundation','answers':{'fragile':{'web':4},'unclear':{'web':3,'visual':1},'stable':{'seo':1,'visual':1,'social':1},'unknown':{'web':2,'seo':1,'visual':1,'social':1}}},
 {'id':'discovery','answers':{'google':{'seo':4,'web':1},'social':{'social':4},'referral':{'visual':3,'web':2},'mixed':{'seo':1,'web':1,'visual':1,'social':1}}},
 {'id':'capacity','answers':{'managed':{'seo':1,'social':3},'direction':{'visual':3,'seo':1},'development':{'web':4},'focused':{'seo':1,'web':1,'visual':1,'social':1}}},
 {'id':'outcome','answers':{'pipeline':{'seo':5,'web':1},'recognition':{'visual':5,'social':1},'conversion':{'web':5,'visual':1},'cadence':{'social':5,'visual':1}}},
]
write(p,"export const serviceKeys = ['seo', 'web', 'visual', 'social'];\n\nexport const quizBlueprint = "+json.dumps(questions,indent=2)+';\n\n'+t[b:])
p='src/components/services/WebsiteGrowthRoadmap.astro';t=(ROOT/p).read_text(encoding='utf-8')
swaps={
 'Jawab lima pertanyaan singkat untuk melihat apakah SEO, Web Services, atau keduanya menjadi titik awal yang paling berguna.':'Jawab lima pertanyaan singkat untuk menemukan prioritas di SEO, website, visual strategy, atau social media.',
 'Answer five short questions to see whether SEO, Web Services, or both are the most useful starting point.':'Answer five short questions to find your next priority in search, websites, visual strategy, or social media.',
 "kicker: 'Website Growth Roadmap'":"kicker: 'Your Growth Roadmap'",
 "['ai', 'Cara pelanggan mencari terus berubah', 'Website belum cukup jelas untuk menjawab kebutuhan pencarian yang terus berkembang.']":"['recognition', 'Brand sulit dikenali atau terasa tidak konsisten', 'Pesan dan sistem visual belum membantu orang memahami dan mengingat bisnis.']",
 "['ai', 'The way customers search is changing', 'The website is not yet clear enough for evolving search behavior.']":"['recognition', 'Our brand is hard to recognise or feels inconsistent', 'The message and visual system do not help people understand and remember the business.']",
 "['answers', 'Cara pencarian baru di luar hasil tradisional', 'Informasi bisnis perlu lebih mudah ditemukan, dipahami, dan dipercaya.']":"['social', 'Social media dan jaringan profesional', 'Expertise bisnis perlu hadir secara konsisten di hadapan audiens yang relevan.']",
 "['answers', 'Emerging search experiences beyond traditional results', 'Business information needs to be easier to find, understand, and trust.']":"['social', 'Social media and professional networks', 'Business expertise needs a consistent presence in front of relevant audiences.']",
 "['referral', 'Referral atau social sudah ada, search masih lemah', 'Demand yang sudah ada belum ditopang website dan search yang kuat.']":"['referral', 'Referral, presentasi, dan percakapan sales', 'Materi bisnis perlu menjelaskan penawaran dengan lebih jelas dan konsisten.']",
 "['referral', 'Referral or social works, but search is weak', 'Existing demand is not supported by a strong website and search presence.']":"['referral', 'Referrals, presentations, and sales conversations', 'Business materials need to explain the offer clearly and consistently.']",
 "['referenced', 'Informasi bisnis lebih mudah ditemukan dan dipercaya', 'Expertise perlu disusun lebih jelas agar berguna dalam berbagai pengalaman pencarian.']":"['recognition', 'Brand lebih mudah dipahami dan dikenali', 'Pesan dan visual perlu membangun pemahaman serta pengenalan yang konsisten.']",
 "['referenced', 'Business information that is easier to find and trust', 'Expertise needs clearer structure across changing search experiences.']":"['recognition', 'A brand people understand and recognise', 'The message and visuals need to build clarity and consistent recognition.']",
 "['direction', 'Tim bisa eksekusi jika roadmap-nya jelas', 'Tim memiliki kapasitas, tetapi membutuhkan prioritas dan sistem editorial yang jelas.']":"['direction', 'Tim bisa eksekusi dengan arah dan sistem visual yang jelas', 'Tim membutuhkan panduan pesan dan visual untuk membuat materi secara konsisten.']",
 "['direction', 'We can execute with a clear roadmap', 'The team has capacity but needs clear priorities and an editorial system.']":"['direction', 'We can execute with clear direction and a visual system', 'The team needs message and visual guidance to produce consistent materials.']",
}
for a,b in swaps.items():assert a in t,a[:50];t=t.replace(a,b)
addition={
'id':'''visual: { name:'Visual Strategy', slug:'visual-strategy', reason:'Pola jawaban menunjukkan bahwa pesan dan sistem visual perlu diperjelas agar bisnis lebih mudah dipahami, dikenali, dan diingat.', support:'Visual Strategy menyatukan cara pesan bisnis ditampilkan di setiap titik kontak.' },
        social: { name:'Social Media Management', slug:'social-media-management', reason:'Pola jawaban menunjukkan kebutuhan untuk mengubah expertise bisnis menjadi konten yang relevan dan kehadiran pasar yang konsisten.', support:'Social Media Management membawa expertise kepada audiens yang relevan dengan ritme yang dapat dijaga.' },''',
'en':'''visual: { name:'Visual Strategy', slug:'visual-strategy', reason:'Your answers point to a need for a clearer message and visual system, so the business is easier to understand, recognise, and remember.', support:'Visual Strategy connects how the business communicates across its touchpoints.' },
        social: { name:'Social Media Management', slug:'social-media-management', reason:'Your answers point to a need to turn business expertise into relevant content and a consistent market presence.', support:'Social Media Management brings expertise to relevant audiences at a sustainable rhythm.' },'''
}
a=t.index('      services: {');b=t.index('      services: {',a+1)
t=t[:b]+t[b:].replace('      services: {','      services: {\n        '+addition['en'],1)
t=t[:a]+t[a:].replace('      services: {','      services: {\n        '+addition['id'],1)
write(p,t)
for a,b in [('Use the Website Growth Roadmap to see whether SEO, Web Services, or both should become your most useful next move.','Use the Growth Roadmap to find your next priority in search, websites, visual strategy, or social media.'),('Gunakan Website Growth Roadmap untuk melihat apakah SEO, Web Services, atau keduanya menjadi langkah berikutnya yang paling berguna.','Gunakan Growth Roadmap untuk menemukan prioritas berikutnya di search, website, visual strategy, atau social media.')]:change('src/components/learn/LearnSeriesPage.astro',a,b)

p='tests/service-recommendation.test.mjs';t=(ROOT/p).read_text();t=t.replace("  web: {","  visual: { goal:'recognition', foundation:'stable', discovery:'referral', capacity:'direction', outcome:'recognition' },\n  social: { goal:'publishing', foundation:'stable', discovery:'social', capacity:'managed', outcome:'cadence' },\n  web: {")
a=t.index("test('keeps the second discipline")
t=t[:a]+'''test('keeps a complementary discipline when needs overlap', () => {
  const result = recommendServices({ goal:'visibility', foundation:'fragile', discovery:'mixed', capacity:'development', outcome:'pipeline' });
  assert.equal(result.primary, 'seo');
  assert.deepEqual(result.supporting, ['web']);
});
''';write(p,t)
print('Updated public positioning, metadata and the four-service diagnostic with coverage.')
