export type PouchSize = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export type Cat = {
  name: string;
  subscriptionActive: boolean;
  breed: string;
  pouchSize: PouchSize;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cats: Cat[];
};

export type YourNextDeliveryResponse = {
  title: string;
  message: string;
  totalPrice: number;
  freeGift: boolean;
};
