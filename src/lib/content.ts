import site from '../../content/site.json';
import home from '../../content/home.json';
import about from '../../content/about.json';
import fees from '../../content/fees.json';

export { site, home, about, fees };

// True once Matthew has a real SimplePractice link entered in Keystatic. Every
// "schedule directly" link on the site checks this instead of rendering a link
// to the placeholder URL — so filling in the real link everywhere just requires
// changing simplePracticeUrl in one field, not another code sweep.
export const schedulingReady =
  Boolean(site.simplePracticeUrl) && !site.simplePracticeUrl.includes('example.clientsecure.me');

export interface Specialty {
  title: string;
  order: number;
  cardText: string;
  whatThisFeelsLike: string;
  howWeWork: string;
  slug: string;
}

const specialtyFiles = import.meta.glob<Omit<Specialty, 'slug'>>('../../content/specialties/*.json', {
  eager: true,
  import: 'default',
});

export const specialties: Specialty[] = Object.entries(specialtyFiles)
  .map(([path, data]) => ({
    ...data,
    slug: path.split('/').pop()!.replace(/\.json$/, ''),
  }))
  .sort((a, b) => a.order - b.order);
