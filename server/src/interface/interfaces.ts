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
  category: string;
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
