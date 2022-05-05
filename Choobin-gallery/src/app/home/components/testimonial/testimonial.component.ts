import { Component, OnInit, ViewChild } from '@angular/core';
import { data } from './const/data';


@Component({
  selector: 'testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent implements OnInit {

  data: Testimonial[] = data;
  midElementIndex: number = 1;
  rightElementIndex: number = 2;
  leftElementIndex: number = 0;


  ngOnInit(): void {
    this.startTimer()
  }


  startTimer() {
    setInterval(() => {
      this.next()
    }, 7000)
  }

  next() {
    const currentMidIndex = this.midElementIndex

    this.rightElementIndex = currentMidIndex;
    this.leftElementIndex = currentMidIndex === 2 ? 0 : currentMidIndex + 1;
    this.midElementIndex = currentMidIndex === 0 ? 2 : currentMidIndex - 1;
  }

  putItCenter(selectedItemIndex: number) {
    this.midElementIndex = selectedItemIndex;
    this.leftElementIndex = selectedItemIndex === 0 ? 2 : selectedItemIndex - 1;
    this.rightElementIndex = selectedItemIndex === 2 ? 0 : selectedItemIndex + 1;
  }





}
