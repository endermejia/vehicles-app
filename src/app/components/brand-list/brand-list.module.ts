import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {BrandListComponent} from './brand-list.component';
import {MatListModule} from '@angular/material/list';
import {ScrollingModule} from '@angular/cdk/scrolling';

const routes: Routes = [
    {path: '', component: BrandListComponent},
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatListModule,
        ScrollingModule,
        BrandListComponent,
    ],
})
export class BrandListModule {
}