import { Component } from '@angular/core';
import { ProductsListService } from '../shared/services/products-list.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private prods: any;
  startIndex = 0;
  endIndex = 100;
  
  items: any = [];

  constructor(private readonly prodService: ProductsListService) {
    this.prodService.getProducts().subscribe(prods => {
      this.prods = prods.Items;
      this.loadItems();
    });
  }

  handleRefresh(event: any) {
    // setTimeout(() => {
    //   // Any calls to load data go here
    //   event.target.complete();
    // }, 2000);
  }

  loadItems(event?: any) {
    // this.dataService.getItems(this.startIndex, this.endIndex).then(newItems => {
    //   this.items = this.items.concat(newItems);
    //   this.startIndex = this.endIndex;
    //   this.endIndex += 10;

    //   if (event) {
    //     event.target.complete();
    //   }
    // });
    this.startIndex = this.endIndex;
      this.endIndex += 100;
    this.items = this.items.concat(this.prods.slice(this.startIndex, this.endIndex));
  }

  doInfinite(event: any) {
    this.loadItems(event);
  }
}
