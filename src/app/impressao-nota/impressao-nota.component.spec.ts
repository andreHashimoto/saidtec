import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpressaoNotaComponent } from './impressao-nota.component';

describe('ImpressaoNotaComponent', () => {
  let component: ImpressaoNotaComponent;
  let fixture: ComponentFixture<ImpressaoNotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpressaoNotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpressaoNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
