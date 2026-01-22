import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { ListMenu } from './components/list-menu/list-menu';
import { UserService } from './shared/services/user-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, ListMenu],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  userService = inject(UserService);
  user = this.userService.user;
}
