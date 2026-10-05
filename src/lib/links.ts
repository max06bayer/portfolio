import { base } from '$app/paths';
export const links = {
  contact: 'mailto:max06.bayer@gmail.com',
  dribbble: 'https://dribbble.com/maximilian-b',
  github: 'https://github.com/max06bayer',
  linkedin: 'https://www.linkedin.com/in/maximilian-bayer-710143324/?isSelfProfile=true',
  docuflex: 'https://docuflex.eu',
  docuflexRepository: 'https://github.com/max06bayer/docuflex',
  delphi: '',
  legal: `${base}/legal/`,
  privacy: `${base}/privacy/`,
  cookies: `${base}/cookies/`
};

export function textLink(text: string): string {
  return ({
    Dribbble: links.dribbble,
    GitHub: links.github,
    LinkedIn: links.linkedin,
    'docuflex.eu': links.docuflex,
    docuflex: links.docuflexRepository,
    Docuflex: links.docuflex,
    Contact: links.contact,
    Socials: '#socials',
    Legal: links.legal,
    Privacy: links.privacy,
    Cookies: links.cookies
  } as Record<string, string>)[text] ?? '';
}
