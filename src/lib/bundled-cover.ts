import catalog from '../../content/portfolio/catalog.json';

export function bundledCover(media: { id: string; project_id: string; storage_path: string } | undefined) {
  return media && catalog.items.find(item => item.cover.id === media.id &&
    item.cover.project_id === media.project_id && item.cover.storage_path === media.storage_path);
}
