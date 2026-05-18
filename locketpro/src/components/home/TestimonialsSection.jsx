import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import SectionHeading from '../common/SectionHeading'
import TestimonialsMarquee from './TestimonialsMarquee'

export default function TestimonialsSection() {
  return (
    <Box component="section" className="testimonials-section" sx={{ py: { xs: 6, md: 10 }, overflow: 'hidden' }}>
      <Container maxWidth="lg">
        <SectionHeading
          title="Người Dùng Nói Gì"
          subtitle="Hơn 5.000+ khách hàng đã nâng cấp Gold qua TikTok — kéo chuột vào để tạm dừng"
        />
      </Container>
      <TestimonialsMarquee />
    </Box>
  )
}
