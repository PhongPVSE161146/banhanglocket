import { useState } from 'react'
import { Row, Col } from 'antd'
import PersonIcon from '@mui/icons-material/Person'
import PeopleIcon from '@mui/icons-material/People'
import GroupsIcon from '@mui/icons-material/Groups'
import StarIcon from '@mui/icons-material/Star'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import { PRICING_PLANS_PERSONAL, PRICING_PLANS_GROUP } from '../../constants/siteData'
import UpgradeModal from '../common/UpgradeModal'

export default function PricingPlans() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)

  const openUpgrade = (e, plan) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedPlan(plan)
    setModalOpen(true)
  }

  return (
    <>
      {/* SECTION 1: CÁC GÓI CÁ NHÂN */}
      <div className="pricing-group-container">
        <h3 className="pricing-group-title">
          1. CÁC GÓI CÁ NHÂN <span className="title-note">(1 Người)</span>
        </h3>
        <Row gutter={[24, 24]} justify="center" className="pricing-plans-row">
          {PRICING_PLANS_PERSONAL.map((plan) => (
            <Col key={plan.id} xs={24} sm={12} md={10} lg={8}>
              <div className={`pricing-plan-card card-3d-surface pricing-plan-hover personal-card${plan.popular ? ' popular' : ''}`}>
                {plan.popular && (
                  <div className="popular-badge-star">
                    <StarIcon style={{ color: '#ffd700', fontSize: 18 }} />
                  </div>
                )}
                <span className="pricing-plan-badge">{plan.badge}</span>

                <div className="pricing-plan-price-box">
                  <p className="pricing-plan-price">
                    {plan.price}
                    <span className="pricing-plan-unit">{plan.unit}</span>
                  </p>
                  <span className="pricing-plan-period">{plan.period}</span>
                </div>

                <div className="pricing-plan-desc-pill">
                  <PersonIcon fontSize="small" style={{ opacity: 0.8 }} />
                  <span>{plan.desc}</span>
                </div>

                <ul className="pricing-plan-features">
                  {plan.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>

                <button
                  type="button"
                  className="pricing-username-btn"
                  onClick={(e) => openUpgrade(e, plan)}
                >
                  Mua ngay
                  <ArrowForwardIcon fontSize="small" />
                </button>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      {/* SECTION 2: CÁC GÓI NHÓM / TIẾT KIỆM */}
      <div className="pricing-group-container" style={{ marginTop: '50px' }}>
        <h3 className="pricing-group-title">
          2. CÁC GÓI NHÓM / TIẾT KIỆM <span className="title-note">(Thời hạn 1 Năm)</span>
        </h3>
        <Row gutter={[20, 24]} justify="center" className="pricing-plans-row">
          {PRICING_PLANS_GROUP.map((plan) => {
            // Lấy icon tương ứng
            let PlanIcon = PeopleIcon
            if (plan.icon === 'groups' || plan.icon === 'family') {
              PlanIcon = GroupsIcon
            } else if (plan.icon === 'crown') {
              PlanIcon = WorkspacePremiumIcon
            }

            return (
              <Col key={plan.id} xs={24} md={8}>
                <div className="pricing-plan-card card-3d-surface pricing-plan-hover group-card">
                  <div className="group-card-icon-indicator">
                    <PlanIcon style={{ color: '#ffd700', fontSize: 20 }} />
                  </div>
                  <span className="pricing-plan-badge">{plan.badge}</span>

                  <div className="pricing-plan-price-box">
                    <p className="pricing-plan-price">
                      {plan.price}
                      <span className="pricing-plan-unit">{plan.unit}</span>
                    </p>
                    <span className="pricing-plan-period">{plan.period}</span>
                  </div>

                  <div className="pricing-plan-desc-pill">
                    <span>{plan.desc}</span>
                  </div>

                  <ul className="pricing-plan-features">
                    {plan.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className="pricing-username-btn"
                    onClick={(e) => openUpgrade(e, plan)}
                  >
                    Mua ngay
                    <ArrowForwardIcon fontSize="small" />
                  </button>
                </div>
              </Col>
            )
          })}
        </Row>
      </div>

      <UpgradeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedPlan={selectedPlan}
      />
    </>
  )
}

