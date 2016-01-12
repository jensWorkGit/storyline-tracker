import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { Character } from './character';
import { CharacterService } from './character.service';
import { FilterService } from '../blocks/filter.service';
import { FilterTextComponent } from '../blocks/filter-text.component';
import { InitCapsPipe } from '../blocks/init-caps.pipe'
import { SortCharactersPipe } from './sort-characters.pipe'
import { CONFIG } from '../config';

//TODO: not using init caps pipe right now

@Component({
  selector: 'taba-characters',
  templateUrl: './app/characters/characters.component.html',
  directives: [FilterTextComponent, ROUTER_DIRECTIVES],
  styleUrls: ['./app/characters/characters.component.css'],
  pipes: [InitCapsPipe, SortCharactersPipe],
  providers: [FilterService]
})
export class CharactersComponent implements OnInit {
  characters: Character[];
  filteredCharacters = this.characters;
  filterText = '';

  constructor(
    private _filterService: FilterService,
    private _characterService: CharacterService) {
  }

  getCharacters() {
    this.characters = [];

    if (CONFIG.useHttpWithRx) {
      this._characterService.getCharacters()
        .subscribe((characters: Character[]) => {
          this.characters = this.filteredCharacters = characters
        });
    } else {
      this._characterService.getCharacters_ViaPromise()
        .then((characters: Character[]) => {
          this.characters = this.filteredCharacters = characters
        });
    }

    return this.characters;
  }

  ngOnInit() {
    this.characters = this.getCharacters();
  }

  filterChanged(searchText: string) {
    this.filteredCharacters = this._filterService.filter(searchText, ['id', 'name'], this.characters);
  }
}
