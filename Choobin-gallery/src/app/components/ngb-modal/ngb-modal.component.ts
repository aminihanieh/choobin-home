import { Component, Input, Output, EventEmitter, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngb-modal',
  templateUrl: './ngb-modal.component.html',
  styleUrls: ['./ngb-modal.component.scss']
})
export class NgbModalComponent implements AfterViewInit {

  @Input() size: 'sm' | 'lg' | 'xl' = 'lg';
  @Input() title: string;
  @Input() closeText: string;
  @Input() confirmText: string;

  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  @Output() confirm: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('modal') modal: TemplateRef<any>
  private modalRef: NgbModalRef

  constructor(private modalService: NgbModal) { }

    ngAfterViewInit(): void {
    this.open()
  }

  open() {
    this.modalRef = this.modalService.open(this.modal, { size: this.size })
  }


  dismissModal() {
    this.modalRef.dismiss()
    this.close.emit()
  }

  confirmModal() {
    this.modalRef.close()
    this.confirm.emit()

  }

}
