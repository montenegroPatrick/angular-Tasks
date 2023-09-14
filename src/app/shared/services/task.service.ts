import { inject, Injectable, signal, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, tap } from 'rxjs';
import { Task } from 'src/app/core/models/tasks';
import { url } from '../utils/constantes';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { UserService } from './user.service';
import { UsersListComponent } from '../components/users-list/users-list.component';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  http = inject(HttpClient);
  UserService = inject(UserService);
  tasks = signal<Task[]>([]);
  private tasks$: Observable<Task[]> = toObservable(
    this.UserService.selectedUserId
  ).pipe(
    switchMap((userId) =>
      this.http
        .get<Task[]>(`${url}/todos?userId=${userId}`)
        .pipe(tap((tasks) => this.tasks.set(tasks)))
    )
  );

  readOnlyUsertasks = toSignal(this.tasks$, { initialValue: [] as Task[] });

  markAsCompleted(task: Task) {
    this.tasks.mutate(() => (task.completed = true));
  }

  constructor() {}
}
