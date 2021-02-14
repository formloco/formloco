import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { IdbPersistenceService } from './idb-persistence.service';

@Injectable({
  providedIn: 'root'
})
export class IdbCrudService {

  constructor(private idbPersistenceService: IdbPersistenceService) { }

  private formLocoDB;

  add(store, obj): Observable<void> {
    return this.idbPersistenceService.put(store, obj);
  }

  put(store, obj): Observable<void> {
    return this.idbPersistenceService.put(store, obj);
  }

  read(store, key): Observable<void> {
    return this.idbPersistenceService.read(store, key);
  }

  readAll(store): Observable<void> {
    return this.idbPersistenceService.readAll(store);
  }

  delete(store, key): Observable<void> {
    return this.idbPersistenceService.delete(store, key);
  }

  clear(store): Observable<void> {
    return this.idbPersistenceService.clear(store);
  }

}
