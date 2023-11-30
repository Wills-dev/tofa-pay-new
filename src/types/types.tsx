export type IsActiveType = any;

export type HeaderType = {
  title: string;
  category: string;
};

export type LoginDetailsType = {
  email: string;
  password: string;
};

export type registerDetailsType = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number | string;
  country: string;
  role: string;
  company: string;
};

export type userDetaillsType = {
  companyName: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  phone: number;
  role: string;
};

export interface ExcelDataType {
  Date_of_delivery: any;
  Type_of_transaction: string;
  Location: string;
  Transaction_No: string;
  Mode_of_payment: string;
  Contact_No: string | undefined;
  Identity_no_and_type: string;
  Cash_will_be_collected_by: string;
  Supplier_name: string;
  Supplier_invoice_No: string;
  Product_supplied: string;
  Quantity_supplied: number | undefined;
  Price: number | undefined;
  Total_amount_payable: number | undefined;
  Damage_bags_cost: string;
  Amount_to_be_paid_to_Supplier: number | undefined;
  id: string;
  companyName: string;
  Partner_email: string;
}

export interface ListDataType {
  Amount_to_be_paid_to_Supplier: number;
  Approve_payment: string;
  Approve_status: string;
  Cash_will_be_collected_by: string;
  Contact_No: string;
  Damage_bags_cost: string;
  Date_of_delivery: any;
  Identity_no_and_type: string;
  Location: string;
  Mode_of_payment: string;
  Payment_status: string;
  Price: number;
  Product_supplied: string;
  Quantity_supplied: number;
  Supplier_invoice_No: string;
  Supplier_name: string;
  Total_amount_payable: number;
  Transaction_No: string;
  Type_of_transaction: string;
  createdAt: any;
  id: string;
  tableId: string | null;
  Partner_email: string;
  companyName: string;
  Payment_receipt: string | null;
  companyInitial: string;
  user: any;
}

export interface ListDetailsDataType {
  Amount_to_be_paid_to_Supplier: number;
  Approve_payment: string;
  Approve_status: string;
  Cash_will_be_collected_by: string;
  Contact_No: string;
  Damage_bags_cost: string;
  Date_of_delivery: any;
  Identity_no_and_type: string;
  Location: string;
  Mode_of_payment: string;
  Payment_status: string;
  Price: number;
  Product_supplied: string;
  Quantity_supplied: number;
  Supplier_invoice_No: string;
  Supplier_name: string;
  Total_amount_payable: number;
  Transaction_No: string;
  Type_of_transaction: string;
  createdAt: any;
  tableId: string;
  companyName: string;
  Name: string;
  Payment_receipt: string;
  companyInitial: string;
  currency: any;
}

export interface ScheduleData {
  Amount_to_be_paid_to_Supplier: number;
  Approve_payment: string;
  Approve_status: string;
  Cash_will_be_collected_by: string;
  Contact_No: string;
  Damage_bags_cost: string;
  Date_of_delivery: any;
  Identity_no_and_type: string;
  Location: string;
  Mode_of_payment: string;
  Payment_status: string;
  Price: number;
  Product_supplied: string;
  Quantity_supplied: number;
  Supplier_invoice_No: string;
  Supplier_name: string;
  Total_amount_payable: number;
  Transaction_No: string;
  Type_of_transaction: string;
  createdAt: any;
  id: string;
  tableId: string | null;
  Scheduled: string;
  Treated: string;
  companyName: string;
  Exported: string;
  Name: string;
  Payment_receipt: string;
  companyInitial: string;
  user: any;
}

export type changePasswordType = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export interface DisputeType {
  complaint: string;
  createdAt: any;
  id: string;
  resolution: string;
  status: string;
  user: any;
}

export interface PartnerType {
  companyName: string;
  companyInitial: string;
  currency: string;
  phoneNumber: string;
  email: string;
  address: string;
}

export interface ContactUsType {
  email: string;
  phoneNumber: number | string;
  firstName: string;
  lastName: string;
  message: string;
}
