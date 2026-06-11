# Payment Setup

TULUS memakai payment manual owner:

- Dana.
- OVO.
- GoPay.
- Bank Transfer.
- QRIS manual placeholder.

Alur:

1. User pilih plan.
2. User membaca instruksi payment.
3. User upload bukti pembayaran.
4. Owner review di `/tulus-control`.
5. Owner approve/reject.
6. Jika approved, premium visual badge dan fitur premium diaktifkan.

`server/payment-webhook.js` hanya skeleton untuk integrasi gateway nanti.
