export class Store {
  constructor(
    public storeId?: number,
    public storeName?: string,
    public storeImage?: string,
    public storeDescription?: string,
    public countryId?: number,
    public storeAddress?: string,
    public storeMinOrder?: number,
    public storeDeliveryTime?: number,
    public storeDeliveryFee?: number,
    public storePreOrder?: string,
    public storePaymentOnDeliverCash?: number,
    public storePaymentVisa?: number,
    public storeCuisine?: string,
    public storeTypeId?: number,
    public cuisineId?: number,
    public storeOrdersNumber?: number
  ) {}
}
