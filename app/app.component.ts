import { Component } from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import { VehiclesDashboardComponent } from './vehicles/vehicles-dashboard.component';
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
  { path: '/vehicles/...', name: 'Vehicles', component: VehiclesDashboardComponent },
	{ path: '/characters/...', name: 'CharactersDashboard', component: CharactersDashboardComponent	},
])
export class AppComponent {
  public menuItems = [
    { caption: 'Dashboard', link: ['Dashboard'] },
    { caption: 'Characters', link: ['CharactersDashboard'] },
    { caption: 'Vehicles', link: ['Vehicles'] }
  ];
}
