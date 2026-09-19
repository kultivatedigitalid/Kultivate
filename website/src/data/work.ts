import { getCollection, type CollectionEntry } from 'astro:content';

export async function getProjects(locale: 'en' | 'id') {
  return (await getCollection('work', ({ data }) => data.locale === locale && !data.draft))
    .sort((a, b) => a.data.order - b.data.order || a.data.slug.localeCompare(b.data.slug));
}

// Honor client-display permission everywhere the work is presented.
export function projectName(project: CollectionEntry<'work'>) {
  return project.data.clientDisplayAllowed ? project.data.client
    : project.data.publicName ?? (project.data.locale === 'id' ? 'Proyek privat' : 'Private project');
}
