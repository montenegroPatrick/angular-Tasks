import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from 'src/app/shared/components/users-list/users-list.component';
import { TasksComponent } from 'src/app/shared/components/tasks/tasks.component';
import { UserService } from 'src/app/shared/services/user.service';
import { TaskService } from '../../shared/services/task.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, UsersListComponent, TasksComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="flex justify-between w-full h-full">
      <app-users-list [users]="users"></app-users-list>
      <app-tasks [tasks]="tasks"></app-tasks>
    </main>
  `,
})
export class HomeComponent {
  userService = inject(UserService);
  taskService = inject(TaskService);

  //récupérer une list de user l'afficher, depuis un signal, cliquer sur un user pour afficher ses tasks équivalente
  users = this.userService.users;
  tasks = this.taskService.tasks;
}
