import { AnalysisPageModule } from './../analysis/analysis.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapPageRoutingModule } from './map-routing.module';

import { MapPage } from './map.page';

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, MapPageRoutingModule, LeafletModule, AnalysisPageModule],
    declarations: [MapPage],
})
export class MapPageModule {}
