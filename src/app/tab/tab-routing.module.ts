import { MapPageModule } from './../map/map.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabPage } from './tab.page';

const routes: Routes = [
    {
        path: 'page',
        component: TabPage,
        children: [
            {
                path: 'map',
                loadChildren: () => import('../map/map.module').then((m) => m.MapPageModule),
            },
            {
                path: 'task-list',
                loadChildren: () => import('../task-list/task-list.module').then((m) => m.TaskListPageModule),
            },
            {
                path: '',
                redirectTo: '/tab/page/task-list',
                pathMatch: 'full',
            },
        ],
    },
    {
        path: '',
        redirectTo: '/tab/page/task-list',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TabPageRoutingModule {}
