import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { CachingService } from './caching.service';
import { Network } from '@capacitor/network';
import { ToastController } from '@ionic/angular';
import { Observable, delay, from, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  connected = true;

  constructor(
    private http: HttpClient,
    private cachingService: CachingService,
    private toastController: ToastController
  ) {
    Network.addListener('networkStatusChange', async (status) => {
      this.connected = status.connected;
    });
  }

  // https://app.exchangerate-api.com/
  getRates(currencyCode: string, forceRefresh = false): Observable<any> {
    const url = `https://v6.exchangerate-api.com/v6/${environment.exchangeRateAPIKey}/latest/${currencyCode}`;

    if (!this.connected) {
      this.toastController
        .create({
          message: 'You are viewing offline data.',
          duration: 2000,
        })
        .then((toast) => {
          toast.present();
        });
      return from(this.cachingService.getCachedRequest(url));
    }

    if (forceRefresh) {
      return this.callAndCache(url);
    } else {
      const storedValue = from(this.cachingService.getCachedRequest(url));
      return storedValue.pipe(
        switchMap((result) => {
          if (!result) {
            return this.callAndCache(url);
          } else {
            return of(result);
          }
        })
      );
    }
  }

  private callAndCache(url: string): Observable<any> {
    return this.http.get(url).pipe(
      tap((res) => {
        this.cachingService.cacheRequest(url, res);
      })
    );
  }
}
