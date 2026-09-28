// Site configuration constants
// Status tags: PENDING, CONFIRMED, STRATEGIC DECISION, PLACEHOLDER - NOT PUBLIC PROOF

export const siteConfig = {
  // CONFIRMED
  defaultLocale: 'en',
  locales: ['en', 'id'],

  // STRATEGIC DECISION
  name: 'Kultivate',
  tagline: 'Found. Understood. Chosen.',

  // PENDING - PLACEHOLDER - NOT PUBLIC PROOF
  domain: 'https://kultivate.id', // Target domain
  email: 'halo@kultivate.id', // CONFIRMED public and privacy contact, 2026-09-25
  phone: '+6281234567890', // Target business phone/WhatsApp
  whatsappLink: 'https://wa.me/6281234567890?text=Halo%20Kultivate%2C%20saya%20tertarik%20untuk%20memulai%20proyek.',

  // PENDING - PLACEHOLDER - NOT PUBLIC PROOF (Address and Legal Details)
  address: 'Jln Mujahiddin No. 29, Perigi Baru, Tangerang Selatan, ID',
  companyLegalName: 'PT Karya Lintas Generasi', // CONFIRMED Kultivate operator/controller, 2026-09-25
  addressClassification: 'Office',

  // CONFIRMED flow: third-party form provider -> email + Google Sheets; archive retention remains unverified
  formEndpoint: 'https://formspree.io/f/xdenzbqy', // Existing endpoint; account plan/archive retention needs operational verification

  // GA4/GTM intended but inactive. A consent mechanism is required before activation.
  gtmId: '',
  gaId: '',
  analyticsConsentRequired: true
};
