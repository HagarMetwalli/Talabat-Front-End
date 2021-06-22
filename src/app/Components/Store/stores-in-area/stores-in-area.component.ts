import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '../../../Models/Store';
import { Component, OnInit, Input } from '@angular/core';
import { NavbarService } from 'src/app/Services/Home/navbar.service';

@Component({
  selector: 'app-stores-in-area',
  templateUrl: './stores-in-area.component.html',
  styleUrls: ['./stores-in-area.component.css']
})
export class StoresInAreaComponent implements OnInit {

  @Input() nearStores: Store[] = []
  filterTerm?: string;
  page !: number;
  store!: Store;

    constructor(private router: Router, private activeroute: ActivatedRoute, public nav: NavbarService) { }

  ngOnInit(): void {
    this.nav.show();
    this.activeroute.paramMap.subscribe(params => {
      this.nearStores.forEach((s: Store) => {
        this.store = s;
      });
    });

  }

}
