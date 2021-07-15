export class OrderReview {
  [x: string]: any;
  constructor(

    public orderReviewId?: number,
    public orderPackaging?: number,
    public valueForMoney?: number,
    public deliveryTime?: number,
    public qualityOfFood?: number,
    public orderReviewComment?: string,
    public orderId?: number,
    public clientId?: number,
    public IsDelivered?: number

  ) { }
}
