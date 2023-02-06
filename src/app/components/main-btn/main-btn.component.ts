import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-main-btn',
  templateUrl: './main-btn.component.html',
  styleUrls: ['./main-btn.component.scss'],
})
export class MainBtnComponent implements OnInit {
  @Input() mainBtnInput = ""
  @Output() handleClickMainBtn = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    console.log(this.mainBtnInput);
  }

  handleClick() {
    this.handleClickMainBtn.emit('qwes');
  }
}
