import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';
import { Character } from './character';
import { CharacterDetailComponent } from './character-detail.component';
import { CharacterService } from './character.service';
import { FilterService } from '../blocks/filter.service';
import { FilterTextComponent } from '../blocks/filter-text.component';
import { InitCapsPipe } from '../blocks/init-caps.pipe'
import { SortCharactersPipe } from './sort-characters.pipe'
import { CONFIG } from '../config';

@Component({
  selector: 'taba-characters',
  templateUrl: './app/characters/characters.component.html',
  directives: [CharacterDetailComponent, FilterTextComponent],
  styleUrls: ['./app/characters/characters.component.css'],
  pipes: [InitCapsPipe, SortCharactersPipe],
  providers: [FilterService]
})
export class CharactersComponent implements OnInit {
  characters: Character[];
  filteredCharacters = this.characters;
  selectedCharacter: Character;
  filterText = '';

  constructor(
    private _filterService: FilterService,
    private _characterService: CharacterService,
    private _router: Router) { }

  getCharacters() {
    this.selectedCharacter = undefined;
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

  goDetail() {
    this._router.navigate(['CharacterDetail', {id: this.selectedCharacter.id}]);
  }

  ngOnInit() {
    this.characters = this.getCharacters();
  }

  onSelect(character: Character) {
    this.selectedCharacter = character;
  }

  filterChanged(searchText: string) {
    this.filteredCharacters = this._filterService.filter(searchText, ['id', 'name'], this.characters);
  }
}
