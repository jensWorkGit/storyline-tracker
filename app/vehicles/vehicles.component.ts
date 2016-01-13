import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { Vehicle, VehicleService } from './vehicle.service';
import { FilterService } from '../blocks/filter.service';
import { FilterTextComponent } from '../blocks/filter-text.component';
import { InitCapsPipe } from '../blocks/init-caps.pipe'
import { CONFIG } from '../config';

@Component({
  selector: 'taba-vehicles',
  templateUrl: './app/vehicles/vehicles.component.html',
  directives: [FilterTextComponent, ROUTER_DIRECTIVES],
  styleUrls: ['./app/vehicles/vehicles.component.css'],
  pipes: [InitCapsPipe],
  providers: [FilterService]
})
export class VehiclesComponent implements OnInit {
  vehicles: Vehicle[];
  filteredVehicles = this.vehicles;
  filterText = '';

  constructor(
    private _filterService: FilterService,
    private _VehicleService: VehicleService) {
    componentHandler.upgradeDom();
  }

  getVehicles() {
    this.vehicles = [];

    this._VehicleService.getVehicles()
      .subscribe((vehicles: Vehicle[]) => {
        this.vehicles = this.filteredVehicles = vehicles
      });

    return this.vehicles;
  }

  ngOnInit() {
    componentHandler.upgradeDom();
    this.vehicles = this.getVehicles();
  }

  filterChanged(searchText: string) {
    this.filteredVehicles = this._filterService.filter(searchText, ['id', 'name', 'type'], this.vehicles);
  }
}
