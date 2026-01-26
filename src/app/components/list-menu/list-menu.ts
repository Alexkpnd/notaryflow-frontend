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
    {text:'Dashboard', link: 'user-dashboard'},
    {text:'Contracts', link:'contracts-list'}
  ]
}
