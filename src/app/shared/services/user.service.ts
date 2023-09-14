import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { url } from '../utils/constantes';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}
  //créer appel to the api

  http = inject(HttpClient);

  users$: Observable<User[]> = this.http.get<User[]>(`${url}/users`);
  users = toSignal(this.users$, { initialValue: [] as User[] });

  selectedUserId: WritableSignal<number> = signal(0);
}
