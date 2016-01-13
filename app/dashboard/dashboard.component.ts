import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';
import { Character, CharacterService } from '../characters/character.service';
import { CONFIG } from '../config';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard/dashboard.component.html',
  styleUrls: ['app/dashboard/dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  characters: Character[];

  constructor(private _characterService: CharacterService, private _router: Router) { }

  ngOnInit() {
    this.characters = this.getCharacters();
  }

  gotoDetail(character: Character) {
    this._router.navigate(['CharactersDashboard', 'CharacterDetail', { id: character.id }]);
  }

  getCharacters() {
    this.characters = [];

    if (CONFIG.useHttpWithRx) {
      this._characterService.getCharacters()
        .subscribe((characters: Character[]) => {
          this.characters = characters.slice(0, 16);
        });
      //TODO: How would this work if I wanted to use RxPipe ?
    } else {
      this._characterService.getCharacters_ViaPromise()
        .then((characters: Character[]) => this.characters = characters.slice(0, 16));
    }

    return this.characters;
  }
}
