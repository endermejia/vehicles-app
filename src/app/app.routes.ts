import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./components/brand-list/brand-list.module").then(
        (m) => m.BrandListModule,
      ),
  },
  {
    path: "brand/:id",
    loadChildren: () =>
      import("./components/brand-details/brand-details.module").then(
        (m) => m.BrandDetailsModule,
      ),
  },
];
