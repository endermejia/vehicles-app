import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { BrandDetailsComponent } from "./brand-details.component";
import { MatCardModule } from "@angular/material/card";

const routes: Routes = [{ path: "", component: BrandDetailsComponent }];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    BrandDetailsComponent,
  ],
})
export class BrandDetailsModule {}
