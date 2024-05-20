import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbMenuModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { EffectsModule } from "@ngrx/effects";
import { GraphQLModule } from './graphql.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        NbThemeModule.forRoot({ name: 'default' }),
        NbLayoutModule,
        NbEvaIconsModule,
        AppRoutingModule,
        HttpClientModule,
        StoreModule.forRoot({}, {}),
        EffectsModule.forRoot([]),
        GraphQLModule,
        NbMenuModule.forRoot()
    ],
    providers: [
        HttpClient
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
