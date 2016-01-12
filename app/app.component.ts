import { Component } from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import { BindingComponent } from './binding/binding.component';
import { CharactersDashboardComponent } from './characters/characters-dashboard.component';
import { CharacterService } from './characters/character.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DialogService } from './blocks/dialog.service';

@Component({
  selector: 'taba-app',
  template: `
    <nav>
      <a [routerLink]="['Dashboard']">Dashboard</a>
      <a [routerLink]="['CharactersDashboard']">Characters</a>
      <a [routerLink]="['Binding']">Binding Demo</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: ['app/app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [HTTP_PROVIDERS, ROUTER_PROVIDERS, CharacterService, DialogService]
})
@RouteConfig([
  { path: '/dashboard', name: 'Dashboard', component: DashboardComponent, useAsDefault: true },
  { path: '/binding', name: 'Binding', component: BindingComponent },
	{ path: '/characters/...', name: 'CharactersDashboard', component: CharactersDashboardComponent	},
])
export class AppComponent { }
