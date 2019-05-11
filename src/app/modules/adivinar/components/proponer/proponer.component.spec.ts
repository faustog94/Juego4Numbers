/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProponerComponent } from './proponer.component';

describe('ProponerComponent', () => {
  let component: ProponerComponent;
  let fixture: ComponentFixture<ProponerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProponerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProponerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
