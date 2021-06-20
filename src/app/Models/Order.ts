export class Order {
  constructor(
    public orderId: number,
    public orderCost: number,
    public orderSpecialRequest: string,
    public orderTime: Date,
    public addressDetails: string,
    public clientId: number,
    public storeId: number,
    public isDelivered: IsDelivered,
    public deliveryStatusInString: string = 'Delivered'
  ) {}
}

export enum IsDelivered {
  InKitchen,
  ReadyForDeliver,
  InWay,
  Delivered,
}
