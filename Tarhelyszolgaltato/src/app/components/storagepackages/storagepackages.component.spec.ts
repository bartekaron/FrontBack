import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoragePackagesComponent } from './storagepackages.component';

describe('StoragepackagesComponent', () => {
  let component: StoragePackagesComponent;
  let fixture: ComponentFixture<StoragePackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoragePackagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoragePackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
