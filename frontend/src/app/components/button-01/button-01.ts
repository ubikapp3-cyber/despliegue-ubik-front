import { Component, Input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { text } from 'node:stream/consumers';

@Component({
  selector: 'app-button-01',
  imports: [RouterLink],
  templateUrl: './button-01.html',
  styleUrl: './button-01.css',
})
export class Button01 {
  @Input() text! : string;
}
