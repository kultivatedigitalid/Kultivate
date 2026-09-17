from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]/'website'
def write(path,text):
    p=ROOT/path; p.parent.mkdir(parents=True,exist_ok=True); p.write_text(text,encoding='utf-8',newline='\n')
def change(path,old,new):
    t=(ROOT/path).read_text(encoding='utf-8'); assert old in t,(path,old[:70]);write(path,t.replace(old,new))
write('src/components/home/ServicesGrid.astro','''---
import { servicesData } from '../../data/services';
interface Props { locale: 'id' | 'en'; }
const { locale } = Astro.props;
const services = servicesData[locale];
const copy = locale === 'id' ? {
  title: 'Ditemukan. Dipahami. Dipilih.',
  body: 'Kami menghubungkan cara orang menemukan bisnis Anda, memahami nilainya, dan mengambil langkah berikutnya.',
  foundation: 'Search + website', explore: 'Lihat layanan', label: 'Layanan',
} : {
  title: 'Found. Understood. Chosen.',
  body: 'We connect how people discover your business, understand its value, and take the next step.',
  foundation: 'Search + website', explore: 'Explore service', label: 'Services',
};
---
<section id="services" class="services-section flow-section light-field" aria-labelledby="services-title" data-scroll-key="home-services">
  <div class="container services-layout">
    <header class="services-header" data-reveal>
      <div><span class="section-kicker">{copy.label}</span><h2 id="services-title">{copy.title}</h2></div>
      <p>{copy.body}</p>
    </header>
    <div class="services-composition">
      <div class="services-foundation" aria-label={copy.foundation}>
        {services.slice(0,2).map((service,index) => (
          <a class="service-panel service-panel--core" href={`/${locale}/services/${service.slug}/`} data-reveal>
            <img src={service.image} alt="" width="1200" height="768" loading="lazy" decoding="async" />
            <span class="service-number text-mono">0{index+1}</span>
            <div class="service-copy"><h3>{service.title}</h3><p>{service.summary}</p></div>
            <span class="service-action"><span>{copy.explore}</span><span aria-hidden="true">↗</span></span>
          </a>
        ))}
      </div>
      <div class="services-expression">
        {services.slice(2).map(service => (
          <a class="service-panel service-panel--support" href={`/${locale}/services/${service.slug}/`} data-reveal>
            <img src={service.image} alt="" width="1200" height="768" loading="lazy" decoding="async" />
            <div class="service-copy"><h3>{service.title}</h3><p>{service.summary}</p></div>
            <span class="service-arrow" aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
    </div>
  </div>
</section>
<style>
  .services-section { padding-block:clamp(86px,11.5svh,128px); }
  .services-layout { display:grid; gap:clamp(24px,3.6svh,40px); }
  .services-header { display:grid; grid-template-columns:1.3fr .7fr; align-items:end; gap:clamp(40px,8vw,120px); }
  .services-header .section-kicker { display:block; margin-bottom:14px; color:#244963; }
  .services-header h2 { max-width:14ch; font-size:clamp(2.7rem,4.9vw,5rem); line-height:.98; letter-spacing:-.05em; font-weight:530; color:#0b2033; }
  .services-header p { max-width:40ch; padding-bottom:3px; font-size:clamp(.88rem,1.05vw,1rem); line-height:1.6; color:#28485f; }
  .services-composition { display:grid; grid-template-columns:1.55fr 1fr; gap:18px; }
  .services-foundation { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:1px; background:rgba(133,180,211,.5); border-radius:12px; overflow:hidden; }
  .services-expression { display:grid; grid-template-rows:repeat(2,minmax(0,1fr)); gap:18px; }
  .service-panel { position:relative; isolation:isolate; overflow:hidden; min-width:0; background:#10283d; color:#f0f7fb; }
  .service-panel > img { position:absolute; z-index:-2; inset:0; height:100%; width:100%; object-fit:cover; opacity:.76; transform:scale(1.02); transition:transform 600ms var(--ease-out),opacity 400ms ease; }
  .service-panel::before { content:''; position:absolute; z-index:-1; inset:0; background:linear-gradient(180deg,rgba(5,18,31,.12),rgba(5,18,31,.56) 36%,#081b2c 100%); }
  .service-panel--core { min-height:clamp(270px,34svh,380px); display:flex; flex-direction:column; align-items:flex-start; padding:clamp(22px,2.5vw,34px); }
  .service-number { color:#ccdfec; font-size:.65rem; }
  .service-copy { margin-top:auto; padding-top:16px; }
  .service-copy h3 { color:#f1f7fb; font-size:clamp(1.7rem,2.6vw,2.75rem); line-height:1; letter-spacing:-.04em; font-weight:500; margin-bottom:12px; }
  .service-copy p { color:#c1d5e4; font-size:clamp(.82rem,.95vw,.93rem); line-height:1.5; max-width:34ch; }
  .service-action { display:flex; justify-content:space-between; align-items:center; width:100%; gap:12px; margin-top:24px; color:#d4ecfc; font-size:.7rem; }
  .service-action > :last-child,.service-arrow { font-size:1.35rem; transition:transform 200ms ease; }
  .service-panel--support { border-radius:12px; display:flex; align-items:center; gap:16px; padding:clamp(20px,2.2vw,30px); }
  .service-panel--support::before { background:linear-gradient(90deg,rgba(9,29,46,.96),rgba(9,29,46,.83) 48%,rgba(9,29,46,.18)); }
  .service-panel--support > img { object-position:85% 50%; }
  .service-panel--support .service-copy { margin:0; padding:0; max-width:90%; }
  .service-panel--support h3 { font-size:clamp(1.35rem,1.8vw,2rem); max-width:19ch; margin-bottom:8px; }
  .service-panel--support p { max-width:38ch; font-size:.81rem; }
  .service-arrow { margin-left:auto; align-self:flex-start; }
  .service-panel:focus-visible { outline:3px solid #fff; outline-offset:-6px; }
  @media (hover:hover) { .service-panel:hover > img { opacity:1; transform:scale(1.07); } .service-panel:hover :is(.service-arrow,.service-action > :last-child) { transform:translate(2px,-2px); } }
  @media (min-width:1000px) and (min-height:620px) { .services-section { min-height:calc(100svh - 72px); display:grid; align-content:center; } }
  @media (min-width:1000px) and (max-height:800px) {
    .services-section { padding-block:80px; }
    .services-header h2 { font-size:clamp(2.7rem,4.4vw,3.8rem); }
    .services-header .section-kicker { margin-bottom:10px; }
    .service-panel--core { min-height:260px; padding:24px; }
    .service-action { margin-top:16px; }
    .services-layout { gap:24px; }
  }
  @media (max-width:999px) { .services-composition { grid-template-columns:1fr; } .services-expression { grid-template-columns:1fr 1fr; grid-template-rows:auto; } .services-header { gap:30px; } .service-panel--support { min-height:200px; } }
  @media (max-width:600px) {
    .services-section { padding-block:120px; }
    .services-section::after { background:linear-gradient(180deg,transparent,#bbd5e6 11%,#e4f1f7 25%,#a3c6df 77%,transparent); }
    .services-header { grid-template-columns:1fr; gap:18px; }
    .services-header h2 { font-size:clamp(2.7rem,12vw,4rem); }
    .services-foundation { grid-template-columns:1fr; }
    .services-expression { grid-template-columns:1fr; gap:12px; }
    .services-composition { gap:12px; }
    .service-panel--core { min-height:260px; }
    .service-panel--support { min-height:190px; padding:26px; }
    .service-copy h3 { font-size:2.2rem; }
    .service-panel--support h3 { font-size:1.8rem; }
    .service-copy p,.service-panel--support p { font-size:.9rem; }
  }
  @media (prefers-reduced-motion:reduce) { .service-panel > img,.service-arrow,.service-action > :last-child { transition:none; transform:none; } }
</style>
''')
p=ROOT/'src/components/services/ServicesIndexV2.astro'; old=p.read_text(); css=old[old.index('<style>'):]
write('src/components/services/ServicesIndexV2.astro','''---
import InteriorHero from '../shared/InteriorHero.astro';
import { servicesData } from '../../data/services';
interface Props { locale: 'id' | 'en'; }
const { locale } = Astro.props;
const services = servicesData[locale];
const copy = locale === 'id' ? {
  title:'Layanan untuk prioritas Anda', description:'Search, website, visual, dan social media. Dimulai dari bisnis Anda dan cara pelanggan mengambil keputusan.', explore:'Lihat layanan',
} : {
  title:'Services for your priorities', description:'Search, websites, visual strategy, and social media. Built around your business and how customers make decisions.', explore:'View service',
};
---
<InteriorHero title={copy.title} description={copy.description} label="KULTIVATE SERVICES"
  image="/assets/banners/services-gradient.webp" imageAlt="" variant="services" />
<section id="services-list" class="services-index flow-section" aria-label="Kultivate services" data-scroll-key="services-list">
  <div class="container service-stream">
    {services.map((service,index) => (
      <article class="service-row" data-reveal>
        <figure class="service-row__visual"><img src={service.image} alt="" width="1440" height="1080" loading="lazy" decoding="async" /></figure>
        <div class="service-row__copy">
          <div class="service-row__meta text-mono"><span>0{index+1}</span></div>
          <h2>{service.title}</h2><h3>{service.tagline}</h3><p>{service.description}</p>
          <a href={`/${locale}/services/${service.slug}/`} class="link-hover-arrow"><span>{copy.explore}</span><span aria-hidden="true">→</span></a>
        </div>
      </article>
    ))}
  </div>
</section>
''' + css)
for loc in ['en','id']:
    path=f'src/pages/{loc}/services/[slug].astro'; t=(ROOT/path).read_text(encoding='utf-8')
    a=t.index('const businessLens:'); b=t.index('const problemItems',a)
    t=t[:a]+t[b:]; t=t.replace("activeLens?.impacts[index]","service.impacts[index]").replace("activeLens?.inspections[index]","service.inspections[index]")
    t=t.replace('faqs={defaultFaqs}','faqs={[...service.faqs, ...defaultFaqs.slice(2, 5)]}')
    t=t.replace('<ServiceLearningPreview locale={locale} serviceId={service.id} />',"{['seo', 'web-services'].includes(service.id) && <ServiceLearningPreview locale={locale} serviceId={service.id} />}")
    t=t.replace('    tagline={service.tagline}','    image={service.image}\n    tagline={service.tagline}')
    write(path,t)
