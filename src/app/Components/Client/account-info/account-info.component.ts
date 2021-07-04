import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/Models/Client';
import { ProfileService } from 'src/app/Services/Profile/Profile.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

  getSubNewsValue!: boolean;
  getSubSMSValue!: boolean;
   client: any;

  constructor(private profileService: ProfileService, private router: Router) { }

  c: Client = {
    clientId: 1,
    clientFname: "",
    clientLname: "",
    clientEmail: "",
    clientPassword: "",
    clientDateOfBirth: "",
    clientGenderIsMale: 0,
    clientNewsletterSubscribe: 0,
    clientSmsSubscribe: 0
  }

  getClientGender() {
    if (this.c.clientGenderIsMale === 1) {
      return "Male";
    }
    else {
      return "Female";
    }
  }


  // onSubmit(btn: HTMLButtonElement) {
    onSubmit() {

    console.log("obj: ", this.c);

    if (this.getSubSMSValue === true) {
     console.log("AAAAAAAAAAAAAA");

      this.c.clientSmsSubscribe = 1;
    } else {
      this.c.clientSmsSubscribe = 0;
    }

    if (this.getSubNewsValue === true) {
      this.c.clientNewsletterSubscribe = 1;
    } else {
      this.c.clientNewsletterSubscribe = 0;
    }

    this.profileService.updateClient(this.c).subscribe(
      (result: any) => {
        console.log("Result: ", result);

      },
      (error) => {
        console.log("Error From API call: ", error.status);
      }
    );

   // btn.click();
  }

  // onLoadProfile(id: number) {

  //   this.profile.getClient(id).subscribe(
  //     (result: any) => {
  //       console.log("client", result);

  //       console.log("Response" + result.status);
  //     },
  //     (error) => {
  //       console.log("Error From API call: ", error);

  //     }
  //   )
  // }

  ngOnInit(): void {

    this.client = JSON.parse(sessionStorage.client);
    this.profileService.getClient(this.client.clientId).subscribe(
      (result: any) => {
        console.log("client", result);
        this.c = result;

        if (this.c.clientNewsletterSubscribe === 1) {
          this.getSubNewsValue = true;
        }

        if (this.c.clientSmsSubscribe === 1) {
          this.getSubSMSValue = true;
        }

      },
      (error) => {
        console.log("Error From API call: ", error);
      }
    )



  }

}
