export enum ApiTag {
  DEFAULT = '[0] 기본 (Default)',
  AUTH = '[1] 인증 (Auth): 완료',
  USER = '[2] 유저 (User): 완료',
  CARD = '[3] 카드 등록 (Card): 완료',
  PAYMENT_PREPARE = '[4] 사전결제 (PaymentPrepare): 완료',
  PAYMENT = '[5] 결제 (Payment): 완료',
  PAYMENT_CANCEL = '[6] 결제취소 (PaymentCancel): 진행중',
}
