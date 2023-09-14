import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class=" mt-24 mx-24">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {
  title = 'new-angular';
}
