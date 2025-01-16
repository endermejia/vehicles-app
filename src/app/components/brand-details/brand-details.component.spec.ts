import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandDetailsComponent } from './brand-details.component';
import {provideRouter} from "@angular/router";
import {provideHttpClientTesting} from "@angular/common/http/testing";

describe('BrandDetailsComponent', () => {
  let component: BrandDetailsComponent;
  let fixture: ComponentFixture<BrandDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandDetailsComponent],
      providers:[provideRouter([]), provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
