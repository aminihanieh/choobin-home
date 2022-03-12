import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() width: number;
  @Input() minWidth: number;
  @Input() maxHeight: number;
  @Input() title: string;
  @Input() closeText: string ;
  @Input() confirmText: string;
  @Input() ActionLayout: string;

  @Input() preventScroll: boolean = true;

  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  @Output() confirm: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
    this.onModalOpen()
  }

  onModalOpen() {
    if (this.preventScroll) {
      document.body.style.overflow = "hidden";
    }
  }

  onModalClose() {
    document.body.style.overflow = "";
    this.close.emit()
  }

  onModalConfirmed() {
    document.body.style.overflow = "";
    this.confirm.emit()
  }

  ngOnDestroy(): void {
    document.body.style.overflow = "";
  }
}
