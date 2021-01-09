import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllItemsPage } from './all-items.page';

describe('AllItemsPage', () => {
  let component: AllItemsPage;
  let fixture: ComponentFixture<AllItemsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllItemsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllItemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
