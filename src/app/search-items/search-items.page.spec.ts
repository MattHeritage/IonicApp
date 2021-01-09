import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchItemsPage } from './search-items.page';

describe('SearchItemsPage', () => {
  let component: SearchItemsPage;
  let fixture: ComponentFixture<SearchItemsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchItemsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchItemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
