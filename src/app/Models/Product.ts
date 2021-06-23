export class Product {

    constructor(

        public itemId?: number,
        public itemImage?: String,
        public itemName?: String,
        public itemDescription?: String,
        public itemPrice?: number,
        public itemCategoryId?: number,
        public countryId?: number,
        public storeId?: number,
        public discount?: number,
        public count?: number,
        public value?: number
    ) { }
}
