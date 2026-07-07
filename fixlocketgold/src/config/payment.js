/** Cấu hình nhận tiền — MoMo / VietQR / Napas 247 */
export const PAYMENT_CONFIG = {
  provider: 'momo',
  bankId: 'momo',
  bankBin: '971025',
  bankName: 'MoMo',
  bankLabel: 'MoMo (VietQR · Napas 247)',
  accountNo: 'PSP2601413800000437',
  accountName: 'PHAM VAN PHONG',
  accountNameDisplay: 'PHẠM VĂN PHONG',
  notePrefix: 'LKT',
  supportedNetworks: ['MoMo', 'VietQR', 'Napas 247'],
}

/** @deprecated Dùng PAYMENT_CONFIG */
export const BANK_DETAILS = {
  bankId: PAYMENT_CONFIG.bankId,
  accountNo: PAYMENT_CONFIG.accountNo,
  accountName: PAYMENT_CONFIG.accountName,
  notePrefix: PAYMENT_CONFIG.notePrefix,
}
