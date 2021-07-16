import { AppRoutingModule } from './app-routing.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';
import { MatInputModule } from '@angular/material/input';
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

import { CartContentComponent } from './Components/cart/cart-content/cart-content.component';
import { PaymentCardComponent } from './Components/payment-card/payment-card.component';
import { RegisterationComponent } from './Components/registeration/registeration.component';
import { AllResturantComponent } from './Components/Resturant/all-resturants/all-resturants.component';
import { ResturantProfileComponent } from './Components/Resturant/resturant-profile/resturant-profile.component';
import { ResturantMenuComponent } from './Components/Resturant/resturant-menu/resturant-menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { HomepageComponent } from './Components/Home/home-page/home-page.component';
import { AgmCoreModule } from '@agm/core';
import { GoogleMapsComponent } from './Components/google-maps/google-maps.component';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { OffersComponent } from './Components/offers/offers.component';

import { ProfileService } from './Services/Profile/Profile.service';
import { OrderReviewComponent } from './Components/order-review/order-review.component';
import { OrderItemsReviewComponent } from './Components/order-items-review/order-items-review.component';
import { RatingComponent } from './Components/rating/rating.component';

import { MatStepperModule } from '@angular/material/stepper';
import { ThankyouComponent } from './Components/thankyou/thankyou.component';



import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { SplashScreenComponent } from './Components/splash-screen/splash-screen.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TopPageScrollComponent } from './Components/top-page-scroll/top-page-scroll.component'


@NgModule({
  declarations: [
    AppComponent,
    CheckoutComponent,
    LoginComponent,
    NavBarComponent,
    PaymentCardComponent,
    RegisterationComponent,
    AllResturantComponent,
    ResturantProfileComponent,
    ResturantMenuComponent,
    HomepageComponent,
    GoogleMapsComponent,
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
    CartContentComponent,
    OffersComponent,
    ThankyouComponent,

    OrderReviewComponent,
    RatingComponent,
    OrderItemsReviewComponent,
    SplashScreenComponent,
    TopPageScrollComponent,


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
    MatNativeDateModule,
    MatFormFieldModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCUzKQYbhsvR6K__xxxxxxxxxxxxxxxxxx',
      libraries: ['places'],
    }),
    MatExpansionModule,
    NgxWebstorageModule.forRoot(),

    MatStepperModule,
    MatProgressBarModule,
  ],

  providers: [
    ProfileService,
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
  ],

  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
