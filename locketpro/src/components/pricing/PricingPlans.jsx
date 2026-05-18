import { useState } from 'react'
import { Row, Col } from 'antd'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import { PRICING_PLANS } from '../../constants/siteData'
import UpgradeModal from '../common/UpgradeModal'

export default function PricingPlans() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('')

  const openUpgrade = (e, planLabel) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedPlan(planLabel)
    setModalOpen(true)
  }

  return (
    <>
      <Row gutter={[20, 24]} className="pricing-plans-row">
        {PRICING_PLANS.map((plan) => (
          <Col key={plan.id} xs={24} md={8}>
            <div className={`pricing-plan-card card-3d-surface pricing-plan-hover${plan.popular ? ' popular' : ''}`}>
              {plan.popular && <span className="pricing-star">★</span>}
              <span className="pricing-plan-badge">{plan.badge}</span>
              {plan.badgeSub && <span className="pricing-plan-badge-sub">{plan.badgeSub}</span>}

              <p className="pricing-plan-price">
                {plan.price}
                <span className="pricing-plan-unit">{plan.unit}</span>
              </p>
              <p className="pricing-plan-period">{plan.period}</p>

              <ul className="pricing-plan-features">
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>

              <button
                type="button"
                className="pricing-username-btn"
                onClick={(e) => openUpgrade(e, plan.badge)}
              >
                <PersonOutlinedIcon fontSize="small" />
                Nâng cấp qua TikTok
              </button>
            </div>
          </Col>
        ))}
      </Row>

      <UpgradeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        planLabel={selectedPlan}
      />
    </>
  )
}
