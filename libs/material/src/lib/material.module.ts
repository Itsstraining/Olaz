import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatTableModule,
    MatSelectModule,
    MatExpansionModule,
    MatTooltipModule,
    DragDropModule
  ],
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatTableModule,
    MatSelectModule,
    MatExpansionModule,
    MatTooltipModule,
    DragDropModule
  ]
})
export class MaterialModule { }
