import { Rate } from 'antd'
import { TESTIMONIALS } from '../../constants/siteData'

function TestimonialCard({ item }) {
  return (
    <article className="marquee-card">
      <Rate disabled defaultValue={item.stars} style={{ color: '#FF6600', fontSize: 13 }} />
      <p className="marquee-card-text">&ldquo;{item.text}&rdquo;</p>
      <div className="marquee-card-author">
        <strong>{item.name}</strong>
        <span>{item.role}</span>
      </div>
    </article>
  )
}

export default function TestimonialsMarquee() {
  const row1 = [...TESTIMONIALS, ...TESTIMONIALS]
  const row2 = [...TESTIMONIALS.slice().reverse(), ...TESTIMONIALS.slice().reverse()]

  return (
    <div className="testimonials-marquee">
      <div className="marquee-row marquee-row-left">
        <div className="marquee-track">
          {row1.map((item, i) => (
            <TestimonialCard key={`${item.name}-a-${i}`} item={item} />
          ))}
        </div>
      </div>
      <div className="marquee-row marquee-row-right">
        <div className="marquee-track">
          {row2.map((item, i) => (
            <TestimonialCard key={`${item.name}-b-${i}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
