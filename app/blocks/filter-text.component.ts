import { Component, EventEmitter } from 'angular2/core';

@Component({
  selector: 'filter-text',
  outputs: ['changed'],
  template: `
    <form>
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <label class="mdl-textfield__label" for="filterText">Filter...</label>
         <input type="text" id="filterText"
                class="mdl-textfield__input"
                [(ngModel)]="filter"
                (keyup)="filterChanged($event)" />
      </div>
    </form>
  `
})
export class FilterTextComponent {
  filter: string;
  changed: EventEmitter<string>;

  constructor() {
    this.changed = new EventEmitter();
  }

  filterChanged(event: any) {
    event.preventDefault();
    console.log(`Filter Changed: ${this.filter}`);
    this.changed.next(this.filter);
  }
}