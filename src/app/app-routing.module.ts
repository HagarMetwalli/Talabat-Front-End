import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { ClientProfileComponent } from './Components/Client/client-profile/client-profile.component';
import { AccountInfoComponent } from './Components/Client/account-info/account-info.component';
import { MyOrdersComponent } from './Components/Client/my-orders/my-orders.component';
import { SavedAddressesComponent } from './Components/Client/saved-addresses/saved-addresses.component';
import { SavedCardsComponent } from './Components/Client/saved-cards/saved-cards.component';
import { NotFoundPageComponent } from './Components/not-found-page/not-found-page.component';
import { SystemReviewComponent } from './Components/Review/system-review/system-review.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'profile', component: ClientProfileComponent },
  { path: 'my-orders', component: MyOrdersComponent },
  { path: 'account-info', component: AccountInfoComponent },
  { path: 'saved-addresses', component: SavedAddressesComponent },
  { path: 'saved-cards', component: SavedCardsComponent },
  { path: 'system-review', component: SystemReviewComponent },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
