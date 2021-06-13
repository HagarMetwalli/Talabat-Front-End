import { DemoComponent } from './Components/demo/demo.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { LoginComponent } from './Components/login/login.component';
import { NavBarComponent } from './Components/Home/nav-bar/nav-bar.component';
import { OffersComponent } from './Components/offers/offers.component';
import { PaymentCardComponent } from './Components/payment-card/payment-card.component';
import { RegisterationComponent } from './Components/registeration/registeration.component';
import { AllResturantsComponent } from './Components/Resturant/all-resturants/all-resturants.component';
import { ResturantProfileComponent } from './Components/Resturant/resturant-profile/resturant-profile.component';
import { ResturantMenuComponent } from './Components/Resturant/resturant-menu/resturant-menu.component';
import { CartHeaderComponent } from './Components/Cart/cart-header/cart-header.component';
import { CartContentComponent } from './Components/Cart/cart-content/cart-content.component';
import { CartButtonsComponent } from './Components/Cart/cart-buttons/cart-buttons.component';
import { HomePageComponent } from './Components/Home/home-page/home-page.component';
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
import { FooterComponent } from './Components/Home/footer/footer.component';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CheckoutComponent,
    NgModule,
    LoginComponent,
    NavBarComponent,
    OffersComponent,
    HomePageComponent,
    PaymentCardComponent,
    DemoComponent,
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
    SystemReviewComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    HttpHeaders,
    NgModule,
    BrowserAnimationsModule,
    //MatInputModule,
    FormsModule,
    //Ng2SearchPipeModule,
    //NgxPaginationModule,
    ModalModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCUzKQYbhsvR6K__DdrqYTJiSnuXpDNsWE',
      libraries: ['places'],
    }),
  ],
  exports:[NgModule],
  providers: [BsModalService],
  bootstrap: [AppComponent],
})
export class AppModule {}
