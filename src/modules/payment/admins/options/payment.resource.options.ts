export const paymentResourceOptions = {
  // List
  listProperties: [
    'id',
    // Status
    'status',
    // User
    'sellerId',
    'buyerId',
    // Uid
    'impUid',
    'merchantUid',
    'customerUid',
    // Amount
    'amount',
    'cancelAmount',
    // Date
    'createdAt',
    'updatedAt',
  ],

  // Show
  showProperties: ['id', 'userId', 'createdAt', 'updatedAt'],

  // Edit
  editProperties: [],
};
