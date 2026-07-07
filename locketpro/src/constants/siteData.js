import gallery01 from '../assets/gallery/01-gold-active.png'
import gallery02 from '../assets/gallery/02-gold-border.png'
import gallery03 from '../assets/gallery/03-sparkle-effect.png'
import gallery04 from '../assets/gallery/04-custom-icons.png'
import gallery05 from '../assets/gallery/05-unlimited-photos.png'
import gallery06 from '../assets/gallery/06-widget.png'

export {
  UPGRADE_CONTACT,
  BANK_DETAILS,
  PAYMENT_CONFIG,
  PRICING_PLANS_PERSONAL,
  PRICING_PLANS_GROUP,
} from 'fixlocketgold'

export const BRAND_NAME = 'Locket Gold Pon Pon'

/** Nhạc nền — đặt file MP3 tại public/audio/hieu-thu-hai-nguoi-im-lang.mp3 */
export const BACKGROUND_MUSIC = {
  title: 'Người Im Lặng Gặp Người Hay Nói',
  artist: 'Hiếu Thứ Hai',
  src: '/audio/hieu-thu-hai-nguoi-im-lang.mp3',
  volume: 0.22,
}

export const NAV_LINKS = [
  { label: 'Tính năng', path: '/features' },
  { label: 'Thư viện', path: '/gallery' },
  { label: 'Bảng giá', path: '/pricing' },
  { label: 'Hỗ trợ', path: '/support' },
]

export const HERO = {
  badge: '✨ Nâng cấp trực tiếp — không qua cổng thanh toán',
  title: 'Nâng Tầm Locket Của Bạn',
  subtitle:
    'Xem bảng giá minh bạch, chọn gói phù hợp, thanh toán MoMo — hệ thống lên Locket Gold tự động.',
  ctaPrimary: 'Xem bảng giá',
  ctaSecondary: 'Xem thư viện',
  highlights: ['Lên Gold trực tiếp', 'Không đụng iCloud', 'Ổn định suốt quá trình'],
}

export const STATS = [
  { value: '5K+', label: 'Khách đã nâng cấp' },
  { value: '100%', label: 'Lên trực tiếp UserName' },
  { value: '4.9★', label: 'Đánh giá dịch vụ' },
  { value: '24/7', label: 'Tự động 24/7' },
]

export const FEATURES = [
  {
    icon: 'photo',
    title: 'Ảnh Không Giới Hạn',
    desc: 'Lưu trữ mọi khoảnh khắc mà không lo đầy bộ nhớ. Tận hưởng lịch sử ảnh trọn vẹn.',
  },
  {
    icon: 'phone',
    title: 'Biểu Tượng Tùy Chỉnh',
    desc: 'Bộ biểu tượng ứng dụng độc quyền chỉ dành cho thành viên Locket Gold.',
  },
  {
    icon: 'sparkle',
    title: 'Hiệu Ứng Đặc Biệt',
    desc: 'Gửi ảnh kèm hiệu ứng lấp lánh và viền vàng sang trọng.',
  },
  {
    icon: 'shield',
    title: 'Cam Kết An Toàn',
    desc: 'Không đụng iCloud, không app shadow, không mất tài khoản Locket.',
  },
  {
    icon: 'speed',
    title: 'Kích Hoạt Nhanh',
    desc: 'Gửi UserName — nhận Gold trong thời gian ngắn, dùng ổn định.',
  },
  {
    icon: 'heart',
    title: 'Widget Độc Quyền',
    desc: 'Hiển thị ảnh người thương ngay màn hình chính với widget Gold.',
  },
]

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Xem bảng giá',
    desc: 'Chọn gói 1 tháng, 1 năm hoặc gói linh hoạt phù hợp với bạn.',
  },
  {
    step: '02',
    title: 'Gửi UserName',
    desc: 'Nhấn "Mua ngay", nhập UserName Locket và chuyển khoản MoMo qua QR.',
  },
  {
    step: '03',
    title: 'Nhận Gold tự động',
    desc: 'Xác nhận thanh toán — hệ thống lên Gold trực tiếp, màn hình hiển thị "Locket Gold đã kích hoạt".',
  },
]

