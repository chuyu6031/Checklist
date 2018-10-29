import { TestBed } from '@angular/core/testing';

import { ChecklistdataService } from './checklistdata.service';

describe('ChecklistdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChecklistdataService = TestBed.get(ChecklistdataService);
    expect(service).toBeTruthy();
  });
});
