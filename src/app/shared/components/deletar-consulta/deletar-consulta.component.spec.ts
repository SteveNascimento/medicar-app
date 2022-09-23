import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletarConsultaComponent } from './deletar-consulta.component';

describe('DeletarConsultaComponent', () => {
  let component: DeletarConsultaComponent;
  let fixture: ComponentFixture<DeletarConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletarConsultaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletarConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
