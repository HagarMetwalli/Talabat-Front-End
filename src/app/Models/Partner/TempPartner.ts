export class TemPartner {
 
    constructor(

        public PartnerFName: string,
        public PartnerLName: string,
        public StoreCountery:string,
        public PartnerPhoneNumber:string,
        public PartnerEmail: string,
        public PartnerContactRole:string,
        public StoreName: string,
        public StoreBranchesNo?: string,
        public StoreContact?: string,
        public StoreAddress?: string,
        public StoreStatus?: string,
        public StoreTypeId?: string
        
    ) { }
}
