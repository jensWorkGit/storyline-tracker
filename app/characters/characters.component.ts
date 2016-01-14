import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { Character, CharacterService } from './character.service';
import { FilterService } from '../blocks/filter.service';
import { FilterTextComponent } from '../blocks/filter-text.component';
import { SortCharactersPipe } from './sort-characters.pipe'
import { CONFIG } from '../config';

@Component({
  selector: 'taba-characters',
  templateUrl: './app/characters/characters.component.html',
  directives: [FilterTextComponent, ROUTER_DIRECTIVES],
  styleUrls: ['./app/characters/characters.component.css'],
  pipes: [SortCharactersPipe],
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
    componentHandler.upgradeDom();
    this.characters = this.getCharacters();
  }

  filterChanged(searchText: string) {
    this.filteredCharacters = this._filterService.filter(searchText, ['id', 'name', 'side'], this.characters);
  }
}
