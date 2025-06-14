import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  ngOnInit(): void {
    //below is observable that generates values every 1 second
    const source = interval(1000).subscribe(() => console.log('Tick'));
    this.destroyRef.onDestroy(() => {
      source.unsubscribe();
    });
  }
}
