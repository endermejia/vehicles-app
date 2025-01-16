import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BrandListComponent } from "./brand-list.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

describe("BrandListComponent", () => {
  let component: BrandListComponent;
  let fixture: ComponentFixture<BrandListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandListComponent, HttpClientTestingModule],
      providers: [provideAnimationsAsync()],
    }).compileComponents();

    fixture = TestBed.createComponent(BrandListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
