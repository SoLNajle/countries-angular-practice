import {
  ViewChild,
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  AfterViewInit,
} from '@angular/core';
import { VisitedCountry } from '../../models/visited-country';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-country-list',
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatPaginatorModule],
  templateUrl: './country-list.html',
  styleUrl: './country-list.scss',
})
export class CountryList implements OnChanges, AfterViewInit {
  @Input() countries: VisitedCountry[] = [];

  @Input() countryFormEditing = false;
  @Output() countryDeleted = new EventEmitter<number>();
  @Output() countryEdited = new EventEmitter<number>();

  displayedColumns: string[] = [
    'country',
    'stayDuration',
    'visitAmount',
    'actionButtons',
  ];
  dataSource = new MatTableDataSource<VisitedCountry>([]);

  ngOnChanges() {
    this.dataSource.data = this.countries;
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  deleteCountry(countryId: number): void {
    console.log('Deleting country:', countryId);
    this.countryDeleted.emit(countryId);
  }

  editCountry(countryId: number): void {
    console.log('Editing country:', countryId);
    this.countryEdited.emit(countryId);
  }
}
