import { MatSelectCheckAllModule } from './mat-select-check-all.module';

describe('MatSelectCheckAllModule', () => {
  let matSelectCheckAllModule: MatSelectCheckAllModule;

  beforeEach(() => {
    matSelectCheckAllModule = new MatSelectCheckAllModule();
  });

  it('should create an instance', () => {
    expect(matSelectCheckAllModule).toBeTruthy();
  });
});
