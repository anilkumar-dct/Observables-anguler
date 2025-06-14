import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  //observable using property
  interval$ = interval(100000000);
  intervalSignal = toSignal(this.interval$);
  ngOnInit(): void {
    //below is observable that generates values every 1 second
    // const source = interval(1000)
    //   .pipe(map((x) => x + 1))
    //   .subscribe(() => console.log('Tick')); //adding map operator to get the understanding that we can use operator with observables
    // this.destroyRef.onDestroy(() => {
    //   source.unsubscribe();
    // });
    //Use case of observable
    const source = this.interval$
      .pipe(map((x) => x + 1))
      .subscribe(() => console.log('Tick')); //adding map operator to get the understanding that we can use operator with observables
    this.destroyRef.onDestroy(() => {
      source.unsubscribe();
    });
  }
}
//to convert signal to observable use toSignal and for observable to signal use toObservable
