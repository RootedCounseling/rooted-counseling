import site from '../../content/site.json';
import home from '../../content/home.json';
import about from '../../content/about.json';
import fees from '../../content/fees.json';

export { site, home, about, fees };

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
