export const orders = [
  {
    id: 'GRZ90188', date: '2026-07-01', status: 'Out for Delivery', total: 634,
    itemIds: [3, 40, 55, 71], paymentMethod: 'UPI',
    address: '12, 3rd Cross, Koramangala 5th Block, Bengaluru - 560095',
  },
  {
    id: 'GRZ84213', date: '2026-06-28', status: 'Delivered', total: 456,
    itemIds: [1, 9, 14, 24], paymentMethod: 'UPI',
    address: '12, 3rd Cross, Koramangala 5th Block, Bengaluru - 560095',
  },
  {
    id: 'GRZ81007', date: '2026-06-21', status: 'Delivered', total: 812,
    itemIds: [16, 17, 18, 40], paymentMethod: 'Credit Card',
    address: '12, 3rd Cross, Koramangala 5th Block, Bengaluru - 560095',
  },
  {
    id: 'GRZ77542', date: '2026-06-12', status: 'Delivered', total: 289,
    itemIds: [23, 58, 53, 61], paymentMethod: 'Cash on Delivery',
    address: 'Tech Park, Whitefield Main Road, Bengaluru - 560066',
  },
];

export const trackingSteps = ['Order Placed', 'Packed', 'Out for Delivery', 'Delivered'];

export function getStepIndex(status) {
  if (status === 'Delivered') return 3;
  if (status === 'Out for Delivery') return 2;
  if (status === 'Packed') return 1;
  return 0;
}

export const getOrderById = (id) => orders.find(o => o.id === id);
