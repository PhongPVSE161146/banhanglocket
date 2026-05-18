import PageHeader from '../components/common/PageHeader'
import GalleryGrid from '../components/gallery/GalleryGrid'

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        title="Thư Viện Tính Năng Gold"
        subtitle="6 bước minh họa chi tiết — từ kích hoạt Gold đến widget, viền vàng và ảnh không giới hạn. Nhấn ảnh để phóng to."
      />
      <GalleryGrid />
    </>
  )
}
