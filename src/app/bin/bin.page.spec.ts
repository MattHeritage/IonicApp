import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BinPage } from './bin.page';

describe('BinPage', () => {
  let component: BinPage;
  let fixture: ComponentFixture<BinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BinPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
