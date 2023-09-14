import {
  Component,
  Input,
  Signal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { TaskService } from '../../services/task.service';
import { Task } from 'src/app/core/models/tasks';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container class="w-50" *ngIf="tasks().length > 0">
      <h1>Tasks {{ countTaskDone() }} completed</h1>
      <ul class="flex flex-col gap-2 justify-center">
        <li
          class="grid grid-flow-col grid-cols-6 gap-2"
          *ngFor="let task of tasks()"
        >
          <p class=" col-span-4">{{ task.title }}</p>
          <p>{{ task.completed ? 'true' : 'false' }}</p>
          <button
            type="button"
            class="bg-blue-300 col-span-1 px-2 cursor-pointer hover:scale-105 rounded-xl text-white  "
            *ngIf="!task.completed"
            (click)="taskService.markAsCompleted(task)"
          >
            mark as complete
          </button>
        </li>
      </ul>
    </ng-container>
  `,
})
export class TasksComponent {
  userService = inject(UserService);
  taskService = inject(TaskService);
  @Input() tasks!: Signal<Task[]>;
  countTaskDone = computed(
    () => this.tasks().filter((task) => task.completed).length
  );
}
