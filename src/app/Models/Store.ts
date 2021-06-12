export class Stores {
  
    constructor(
        
        public storeName: string,

        public storeDescription : string,

        public countryId: number,

        public storeAddress: string,

        public storeDeliveryTime : number,

        public storeDeliveryFee : number,

        public storePreOrder : string,

        public storeTypeId: number,

        public cuisineId : number,

        public storeId?: number,

        public storeOrdersNumber?: number,

        public storeMinOrder?: number,

        public storePaymentOnDeliverCash?: number,

        public storePaymentVisa?: number,

    ) {}
  }
  