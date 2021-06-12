import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { LoginComponent } from './Components/login/login.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { OffersComponent } from './Components/offers/offers.component';
import { PaymentCardComponent } from './Components/payment-card/payment-card.component';
import { RegisterationComponent } from './Components/registeration/registeration.component';
import { AllResturantsComponent } from './Components/Resturant/all-resturants/all-resturants.component';
import { ResturantProfileComponent } from './Components/Resturant/resturant-profile/resturant-profile.component';
import { ResturantMenuComponent } from './Components/Resturant/resturant-menu/resturant-menu.component';
import { CartHeaderComponent } from './Components/Cart/cart-header/cart-header.component';
import { CartContentComponent } from './Components/Cart/cart-content/cart-content.component';
import { CartButtonsComponent } from './Components/Cart/cart-buttons/cart-buttons.component';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { GoogleMapComponent } from './Components/Maps/google-map/google-map.component';
import { PartenerComponent } from './Components/Partener/partener/partener.component';
import { PartenerLoginComponent } from './Components/Partener/partener-login/partener-login.component';
import { StoresInAreaComponent } from './Components/Store/stores-in-area/stores-in-area.component';
import { AccountInfoComponent } from './Components/Client/account-info/account-info.component';
import { SavedAddressesComponent } from './Components/Client/saved-addresses/saved-addresses.component';
import { MyOrdersComponent } from './Components/Client/my-orders/my-orders.component';
import { SavedCardsComponent } from './Components/Client/saved-cards/saved-cards.component';
import { NotFoundPageComponent } from './Components/not-found-page/not-found-page.component';
import { ClientProfileComponent } from './Components/Client/client-profile/client-profile.component';
import { SystemReviewComponent } from './Components/Review/system-review/system-review.component';

@NgModule({
  declarations: [
    AppComponent,
    CheckoutComponent,
    LoginComponent,
    NavBarComponent,
    OffersComponent,
    PaymentCardComponent,
    RegisterationComponent,
    AllResturantsComponent,
    ResturantProfileComponent,
    ResturantMenuComponent,
    CartHeaderComponent,
    CartContentComponent,
    CartButtonsComponent,
    HomePageComponent,
    GoogleMapComponent,
    PartenerComponent,
    PartenerLoginComponent,
    StoresInAreaComponent,
    AccountInfoComponent,
    SavedAddressesComponent,
    MyOrdersComponent,
    SavedCardsComponent,
    NotFoundPageComponent,
    ClientProfileComponent,
    SystemReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
