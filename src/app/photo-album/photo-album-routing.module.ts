import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoAlbumPage } from './photo-album.page';

const routes: Routes = [
    {
        path: '',
        component: PhotoAlbumPage,
    },
    {
        path: 'camera-preview',
        loadChildren: () => import('./camera-preview/camera-preview.module').then((m) => m.CameraPreviewPageModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PhotoAlbumPageRoutingModule {}
