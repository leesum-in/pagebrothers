import { GalleryWidgetItem } from '@/shared/types';

interface GalleryProps {
  widgetItem: GalleryWidgetItem;
}

function Gallery({ widgetItem }: GalleryProps) {
  if (widgetItem.config.items.length === 0)
    return (
      <div className="text-theme-inter/70 py-20 px-4 text-center text-sm no-interaction">
        <p>사진을 등록해주세요.</p>
      </div>
    );

  return <div>Gallery</div>;
}

export default Gallery;
