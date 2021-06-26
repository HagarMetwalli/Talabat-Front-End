import { NavBarComponent } from './Components/Home/nav-bar/nav-bar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Home
import { HomepageComponent } from './Components/Home/home-page/home-page.component';

//Client Registeration
import { RegisterationComponent } from './Components/registeration/registeration.component';
import { LoginComponent } from './Components/login/login.component';

//Client
import { ClientProfileComponent } from './Components/Client/client-profile/client-profile.component';
import { AccountInfoComponent } from './Components/Client/account-info/account-info.component';
import { MyOrdersComponent } from './Components/Client/my-orders/my-orders.component';
import { SavedAddressesComponent } from './Components/Client/saved-addresses/saved-addresses.component';
import { SavedCardsComponent } from './Components/Client/saved-cards/saved-cards.component';

//Resturant
import { AllResturantComponent } from './Components/Resturant/all-resturants/all-resturants.component';
import { ResturantMenuComponent } from './Components/Resturant/resturant-menu/resturant-menu.component';
import { ResturantProfileComponent } from './Components/Resturant/resturant-profile/resturant-profile.component';

//Store
import { StoresInAreaComponent } from './Components/Store/stores-in-area/stores-in-area.component';

//Cart

//Order

import { CheckoutComponent } from './Components/checkout/checkout.component';
import { PaymentCardComponent } from './Components/payment-card/payment-card.component';

//Partentar
import { PartenerLoginComponent } from './Components/Partener/partener-login/partener-login.component';
import { PartenerComponent } from './Components/Partener/partener/partener.component';

//System
import { SystemReviewComponent } from './Components/Review/system-review/system-review.component';

//offer
import { OffersComponent } from './Components/offers/offers.component';

//item review
import { OrderReviewComponent } from './Components/order-review/order-review.component';
import { OrderItemsReviewComponent } from './Components/order-items-review/order-items-review.component';

//Error
import { NotFoundPageComponent } from './Components/not-found-page/not-found-page.component';
//thankyou
import { ThankyouComponent } from './Components/thankyou/thankyou.component';

const routes: Routes = [
  // { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  { path: '', component: HomepageComponent },
  { path: 'register', component: RegisterationComponent },
  { path: 'login', component: LoginComponent },

  //resturant
  { path: 'all-resturant', component: AllResturantComponent },
  { path: 'storemenu/:storeid', component: ResturantMenuComponent },
  { path: 'store-profile/:storeid', component: ResturantProfileComponent },

  //client
  // { path: 'profile', component: ClientProfileComponent },
  // { path: 'my-orders', component: MyOrdersComponent },
  // { path: 'account-info', component: AccountInfoComponent },
  // { path: 'saved-addresses', component: SavedAddressesComponent },
  // { path: 'saved-cards', component: SavedCardsComponent },
  // { path: 'system-review', component: SystemReviewComponent },
  {
    path: 'profile',
    component: ClientProfileComponent,
    children: [
      { path: '', component: AccountInfoComponent, outlet: 'subOutlet' },
      { path: 'my-orders', component: MyOrdersComponent, outlet: 'subOutlet' },

      { path: 'account-info', component: AccountInfoComponent, outlet: 'subOutlet' },
      { path: 'saved-addresses', component: SavedAddressesComponent, outlet: 'subOutlet' },
      { path: 'saved-cards', component: SavedCardsComponent, outlet: 'subOutlet' },

    ]


  },

  //system review
  { path: 'system-review', component: SystemReviewComponent },

  //store
  { path: 'RestInArea/:latitude/:longitude', component: StoresInAreaComponent },

  //order

  { path: 'checkout/:storeid', component: CheckoutComponent },
  { path: 'Payment', component: PaymentCardComponent },

  //partener


  { path: 'partener-login', component: PartenerLoginComponent, data: { navbar: false } },


  { path: 'partener', component: PartenerComponent, data: { navbar: false } },

  //offer
  { path: 'offers', component: OffersComponent },

  //item review
  { path: 'order-review/:id', component: OrderReviewComponent },
  {
    path: 'review-orderitems/:orderId/:orderReviewId',
    component: OrderItemsReviewComponent,
  },

  { path: 'Thankyou', component: ThankyouComponent },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
