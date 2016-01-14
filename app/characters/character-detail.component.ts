import { Component, Input, OnChanges, OnInit } from 'angular2/core';
import { CanDeactivate, ComponentInstruction, RouteParams, Router, ROUTER_DIRECTIVES } from 'angular2/router';

import { Character, CharacterService } from '../characters/character.service';
import { CONFIG } from '../config';
import { ModalService } from '../blocks/modal/modal.service';

@Component({
  selector: 'taba-character-detail',
  templateUrl: 'app/characters/character-detail.component.html',
  styles: ['.mdl-textfield__label {top: 0;}'],
  directives: [ROUTER_DIRECTIVES]
})
export class CharacterDetailComponent implements CanDeactivate, OnChanges, OnInit {
  @Input()
  character: Character;
  editName: string;
  editSide: string;

  constructor(
    private _characterService: CharacterService,
    private _modalService: ModalService,
    private _routeParams: RouteParams,
    private _router: Router) {
  }

  gotoCharacters() {
    let route = ['Characters', { id: this.character ? this.character.id : null }]
    this._router.navigate(route);
  }

  routerCanDeactivate(next: ComponentInstruction, prev: ComponentInstruction) {
    return !this.character ||
      !this.isDirty() ||
      this._modalService.activate();
  }

  isDirty() {
    return this.character.name !== this.editName ||
      this.character.side !== this.editSide;
  }

  cancel() {
    this.editName = this.character.name;
    this.editSide = this.character.side;
    this.gotoCharacters();
  }

  save() {
    this.character.name = this.editName;
    this.character.side = this.editSide;
    this.gotoCharacters();
  }

  ngOnChanges(changes: any) {
    console.log(changes);
  }

  ngOnInit() {
    componentHandler.upgradeDom();

    if (!this.character) {
      let id = +this._routeParams.get('id');

      if (CONFIG.useHttpWithRx) {
        this._characterService.getCharacter(id)
          .subscribe((character: Character) => { this.setCharacter(character) });
      } else {
        this._characterService.getCharacter_ViaPromise(id)
          .then(character => { this.setCharacter(character) });
      }
    }
  }

  private setCharacter(character: Character) {
    if (character) {
      this.editName = character.name;
      this.editSide = character.side;
      this.character = character;
    } else {
      this.gotoCharacters();
    }
  }
}