export const TESTIMONIALS = [
  {
    name: 'Minh Anh',
    role: 'Sinh viên · Hà Nội',
    text: 'Thanh toán QR xong vài phút là lên Gold, không cần chờ admin.',
    stars: 5,
  },
  {
    name: 'Tuấn Kiệt',
    role: 'Designer · TP.HCM',
    text: 'Gói 1 năm 120k rẻ hơn mua app. Lên trực tiếp, widget Gold siêu đẹp.',
    stars: 5,
  },
  {
    name: 'Lan Phương',
    role: 'Marketing · Đà Nẵng',
    text: 'Cam kết không đụng iCloud nên yên tâm. Dùng Gold ổn định mấy tháng rồi.',
    stars: 5,
  },
  {
    name: 'Hoàng Long',
    role: 'Lập trình viên · Cần Thơ',
    text: 'Viền vàng trên ảnh nhìn sang thật. Bạn bè hỏi liên tục dùng gói gì.',
    stars: 5,
  },
  {
    name: 'Thu Hà',
    role: 'Nội trợ · Hải Phòng',
    text: 'Chỉ cần nhập UserName và quét QR MoMo, 10 phút sau là Gold rồi.',
    stars: 5,
  },
  {
    name: 'Đức Anh',
    role: 'Kinh doanh · Bình Dương',
    text: 'Gói linh hoạt 40k hợp lý. Tháng đầu miễn phí duy trì, ok lắm.',
    stars: 5,
  },
  {
    name: 'Ngọc Trinh',
    role: 'Streamer · TP.HCM',
    text: 'Hiệu ứng lấp lánh Gold nhìn khác hẳn bản thường, fan thích mê.',
    stars: 5,
  },
  {
    name: 'Quốc Bảo',
    role: 'Học sinh · Huế',
    text: 'Gói tháng 15k rẻ, tiết kiệm tiền ăn sáng mà vẫn có Gold full.',
    stars: 5,
  },
  {
    name: 'Phương Linh',
    role: 'Văn phòng · Nha Trang',
    text: 'Ảnh không giới hạn là điểm mình thích nhất. Không lo mất ảnh cũ.',
    stars: 5,
  },
  {
    name: 'Văn Hùng',
    role: 'Freelancer · Đà Lạt',
    text: 'Hệ thống tự động, có vấn đề xem FAQ trang hỗ trợ là rõ ngay.',
    stars: 5,
  },
]

export const PRICING_COMMITMENT = {
  title: 'Cam kết "Nói 3 Không"!',
  items: [
    'KHÔNG đụng đến iCloud máy',
    'KHÔNG app shadowrocket',
    'KHÔNG mất tài khoản Locket',
  ],
  footer: 'Đảm bảo dùng ổn định suốt quá trình sử dụng.',
}

export const PRICING_HEADER = {
  title: 'Bảng Giá Dịch Vụ',
  subtitle: 'Nâng Cấp Locket Gold',
  tagline: 'Lên trực tiếp bằng UserName — thanh toán MoMo qua VietQR',
}

export const CTA_BANNER = {
  title: 'Sẵn sàng nâng cấp Locket Gold?',
  subtitle: 'Chọn gói, thanh toán MoMo — lên Gold tự động trong vài phút.',
  button: 'Nâng cấp ngay',
}

export const FOOTER_LINKS = [
  { label: 'Chính sách bảo mật', path: '/support' },
  { label: 'Điều khoản dịch vụ', path: '/support' },
  { label: 'Cam kết dịch vụ', path: '/pricing' },
  { label: 'Bảng giá', path: '/pricing' },
]

export const GALLERY_ITEMS = [
  {
    id: 1,
    step: 'Bước 1',
    title: 'Màn hình Gold đã kích hoạt',
    desc: 'Sau khi thanh toán, hệ thống lên Gold — app hiển thị huy hiệu và giao diện vàng cao cấp.',
    image: gallery01,
  },
  {
    id: 2,
    step: 'Bước 2',
    title: 'Viền ảnh vàng độc quyền',
    desc: 'Mỗi ảnh gửi đi có viền vàng lấp lánh — đặc quyền chỉ Gold mới có.',
    image: gallery02,
  },
  {
    id: 3,
    step: 'Bước 3',
    title: 'Hiệu ứng lấp lánh',
    desc: 'Gửi khoảnh khắc kèm hiệu ứng sparkle sang trọng.',
    image: gallery03,
  },
  {
    id: 4,
    step: 'Bước 4',
    title: 'Biểu tượng tùy chỉnh',
    desc: 'Đổi icon app Locket trên màn hình chính với bộ Gold độc quyền.',
    image: gallery04,
  },
  {
    id: 5,
    step: 'Bước 5',
    title: 'Ảnh không giới hạn',
    desc: 'Lưu và xem lại toàn bộ lịch sử ảnh — không lo đầy bộ nhớ.',
    image: gallery05,
  },
  {
    id: 6,
    step: 'Bước 6',
    title: 'Widget màn hình chính',
    desc: 'Hiển thị ảnh người thương ngay widget với khung Gold.',
    image: gallery06,
  },
]

export const SUPPORT_FAQ = [
  {
    q: 'Nâng cấp qua UserName là gì?',
    a: 'Bạn nhập UserName Locket trên web, quét mã QR MoMo để thanh toán. Hệ thống tự lên Gold trên tài khoản của bạn.',
  },
  {
    q: 'Tôi thanh toán ở đâu?',
    a: 'Thanh toán bằng MoMo hoặc VietQR/Napas 247 ngay trên website sau khi chọn gói. Không cần liên hệ thêm.',
  },
  {
    q: 'Gói linh hoạt năm tính phí thế nào?',
    a: 'Phí ban đầu 40.000đ cho năm đầu, miễn phí duy trì tháng 1. Từ tháng 2: 10.000đ/tháng duy trì.',
  },
  {
    q: 'Cam kết "Nói 3 Không" là gì?',
    a: 'Không đụng iCloud, không dùng app shadow, không làm mất tài khoản Locket của bạn.',
  },
  {
    q: 'Mất bao lâu để lên Gold?',
    a: 'Thường từ vài giây đến 3 phút sau khi bạn xác nhận thanh toán trên web.',
  },
]
