import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-02',
  imports: [],
  templateUrl: './button-02.html',
  styleUrl: './button-02.css',
})
export class Button02 {
  @Input() text! : string;
}