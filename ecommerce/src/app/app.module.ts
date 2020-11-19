import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppContentComponent } from './app-content/app-content.component';
import { AppFooterComponent } from './app-footer/app-footer.component';

import { GlobalsService } from './globals.service';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

const appRoutes: Routes = [
  { path: 'search/:sq', component: SearchResultsComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppContentComponent,
    AppFooterComponent,
    HomeComponent,
    SearchResultsComponent,
    LoaderComponent,
    ProductDetailComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [GlobalsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
