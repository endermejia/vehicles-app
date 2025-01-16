import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandListComponent } from './brand-list.component';
import {provideHttpClientTesting} from "@angular/common/http/testing";

describe('BrandListComponent', () => {
  let component: BrandListComponent;
  let fixture: ComponentFixture<BrandListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandListComponent],
      providers:[provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
