import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'tab',
        pathMatch: 'full',
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then((m) => m.AuthPageModule),
    },
    {
        path: 'tab',
        loadChildren: () => import('./tab/tab.module').then((m) => m.TabPageModule),
    },
    {
        path: 'analysis',
        loadChildren: () => import('./analysis/analysis.module').then((m) => m.AnalysisPageModule),
    },
    {
        path: 'additional-info',
        loadChildren: () => import('./additional-info/additional-info.module').then((m) => m.AdditionalInfoPageModule),
    },
  {
    path: 'photo-album',
    loadChildren: () => import('./photo-album/photo-album.module').then( m => m.PhotoAlbumPageModule)
  },
];
@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