change('src/components/services/ServiceHero.astro',"  title: string;","  image?: string;\n  title: string;")
change('src/components/services/ServiceHero.astro',"const image = title.includes('AEO')","const image = Astro.props.image ?? (title.includes('AEO')")
change('src/components/services/ServiceHero.astro',"      : '/assets/banners/seo-gradient.webp';","      : '/assets/banners/seo-gradient.webp');")
change('src/components/services/ServiceProcess.astro',"Empat langkah yang kami jalankan bersama Anda, dari konteks sampai langkah berikutnya.","Enam tahap, dari konteks bisnis sampai pembelajaran yang mengarahkan langkah berikutnya.")
change('src/components/services/ServiceProcess.astro',"Four steps we move through with you, from context to the next useful move.","Six phases, from business context to the learning that shapes your next move.")
change('src/components/services/ServiceProcess.astro','repeat(4, minmax(0, 1fr))','repeat(3, minmax(0, 1fr))')
change('src/components/services/ServiceProcess.astro','    padding-top: 1px;','    padding-top: 1px;\n    row-gap: 48px;')
for loc in ['en','id']:
    change(f'src/pages/{loc}/contact.astro',"                <option value=\"web-services\">{t('contact.service_web')}</option>","                <option value=\"web-services\">{t('contact.service_web')}</option>\n                <option value=\"social-media-management\">Social Media Management</option>\n                <option value=\"visual-strategy\">Visual Strategy</option>")
