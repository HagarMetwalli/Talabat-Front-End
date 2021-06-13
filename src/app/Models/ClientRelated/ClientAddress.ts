
export class ClientAddress {

  constructor(
    public clientAddressId: number,
    public clientAddressMobileNumber: string,
    public clientAddressLandLine: number,
    public clientAddressAddressTitle: string,
    public clientAddressStreet: string,
    public clientAddressBuilding: number,
    public clientAddressFloor: number,
    public clientAddressApartmentNumber: number,
    public clientAddressTypeId: number,
    public cityId: number,
    public regionId: number,
    public clientId: number,
    public clientAddressOptionalDirections?: string
  ) { }


}
