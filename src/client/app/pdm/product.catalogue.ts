import { Component, ViewChild } from '@angular/core';
import { PDMService } from './pdm.service';

import { ModalWindow } from '../shared/windows/modal-window.component';

import { ProductData, VehicleModel } from '../shared/interfaces/index';

import 'rxjs/Rx';

@Component({
  moduleId: module.id,
  selector: 'product-catalog',
  templateUrl: 'product.catalogue.html',
  providers: [PDMService, ModalWindow]
})

export class ProductCatalogue {

  products: ProductData[] = [];

  public submitted = false;
  public searchValue: string = '';
  public productEquivalent: ProductData;
  public vehicleModel: VehicleModel;
  public componentToShow: string;

  @ViewChild(ModalWindow) public modalWindow: ModalWindow;

  constructor(private pdmService: PDMService) {

  }

  // region Public methods

  public search(): void {
    this.getProducts(this.searchValue);
  }


  public onGoogleSearchProduct(productPartNumber: string): void {
    window.open('https://www.google.com/search?q=' + productPartNumber);
  }

  public onShowEquivalents(product: ProductData): void {
    this.productEquivalent = product;
    this.componentToShow = 'equivalent-editor';
    this.modalWindow.show();
  }

  public onSearchByVehicle(): void {
    this.componentToShow = 'application-picker';
    this.modalWindow.show();
  }

  public getVehicleModel(vehicleModel: VehicleModel): void {
    this.vehicleModel = vehicleModel;
    this.modalWindow.close();
  }

  // endregion Public methods

  // region Private methods

  private getProducts(searchValue: string): void {
    this.pdmService.getProducts('getPDMProductsList', searchValue)
      .then(x => {
        this.products = x;
        this.submitted = true;
      }).catch(err => {
        console.log(err);
      });

  }

  // endregion Private methods

}  //ProductCatalogue
