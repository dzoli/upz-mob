import { WebcamModule } from 'ngx-webcam';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhotoAlbumPageRoutingModule } from './photo-album-routing.module';

import { PhotoAlbumPage } from './photo-album.page';

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, PhotoAlbumPageRoutingModule, WebcamModule],
    declarations: [PhotoAlbumPage],
})
export class PhotoAlbumPageModule {}
