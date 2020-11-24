import { map } from 'rxjs/operators';
import { FirebaseService } from './../../services/firebase.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  unfiltered$: Observable<any>;
  products$: Observable<any>;
  query: string;

  constructor(private route: ActivatedRoute, private databse: FirebaseService) { }

  ngOnInit(): void {
    this.query = this.route.snapshot.paramMap.get('query');
    this.unfiltered$ = this.databse.searchProducts(this.query);
    this.products$ = this.getProductByName(this.query);
  }

  getProductByName(query: String) {
    return this.unfiltered$.pipe(
      map(items => {
        return items.filter(item => item.name.toLowerCase().indexOf(query) > -1)
      })
    )
  }

}

