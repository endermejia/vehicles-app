import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import {
  ApiResponse,
  Brand,
  Model,
  VehicleService,
  VehicleType,
} from "./vehicle.service";

describe("VehicleService", () => {
  let service: VehicleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VehicleService],
    });

    service = TestBed.inject(VehicleService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should load brands successfully", () => {
    const mockBrands: ApiResponse<Brand> = {
      Results: [
        { Make_ID: 1, Make_Name: "Toyota" },
        { Make_ID: 2, Make_Name: "Honda" },
      ],
    };

    const httpTestingController = TestBed.inject(HttpTestingController);

    // Clear any unintended loadBrands call made in the constructor
    httpTestingController
      .match("https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json")
      .forEach((req) => req.flush(mockBrands));

    service.loadBrands();

    const req = httpTestingController.expectOne(
      "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json",
    );
    expect(req.request.method).toBe("GET");
    req.flush(mockBrands);

    expect(service.brands()).toEqual(mockBrands.Results);

    httpTestingController.verify();
  });

  it("should load vehicle types and models by brand ID", () => {
    const mockVehicleTypes: ApiResponse<VehicleType> = {
      Results: [
        { VehicleTypeId: 1, VehicleTypeName: "SUV" },
        { VehicleTypeId: 2, VehicleTypeName: "Sedan" },
      ],
    };

    const mockModels: ApiResponse<Model>[] = [
      {
        Results: [
          {
            Model_ID: 1,
            Model_Name: "Model X",
            VehicleTypeId: 1,
            VehicleTypeName: "SUV",
          },
        ],
      },
      {
        Results: [
          {
            Model_ID: 2,
            Model_Name: "Model Y",
            VehicleTypeId: 2,
            VehicleTypeName: "Sedan",
          },
        ],
      },
    ];

    const httpTestingController = TestBed.inject(HttpTestingController);

    // Mock Brands API response (to satisfy constructor call to loadBrands)
    const mockBrands: ApiResponse<Brand> = {
      Results: [
        { Make_ID: 1, Make_Name: "Toyota" },
        { Make_ID: 2, Make_Name: "Honda" },
      ],
    };

    const brandsReq = httpTestingController.expectOne(
      "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json",
    );
    expect(brandsReq.request.method).toBe("GET");
    brandsReq.flush(mockBrands);

    service.loadVehicleTypesAndModelsById(1);

    // Mock Vehicle Types API response
    const req1 = httpTestingController.expectOne(
      "https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/1?format=json",
    );
    expect(req1.request.method).toBe("GET");
    req1.flush(mockVehicleTypes);

    expect(service.vehicleTypes()).toEqual(mockVehicleTypes.Results);

    // Mock Models API requests for each vehicle type
    const req2 = httpTestingController.expectOne(
      "https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/1/vehicletype/SUV?format=json",
    );
    expect(req2.request.method).toBe("GET");
    req2.flush(mockModels[0]);

    const req3 = httpTestingController.expectOne(
      "https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/1/vehicletype/Sedan?format=json",
    );
    expect(req3.request.method).toBe("GET");
    req3.flush(mockModels[1]);

    // Verify models are set correctly after all API responses
    expect(service.models()).toEqual([
      ...mockModels[0].Results,
      ...mockModels[1].Results,
    ]);

    httpTestingController.verify();
  });
});
