import { Component } from '@angular/core';
import { IconDotsThree } from '../../../svg/icons/dots.component';
import { UiButtonComponent } from "../ui-button/ui-button.component";
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'ui-dropdown',
	imports: [IconDotsThree, UiButtonComponent, HttpClient],
	templateUrl: './ui-dropdown.component.html',
	styleUrl: './ui-dropdown.component.scss',
})
export class UiDropdownComponent {
	isMenuOpened = false;

  constructor(private http: HttpClient) { }

  toggleMenu() {
    this.isMenuOpened = !this.isMenuOpened;
  }

  clickedOutside() {
    this.isMenuOpened = false;
  }

}
