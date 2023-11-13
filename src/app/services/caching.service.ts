import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

@Injectable({
  providedIn: 'root',
})
export class CachingService {
  private readonly TTL = 60 * 60;
  private readonly CACHE_KEY_BASE = '_tb-cache_';

  constructor(private storage: Storage) {}

  async initStorage() {
    await this.storage.defineDriver(CordovaSQLiteDriver);
    await this.storage.create();
  }

  cacheRequest(key: string, data: any): Promise<any> {
    const validUntil = new Date().getTime() + this.TTL * 1000;
    key = `${this.CACHE_KEY_BASE}${key}`;
    return this.storage.set(key, { validUntil, data });
  }

  async getCachedRequest(key: string): Promise<any> {
    const currentTime = new Date().getTime();
    key = `${this.CACHE_KEY_BASE}${key}`;

    const storedValue = await this.storage.get(key);

    if (!storedValue) {
      return null;
    } else if (storedValue.validUntil < currentTime) {
      await this.storage.remove(key);
      return null;
    } else {
      return storedValue.data;
    }
  }

  async clearCachedData() {
    const keys = await this.storage.keys();

    keys.map(async (key) => {
      if (key.startsWith(this.CACHE_KEY_BASE)) {
        await this.storage.remove(key);
      }
    });
  }

  async invalidateCacheEntry(key: string) {
    key = `${this.CACHE_KEY_BASE}${key}`;
    await this.storage.remove(key);
  }
}
