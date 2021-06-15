import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '../../../Models/Store';
import { Component, OnInit, Input } from '@angular/core';

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

  constructor(private router: Router, private activeroute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activeroute.paramMap.subscribe(params => {
      this.nearStores.forEach((s: Store) => {
        this.store = s;
      });
    });

  }

}
