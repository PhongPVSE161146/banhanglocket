/** Bảng giá nâng cấp Locket Gold */
export const PRICING_PLANS_PERSONAL = [
  {
    id: 'trai_nghiem',
    badge: 'GÓI TRẢI NGHIỆM',
    planType: 'month',
    price: '15.000',
    priceNum: 15000,
    unit: 'đ',
    period: '/ 30 Ngày',
    desc: 'Lên UserName',
    features: ['Lên trực tiếp bằng UserName', 'Không đụng iCloud máy', 'Kích hoạt cực nhanh'],
  },
  {
    id: 'mot_nam',
    badge: 'GÓI 1 NĂM',
    planType: 'year',
    price: '120.000',
    priceNum: 120000,
    unit: 'đ',
    period: '/ Năm',
    desc: 'Lên UserName',
    popular: true,
    features: ['Lên trực tiếp bằng UserName', 'Tiết kiệm chi phí', 'Bảo hành suốt quá trình sử dụng'],
  },
]

export const PRICING_PLANS_GROUP = [
  {
    id: 'cap_doi',
    badge: 'GÓI CẶP ĐÔI',
    planType: 'year',
    price: '202.000',
    priceNum: 202000,
    unit: 'đ',
    period: '/ Năm',
    desc: 'Dành cho 2 tài khoản',
    icon: 'couple',
    features: ['Nâng cấp cho 2 tài khoản', 'Dành riêng cho các cặp đôi', 'Hoạt động độc lập, ổn định'],
  },
  {
    id: 'gia_dinh',
    badge: 'GÓI GIA ĐÌNH',
    planType: 'year',
    price: '280.000',
    priceNum: 280000,
    unit: 'đ',
    period: '/ Năm',
    desc: 'Tối đa 3 thành viên',
    icon: 'family',
    features: ['Nâng cấp cho 3 tài khoản', 'Tối ưu chi phí gia đình', 'Bảo hành đầy đủ'],
  },
  {
    id: 'sieu_cap',
    badge: 'GÓI SIÊU CẤP',
    planType: 'year',
    price: '450.000',
    priceNum: 450000,
    unit: 'đ',
    period: '/ Năm',
    desc: 'Dành cho 5 thành viên',
    icon: 'crown',
    features: ['Nâng cấp cho 5 tài khoản', 'Tiết kiệm chi phí tối đa', 'Hỗ trợ kỹ thuật 24/7'],
  },
]

export const ALL_PRICING_PLANS = [...PRICING_PLANS_PERSONAL, ...PRICING_PLANS_GROUP]

export function findPlanById(planId) {
  return ALL_PRICING_PLANS.find((plan) => plan.id === planId) ?? null
}
