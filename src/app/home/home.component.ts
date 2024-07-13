import { trigger, transition, style, animate } from "@angular/animations";
import { Component, HostListener } from "@angular/core";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class HomeComponent {
  goUp(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  isButtonVisible: boolean = false;
  scrolledDown: boolean = false;

  @HostListener('window:scroll',[])
  onScroll(): void {
    this.isButtonVisible = window.scrollY > 100;
    this.scrolledDown = window.scrollX > 100;
  }
  

}
