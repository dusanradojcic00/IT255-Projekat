import { environment } from './../../../../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase),],
      declarations: [DashboardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should merge array of orders where date is same, and update total earnings per date', () => {
    const startArr = [{ total: 100, date: "25/11/2020", number: 1 },
    { total: 200, date: "25/11/2020", number: 1 },
    { total: 300, date: "25/11/2020", number: 1 },
    { total: 100, date: "26/11/2020", number: 1 },
    { total: 200, date: "26/11/2020", number: 1 },
    { total: 300, date: "27/11/2020", number: 1 },
    ];
    const resultArr = [{ total: 600, date: "25/11/2020", number: 3 },
    { total: 300, date: "26/11/2020", number: 2 },
    { total: 300, date: "27/11/2020", number: 1 },
    ];
    let mergedArr = component.mergeObjectsInUnique(startArr, "date");
    expect(mergedArr).toEqual(resultArr);
  })

});
