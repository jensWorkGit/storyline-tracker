import { Component, OnInit } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { CharactersComponent } from './characters.component';
import { CharacterDetailComponent } from './character-detail.component';
import { CharacterService } from './character.service';

@Component({
  selector: 'taba-character-dashboard',
  template: `
    <!-- <h2>Character Dashboard</h2> -->
    <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/', name: 'CharactersDashboard', component: CharactersComponent, useAsDefault: true },
	{ path: '/list/:id', name: 'Characters', component: CharactersComponent	},
	{ path: '/:id', name: 'CharacterDetail', component: CharacterDetailComponent }
])
export class CharactersDashboardComponent implements OnInit {
  constructor() { }
  ngOnInit() { }
}
