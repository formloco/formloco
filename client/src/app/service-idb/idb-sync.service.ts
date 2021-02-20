import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { IdbPersistenceService } from './idb-persistence.service';

@Injectable({
  providedIn: 'root'
})
export class IdbSyncService {

  constructor(private idbPersistenceService: IdbPersistenceService) { }
  
  private formLocoDB;

  clearIdb(store): Observable<void> {
    return this.idbPersistenceService.clear(store);
  }

  createIdb(store, obj): Observable<void> {
    return this.idbPersistenceService.put(store, obj);
  }

  deleteIdb(store, obj): Observable<void> {
    return this.idbPersistenceService.put(store, obj);
  }

  syncForm(store, obj): Observable<void> {
    return this.idbPersistenceService.put(store, obj);
  }

  syncData(store, obj): Observable<void> {
    return this.idbPersistenceService.put(store, obj);
  }

  update(store, obj): Observable<void> {
    return this.idbPersistenceService.put(store, obj);
  }

  read(store, key): Observable<void> {
    return this.idbPersistenceService.read(store, key);
  }

  readAll(store): Observable<void> {
    return this.idbPersistenceService.readAll(store);
  }

}