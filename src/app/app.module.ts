import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SocialLoginModule, SocialAuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider,
} from 'angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { A11yModule } from '@angular/cdk/a11y';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { MatMenuModule } from '@angular/material/menu';
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
import { CommonModule } from '@angular/common';
import { NgPaymentCardModule } from 'ng-payment-card';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field' ;
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatNativeDateModule,
  MatRippleModule,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
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
    SystemReviewComponent,
    FooterComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    MatMenuModule,
    BrowserAnimationsModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    HttpClientModule,
    NgbModule,
    NgPaymentCardModule,
    CommonModule,
    A11yModule,
    ClipboardModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatRadioModule,
    MatSelectModule,
    MatTabsModule,
    OverlayModule,
    MatFormFieldModule,
    TooltipModule.forRoot()
  ],
  providers: [
    BsModalService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },    
    {
      
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '480432450025-dlkiap8l9pvop7mamvht1ab6ond71fof.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1080637959127854'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    NgbModule,
    //StoresService
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
