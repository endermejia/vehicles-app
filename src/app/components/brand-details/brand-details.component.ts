import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatButton } from "@angular/material/button";
import { MatCard, MatCardSubtitle, MatCardTitle } from "@angular/material/card";
import { MatChip, MatChipListbox } from "@angular/material/chips";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { VehicleService } from "../../services/vehicle.service";

@Component({
  selector: "app-brand-details",
  templateUrl: "./brand-details.component.html",
  imports: [
    CommonModule,
    MatButton,
    MatCard,
    MatCardTitle,
    MatChip,
    MatChipListbox,
    MatProgressSpinner,
    MatCardSubtitle,
  ],
})
export class BrandDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  protected vehicleService = inject(VehicleService);

  ngOnInit() {
    const brandId = Number(this.route.snapshot.paramMap.get("id"));
    if (brandId) {
      this.vehicleService.selectedBrandId.set(brandId);
      this.vehicleService.selectedType.set(null);
      this.vehicleService.models.set([]);
      this.vehicleService.vehicleTypes.set([]);
      this.vehicleService.loadVehicleTypesAndModelsById(brandId);
    } else {
      this.goBack();
    }
  }

  filterByType(type: string) {
    this.vehicleService.selectedType.set(
      this.vehicleService.selectedType() === type ? null : type,
    );
  }

  goBack() {
    this.vehicleService.selectedBrandId.set(null);
    this.router.navigate(["/"]);
  }
}
