export class Order {
  constructor(
    public orderId?: number,
    public orderCost?: number,
    public orderSpecialRequest?: string,
    public orderTime?: any,
    public addressDetails?: string,
    public clientId?: number,
    public storeId?: number,
    public isDelivered?: any,
    //public deliveryStatusInString: any = 'Delivered'
  ) { }
}

// export enum IsDelivered {
//   InKitchen,
//   ReadyForDeliver,
//   InWay,
//   Delivered,
// }
