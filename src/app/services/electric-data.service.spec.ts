import { TestBed } from '@angular/core/testing';

import { ElectricDataService } from './electric-data.service';

describe('ElectricDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ElectricDataService = TestBed.get(ElectricDataService);
    expect(service).toBeTruthy();
  });
});
