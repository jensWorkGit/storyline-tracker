import { Component, EventEmitter } from 'angular2/core';

@Component({
  selector: 'filter-text',
  outputs: ['changed'],
  template: `
    <form>
         Filter:
         <input type="text"
                [(ngModel)]="filter"
                (keyup)="filterChanged($event)" />
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