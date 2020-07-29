import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';

// modulos do angular material
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatMenuModule,
    MatToolbarModule,
    MatTabsModule,
    MatTableModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatChipsModule,
    MatExpansionModule
  ]
})
export class AngularMaterialModule { }
