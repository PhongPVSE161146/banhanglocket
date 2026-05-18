import PageHeader from '../components/common/PageHeader'
import FeaturesSection from '../components/home/FeaturesSection'

export default function FeaturesPage() {
  return (
    <>
      <PageHeader
        title="Tính Năng Độc Quyền"
        subtitle="Khám phá những đặc quyền chỉ dành cho thành viên Locket Gold."
      />
      <FeaturesSection showTitle={false} />
    </>
  )
}
