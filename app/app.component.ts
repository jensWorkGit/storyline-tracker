import { Component } from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import { BindingComponent } from './binding/binding.component';
import { CharactersDashboardComponent } from './characters/characters-dashboard.component';
import { CharacterService } from './characters/character.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ModalService } from './blocks/modal/modal.service'
import { ModalComponent } from './blocks/modal/modal.component';

@Component({
  selector: 'taba-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css'],
  directives: [ROUTER_DIRECTIVES, ModalComponent],
  providers: [HTTP_PROVIDERS, ROUTER_PROVIDERS, CharacterService, ModalService]
})
@RouteConfig([
  { path: '/dashboard', name: 'Dashboard', component: DashboardComponent, useAsDefault: true },
  { path: '/binding', name: 'Binding', component: BindingComponent },
	{ path: '/characters/...', name: 'CharactersDashboard', component: CharactersDashboardComponent	},
])
export class AppComponent {
  public menuItems = [
    { caption: 'Dashboard', link: ['Dashboard'] },
    { caption: 'Characters', link: ['CharactersDashboard'] },
    { caption: 'Binding', link: ['Binding'] }
  ];
}
