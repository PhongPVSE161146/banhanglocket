import PageHeader from '../components/common/PageHeader'
import SupportFaq from '../components/support/SupportFaq'

export default function SupportPage() {
  return (
    <>
      <PageHeader
        title="Hỗ Trợ"
        subtitle="Câu hỏi thường gặp và thông tin liên hệ đội ngũ Locket Gold."
      />
      <SupportFaq />
    </>
  )
}
