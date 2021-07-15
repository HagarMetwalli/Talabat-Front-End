export class TemPartner {
  constructor(
    //public TempPartnerStoreId: number,
    public partnerFname: string,
    public partnerLname: string,
    public storeCountryId: number,
    public PartnerPhoneNo: number,
    public partnerEmail: string,
    public partnerContactRole: string,
    public StoreName: string,
    public storeBranchesNo: number,
    public storeWebSite: string,
    public storeAddress: string,
    // public StoreId: number,
    public storeTypeId: number
  ) { }
}
