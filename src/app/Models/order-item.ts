export class OrderItem {
    constructor(
        public OrderId: number,
        public ItemId: number,
        public OrderItemQty: number,
        public OrderItemSpecialRequest?: string,

    ) { }
}
