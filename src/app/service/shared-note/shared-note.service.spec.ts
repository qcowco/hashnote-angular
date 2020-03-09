import { TestBed } from '@angular/core/testing';

import { SharedNoteService } from './shared-note.service';

describe('SharedNoteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedNoteService = TestBed.get(SharedNoteService);
    expect(service).toBeTruthy();
  });
});
