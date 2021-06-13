import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/Models/Client';
import { ProfileService } from 'src/app/Services/Profile/Profile.service';


@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
