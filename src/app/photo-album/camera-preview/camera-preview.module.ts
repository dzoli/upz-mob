import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CameraPreviewPageRoutingModule } from './camera-preview-routing.module';

import { CameraPreviewPage } from './camera-preview.page';
import { WebcamModule } from 'ngx-webcam';

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, CameraPreviewPageRoutingModule, WebcamModule],
    declarations: [CameraPreviewPage],
})
export class CameraPreviewPageModule {}
