import {
  Component,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { OffersServiceService } from '../../Services/OffersService.service';
import { NavbarService } from 'src/app/Services/Home/navbar.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class OffersComponent implements OnInit {
  modalRef!: BsModalRef;
  p!: number;
  PromsStores: any;
  CoupStores: any;
  Coupitems: any;
  Promitems: any;

  // storeId!: number;
  constructor(
    private router: Router,
    private avtive: ActivatedRoute,
    private offersService: OffersServiceService,
    private modalService: BsModalService,
    public nav: NavbarService
  ) {}

  ngOnInit(): void {
    this.nav.show();
    this.offersService.PromotionStores().subscribe((prom) => {
      console.log(prom);
      this.PromsStores = prom;
    });

    console.log('prom');
    console.log(this.PromsStores);
  }

  tabClick(index: number) {
    if (index == 0) {
      console.log('prom');
      this.offersService.PromotionStores().subscribe((prom) => {
        console.log(prom);
        this.PromsStores = prom;
      });
    } else {
      console.log('copuns');
      this.offersService.CoupousStores().subscribe((coup) => {
        console.log(coup);
        this.CoupStores = coup;
      });
    }
  }

  openModalprom(template: TemplateRef<any>, storeId: number) {
    this.modalRef = this.modalService.show(template);

    this.offersService.PromotionItems(storeId).subscribe((items) => {
      console.log('el items ely fe el promotions ', items);
      this.Promitems = items;
    });
  }

  openModalcoup(template: TemplateRef<any>, storeId: number) {
    this.modalRef = this.modalService.show(template);

    this.offersService.CouponItems(storeId).subscribe((items) => {
      console.log('el items ely fe el coupons ', items);
      this.Coupitems = items;
    });
  }
  storeprofileshow(@Output() id: number) {
    this.router.navigate(['/store-profile', id]);
  }
}
