export class Item {
  constructor(
    public itemId: number,
    public itemImage: String,
    public itemName: String,
    public itemDescription: String,
    public itemPrice: number,
    public itemCategoryId: string,
    public countryId: number,
    public storeId: number,
  ) { }
}
