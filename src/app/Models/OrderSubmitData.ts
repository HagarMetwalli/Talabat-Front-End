import { Order } from "./Order";
import { OrderItem } from "./order-item";

export class OrderSubmitData {
    constructor(

        public order?: Order,
        public orderItemsList?: OrderItem[],

    ) { }
}