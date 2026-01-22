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
    {text:'Main Page', link: 'user-main-page'},
    {text:'Login', link: 'user-login'}
  ]
}
