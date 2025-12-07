export interface OrderReponse {
  channel: string;
  emailTo: string;
  date: string;
  subject: string;
  messageId: string;
  productsData: ProductsData;
}

export interface ProductsData {
  emailId: string;
  legalEntity: string;
  productList: ProductDetails[];
}

export interface ProductDetails {
  product: string;
  quantity: number;
  deliveryDate: string;
  name?: string;
}

export interface OrderRequest {
  channel: string;
  emailTo: string;
  emailDate: string;
  emailSubject: string;
  messageId: string;
  productExtract: ProductsData;
}
