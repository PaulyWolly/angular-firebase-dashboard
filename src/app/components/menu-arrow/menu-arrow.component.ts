import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-arrow',
  templateUrl: './menu-arrow.component.html',
  styleUrls: ['./menu-arrow.component.css']
})
export class MenuArrowComponent {

  showMore: boolean = false;

  constructor() { }

  showResult(){
    this.showMore = true;
  }

  hideResult() {
    this.showMore = false;
  }

}
