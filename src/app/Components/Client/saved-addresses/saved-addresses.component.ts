import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientAddress } from 'src/app/Models/ClientAddress';
import { AddressesService } from 'src/app/Services/Profile/Addresses.service';


@Component({
  selector: 'app-saved-addresses',
  templateUrl: './saved-addresses.component.html',
  styleUrls: ['./saved-addresses.component.css']
})
export class SavedAddressesComponent implements OnInit {

  savedAddrressFlag= true;

  constructor(private addressService: AddressesService, private router: Router) { }

  addresses: ClientAddress[] = [];

  client: any;


  addrs: ClientAddress = {
    clientAddressId: 11,
    clientAddressMobileNumber: "666666666",
    clientAddressLandLine: 333333,
    clientAddressAddressTitle: "ssssssss",
    clientAddressStreet: "sssssss",
    clientAddressBuilding: 6,
    clientAddressFloor: 6,
    clientAddressApartmentNumber: 6,
    clientAddressTypeId: 1,
    cityId: 1,
    regionId: 1,
    clientId: 1
  }


  x: Number = 0;

  openDelete(btn: HTMLButtonElement) {
    btn.click();
  }

  onDelete(id: number) {

    this.addressService.deleteAddress(id).subscribe(
      (res: any) => {
        console.log("Result: ", res);

        this.addressService.getAddressByClientId(1).subscribe(
          (result: any) => {
            this.savedAddrressFlag= false;
            console.log("Result: ", result);
            this.addresses = result;
            this.ngOnInit();
            // $timeout(function () { angular.element('#BtnCloseModal').triggerHandler('click'); });
          },
          (error) => {
            console.log("Error From API call: ", error.status);
          }
        );

      },
      (error) => {
        console.log("Error From API call delete Address: ", error.status);
      }
    );

    window.location.reload();


  }

  // TODO: Patch Client Address is not working from backend
  onEdit(c: ClientAddress, btn: HTMLButtonElement) {

    // this.x = this.addresses.findIndex(x => x.clientAddressId == c.clientAddressId);
    // this.addrs = this.addresses[8];

    this.addressService.updateAddress(this.addrs).subscribe(
      (res: any) => {
        console.log("Result: ", res);
      },
      (error) => {
        console.log("Error From API call delete Address: ", error.status);
      }
    );

    btn.click();

  }

  reload() {
    window.location.reload();
  }


  opeEdit(btn: HTMLButtonElement) {
    btn.click();
  }

  ngOnInit(): void {

    this.client = JSON.parse(sessionStorage.client);


    this.addressService.getAddressByClientId(this.client.clientId).subscribe(
      (result: any) => {
        console.log("Result: ", result);
        this.addresses = result;
      },
      (error) => {
        console.log("Error From API call: ", error.status);
      }
    );

  }

}

