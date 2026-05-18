import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Row, Col, Image } from 'antd'
import ZoomInMapOutlinedIcon from '@mui/icons-material/ZoomInMapOutlined'
import { GALLERY_ITEMS } from '../../constants/siteData'
import Tilt3D from '../common/Tilt3D'

export default function GalleryGrid() {
  const [preview, setPreview] = useState(null)

  return (
    <Box component="section" sx={{ pb: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Row gutter={[24, 28]}>
          {GALLERY_ITEMS.map((item) => (
            <Col key={item.id} xs={24} sm={12} lg={8}>
              <Tilt3D maxTilt={14} scale={1.02}>
                <article className="gallery-card card-3d-surface">
                  <button
                    type="button"
                    className="gallery-image-btn"
                    onClick={() => setPreview(item)}
                    aria-label={`Xem chi tiết ${item.title}`}
                  >
                    <img src={item.image} alt={item.title} loading="lazy" />
                    <span className="gallery-zoom">
                      <ZoomInMapOutlinedIcon fontSize="small" />
                      Phóng to
                    </span>
                    <span className="gallery-step">{item.step}</span>
                  </button>
                  <div className="gallery-card-body">
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6b7280', lineHeight: 1.7 }}>
                      {item.desc}
                    </Typography>
                  </div>
                </article>
              </Tilt3D>
            </Col>
          ))}
        </Row>
      </Container>

      <AnimatePresence>
        {preview && (
          <motion.div
            className="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreview(null)}
          >
            <Tilt3D maxTilt={8}>
              <motion.div
                className="gallery-lightbox-inner card-3d-surface"
                initial={{ scale: 0.85, rotateX: 15 }}
                animate={{ scale: 1, rotateX: 0 }}
                exit={{ scale: 0.85 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Image src={preview.image} alt={preview.title} preview={false} />
                <motion.div className="gallery-lightbox-caption">
                  <strong>{preview.step} — {preview.title}</strong>
                  <p>{preview.desc}</p>
                  <button type="button" onClick={() => setPreview(null)}>
                    Đóng
                  </button>
                </motion.div>
              </motion.div>
            </Tilt3D>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  )
}
