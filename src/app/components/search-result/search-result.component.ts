import { map } from 'rxjs/operators';
import { FirebaseService } from '@shared/services/firebase.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent {
  unfiltered$: Observable<any>;
  products$: Observable<any>;
  query: string;

  constructor(private route: ActivatedRoute, private databse: FirebaseService) { 
    this.route.params.subscribe((value ) => {
      this.query = value.query;
      this.unfiltered$ = this.databse.getProducts();
      this.products$ = this.getProductByName(this.query);
    })
  }

  getProductByName(query: String) {
    return this.unfiltered$.pipe(
      map(items => {
        return items.filter(item => item.name.toLowerCase().indexOf(query) > -1)
      })
    )
  }

}

