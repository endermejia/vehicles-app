import {Component, OnInit, computed, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {
    ScrollingModule
} from '@angular/cdk/scrolling';
import {
    MatListModule,
    MatListItem,
} from '@angular/material/list';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatInput} from '@angular/material/input';
import {VehicleService} from '../../services/vehicle.service';

@Component({
    selector: 'app-brand-list',
    templateUrl: './brand-list.component.html',
    imports: [
        CommonModule,
        MatLabel,
        MatListModule,
        MatListItem,
        MatFormField,
        MatProgressSpinner,
        MatInput,
        ScrollingModule,
    ],
})
export class BrandListComponent implements OnInit {
    filteredBrands = computed(() => this.vehicleService.filteredBrands());

    private router = inject(Router);
    protected vehicleService = inject(VehicleService);

    ngOnInit() {
        this.vehicleService.filter.set('');
    }

    onFilter(event: Event) {
        const input = event.target as HTMLInputElement;
        this.vehicleService.filter.set(input.value);
    }

    selectBrand(brand: number) {
        this.router.navigate(['/brand', brand]);
    }
}