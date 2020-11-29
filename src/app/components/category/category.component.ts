import { FirebaseService } from '@shared/services/firebase.service';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  item$: Observable<any>;
  categories$: Observable<any[]>
  mobile = false;
  selected: string;
  constructor(private route: ActivatedRoute, private router: Router, private _service: FirebaseService, public breakpointObserver: BreakpointObserver) {

  }

  ngOnInit(): void {
    this.categories$ = this._service.getCategories();
    this.route.paramMap.subscribe(params => {
      this.item$ = this._service.getCategory(params.get('id'));
      this.selected = params.get('id');
    });
    this.breakpointObserver
      .observe(['(max-width: 960px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.mobile = true;
        } else {
          this.mobile = false;
        }
      });
  }

  onChange(ev){
    this.router.navigate(['/category',(<HTMLInputElement>ev.target).value ]);
  }

}
