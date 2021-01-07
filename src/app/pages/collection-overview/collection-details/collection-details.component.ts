import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CollectionModel} from '../../../shared/models/collection.model';
import {Api} from '../../../api/api';

@Component({
  selector: 'app-collection-details',
  templateUrl: './collection-details.component.html',
  styleUrls: ['./collection-details.component.scss']
})
export class CollectionDetailsComponent implements OnInit {

  selectedCollection: CollectionModel = null;
  isDataAvailable = false;

  routes = ['Collections'];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(async (params) => {
      const response = await Api.getApi().get('/collection/' + this.route.snapshot.paramMap.get('id'));
      const r = response.data.result;
      this.selectedCollection = new CollectionModel(r.id, r.name, r.type, r.version);
      this.isDataAvailable = true;
      this.routes.push(this.selectedCollection.name);
    });
  }

}
