import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, switchMap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProductsListService {
    constructor(private readonly httpClient: HttpClient) {

    }

    getProducts(): Observable<any> {
        return this.httpClient.get('https://monitorulpreturilor.info/pmonsvc/Retail/GetProductCategoriesNetwork?').pipe(switchMap((dt: any) => {
            const uniqueNames = Array.from(new Set(dt.Items.map((item: any) => item.id)));
            return this.httpClient.get(`https://monitorulpreturilor.info/pmonsvc/Retail/GetCatalogProductsByNameNetwork?CSVcategids=${uniqueNames.join(',')}`).pipe(map(prods => {
                return prods
            }));
        }));

    }
}