import { Component, Input, OnInit, Output } from '@angular/core';
import { StoreService } from '../../../Services/Stores/store.service';
import { Store } from '../../../Models/Store';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-all-resturant',
  templateUrl: './all-resturants.component.html',
  styleUrls: ['./all-resturants.component.css']
})
export class AllResturantComponent implements OnInit {
  @Input() stores: Store[] = []
  filterTerm!: string;
  p !: number;

  constructor(private StoresService: StoreService, private router: Router, private avtive: ActivatedRoute) {
  }
  ngOnInit(): void {
    // this.retrieveStores();
    this.StoresService.getstores().subscribe(
      store => {
        console.log(store);
        this.stores = store;
      }
    )
  }

  storeprofileshow(@Output() id: number) {
    this.router.navigate(['/store-profile', id]);
  }
}
