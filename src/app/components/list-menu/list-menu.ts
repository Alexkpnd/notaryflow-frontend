import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-list-menu',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './list-menu.html',
  styleUrl: './list-menu.css',
})
export class ListMenu {
  menu = [
    {text:'Αρχική', link: 'user-dashboard'},
    {text:'Το προφίλ μου', link:'my-profile'},
    {text:'Συμβόλαια', link:'contracts-list'},
    {text:'Χρήστες', link:'users-list'}
  ]
}
