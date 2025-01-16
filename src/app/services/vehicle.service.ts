import {Injectable, signal, computed, inject, DestroyRef} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {forkJoin, switchMap, tap} from "rxjs";

export interface Brand {
    Make_ID: number;
    Make_Name: string;
}

export interface VehicleType {
    VehicleTypeId: number;
    VehicleTypeName: string;
}

export interface Model {
    Model_ID: number;
    Model_Name: string;
    VehicleTypeId: number;
    VehicleTypeName: string;
}

export interface ApiResponse<T> {
    Results: T[];
}

@Injectable({
    providedIn: 'root',
})
export class VehicleService {
    brands = signal<Brand[]>([]);
    selectedBrandId = signal<number | null>(null);
    selectedBrand = computed(() => this.brands().find((brand) => brand.Make_ID === this.selectedBrandId()));
    vehicleTypes = signal<VehicleType[]>([]);
    models = signal<Model[]>([]);

    filter = signal<string>('');
    filteredBrands = computed(() =>
        this.brands().filter((brand) =>
            brand.Make_Name?.toLowerCase().includes(this.filter().toLowerCase())
        )
    );

    selectedType = signal<string | null>(null);
    filteredModels = computed(() => {
        if (!this.selectedType()) return this.models();
        return this.models().filter((model) => model.VehicleTypeName === this.selectedType());
    });

    private http = inject(HttpClient);
    private destroyRef = inject(DestroyRef);

    constructor() {
        this.loadBrands();
    }

    loadBrands() {
        this.http
            .get<ApiResponse<Brand>>('https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json')
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                tap((response: ApiResponse<Brand>) =>
                    this.brands.set(response.Results)
                )
            )
            .subscribe();
    }

    loadVehicleTypesAndModelsById(brandId: number) {
        this.http
            .get<ApiResponse<VehicleType>>(
                `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/${encodeURIComponent(brandId)}?format=json`
            )
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                switchMap((vehicleTypeResponse: ApiResponse<VehicleType>) => {
                    const vehicleTypes = vehicleTypeResponse.Results;
                    this.vehicleTypes.set(vehicleTypes);
                    const modelRequests = vehicleTypes.map((vehicleType) =>
                        this.http.get<ApiResponse<Model>>(
                            `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${encodeURIComponent(brandId)}/vehicletype/${encodeURIComponent(vehicleType.VehicleTypeName)}?format=json`
                        )
                    );
                    return forkJoin(modelRequests);
                }),
                tap((modelsResponses: ApiResponse<Model>[]) => {
                    const allModels = modelsResponses.flatMap(
                        (response) => response.Results
                    );
                    this.models.set(allModels);
                })
            )
            .subscribe();
    }
}
