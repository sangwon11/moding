export interface SellerApplicationParams {
  userId: string;
  companyName: string;
  businessLicense: string;
  phoneNumber: string;
  email: string;
}

export interface SignUpParams {
  email: string;
  password: string;
  username: string;
  phoneNumber: string;
  postCode: number;
  address: string;
  addressDetail?: string;
}

export interface FundingParams {
  title: string;
  categoryId: string;
  goalAmount: number;
  startDate: string;
  endDate: string;
  preorder: boolean;
  preorderDate: string;
  preorderBenefits: string[];
  mainImageUrl: string;
  imageUrls: string[];
  deliveryPrice: number;
  deliveryDate: string;
  options: string[];
  seller: string;
  deliveryNumber: string;
  deliveryType: string;
  info: string;
  infoDetail: string;
}

export interface DeliveryUpdateParams {
  deliveryNumber: string;
  deliveryType: string;
}

export interface SignUpParams {
  email: string;
  password: string;
  username: string;
  phoneNumber: string;
  postCode: number;
  address: string;
  addressDetail?: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface UpdateUserData {
  password?: string;
  phoneNumber?: string;
  postCode?: number;
  address?: string;
  addressDetail?: string;
}

export interface CategoryParams {
  categoryName: string;
}

export interface orderParams {
  userId: string;
  orderId: string;
  orderNumber: string;
  orderedBy: string;
  postCode: string;
  address: string;
  addressDetail: string;
  phoneNumber: string;
  fundingId: string;
  orderList: optionParams[];
  donation: number;
  nameOpen: boolean;
  priceOpen: boolean;
  orderStatus: string;
  paymentMethod: string;
}

export interface newOrderParams {
  userId: string;
  orderId: string;
  orderNumber: string;
  orderedBy: string;
  postCode: string;
  address: string;
  addressDetail: string;
  phoneNumber: string;
  fundingId: string;
  orderList: optionParams[];
  donation: number;
  nameOpen: boolean;
  priceOpen: boolean;
  orderStatus: string;
  paymentMethod: string;
}

export interface optionParams {
  optionsId: string;
  amount: number;
}

export interface updateOrderParams {
  orderedBy: string;
  postCode: string;
  address: string;
  addressDetail: string;
  phoneNumber: string;
}
