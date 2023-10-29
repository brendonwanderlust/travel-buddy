import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, provideFirebaseApp(() => initializeApp({"projectId":"travel-buddy-ionic-app","appId":"1:212457633291:web:5bdb77ade1a078f550390e","storageBucket":"travel-buddy-ionic-app.appspot.com","apiKey":"AIzaSyCI6QMsHj2odfPSkvAdx5Aw63Vp5_McL-M","authDomain":"travel-buddy-ionic-app.firebaseapp.com","messagingSenderId":"212457633291","measurementId":"G-YQNLFFQDFY"})), provideAuth(() => getAuth()), provideAnalytics(() => getAnalytics()), provideFirestore(() => getFirestore()), provideFunctions(() => getFunctions())],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, ScreenTrackingService, UserTrackingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
