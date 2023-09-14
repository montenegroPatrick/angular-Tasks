import {
  Component,
  HostListener,
  Input,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Signal } from '@angular/core';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      class="w-full flex flex-col justify-center p-4 border-2 border-black/10 rounded-xl bg-slate-100"
    >
      <h1>List of Users</h1>
      <ul class="flex flex-col gap-2">
        <li
          class="cursor-pointer text-left p-1 border-2 border-black/10 border-dashed hover:scale-105 hover:bg-blue-300"
          *ngFor="let user of users()"
          [ngClass]="{
            'bg-blue-300': userService.selectedUserId() === user.id
          }"
          (click)="setSelectedUserId(user.id)"
        >
          {{ user.name }}
        </li>
      </ul>
    </section>
  `,
})
export class UsersListComponent {
  userService = inject(UserService);
  @Input() users!: Signal<User[]>;
  selectedUserId!: number;
  setSelectedUserId(id: number) {
    this.userService.selectedUserId.set(id);
  }
}