change('src/components/home/Hero.astro','Dibangun untuk membantu bisnis Anda ditemukan','Membantu bisnis Anda ditemukan, dipahami, dan dipilih')
change('src/components/home/Hero.astro','Built to help your business get found','Help your business get found, understood, and chosen')
change('src/components/home/WhoWeAre.astro','Kami menyatukan website, SEO, content, dan measurement ke dalam keputusan yang jelas—agar pertumbuhan digital memiliki alasan, pemilik, dan langkah berikutnya.','Kami menghubungkan SEO, website, Visual Strategy, dan Social Media Management agar bisnis lebih mudah ditemukan, dipahami, dan dipilih. Setiap langkah dimulai dari bisnis Anda dan cara pelanggan mengambil keputusan.')
change('src/components/home/WhoWeAre.astro','We connect websites, SEO, content, and measurement through clear decisions—so digital growth has a reason, an owner, and a next step.','We connect SEO, websites, Visual Strategy, and Social Media Management so your business is easier to find, understand, and choose. Every step starts with your business and how customers make decisions.')
change('src/components/home/WhyKultivate.astro',"title: 'Agency SEO Profesional'","title: 'Nilai bisnis lebih dulu'")
change('src/components/home/WhyKultivate.astro',"title: 'Professional SEO Agency'","title: 'Business value comes first'")
change('src/components/about/AboutIndexV3.astro','SEO Agency untuk Prioritas Anda','Partner Digital untuk Prioritas Anda')
change('src/components/about/AboutIndexV3.astro','SEO Agency for Your Priorities','A Digital Partner for Your Priorities')
print('Implemented four services throughout home, directory, detail and contact flows.')
