import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Home 
import { HomePageComponent } from './Components/Home/home-page/home-page.component';

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
import { AllResturantsComponent } from './Components/Resturant/all-resturants/all-resturants.component';
import { ResturantMenuComponent } from './Components/Resturant/resturant-menu/resturant-menu.component';
import { ResturantProfileComponent } from './Components/Resturant/resturant-profile/resturant-profile.component';

//Store
import { StoresInAreaComponent } from './Components/Store/stores-in-area/stores-in-area.component';

//Cart

//Order
import { OffersComponent } from './Components/offers/offers.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { PaymentCardComponent } from './Components/payment-card/payment-card.component';

//Partentar
import { PartenerLoginComponent } from './Components/Partener/partener-login/partener-login.component';
import { PartenerComponent } from './Components/Partener/partener/partener.component';

//System
import { SystemReviewComponent } from './Components/Review/system-review/system-review.component';

//Error
import { NotFoundPageComponent } from './Components/not-found-page/not-found-page.component';

const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'register', component: RegisterationComponent },
  { path: 'login', component: LoginComponent },

  //resturant
  { path: 'all-resturant', component: AllResturantsComponent },
  { path: 'resturant/menu', component: ResturantMenuComponent },
  { path: 'resturant', component: ResturantProfileComponent },
  
  //client
  { path: 'profile', component: ClientProfileComponent },
  { path: 'my-orders', component: MyOrdersComponent },
  { path: 'account-info', component: AccountInfoComponent },
  { path: 'saved-addresses', component: SavedAddressesComponent },
  { path: 'saved-cards', component: SavedCardsComponent },
  { path: 'system-review', component: SystemReviewComponent },
  
  //store
  { path: 'nearest-stores', component: StoresInAreaComponent },
  
  //order
  { path: 'offers', component: OffersComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'Payment', component: PaymentCardComponent },

  //partener
  { path: 'partener-login', component: PartenerLoginComponent },
  { path: 'partener-profile', component: PartenerComponent },

  { path: '**', component: NotFoundPageComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
