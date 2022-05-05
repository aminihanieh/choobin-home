import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import gsap from 'gsap';
import { data } from './const/data';


@Component({
  selector: 'testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent implements OnInit {

  data: Testimonial[] = data;

  // data: ViewModel;
  @ViewChild('parent') parent: any;

  ngOnInit(): void {
  }

  @ViewChild('Carousel', { static: true }) carousel: ElementRef<HTMLDivElement>;


  baseZIndex = 50;
  scaleRatio = 10;
  middleIndex: number;
  midElementIndex: number = 1;
  isAnimating: boolean = false;
  prevSlideIsFinished: boolean = false;

  get noMoreElement(): boolean {
    return (this.carousel.nativeElement.children[this.middleIndex + 1] === undefined);
  }

  ngAfterViewInit(): void {
    this.initCarousel()
  }

  initCarousel() {
    if (this.carouselExists()) {
      this.middleIndex = Math.ceil(this.carousel.nativeElement.childNodes.length / 2)
      this.positionCarouselElements();
    }
  }

  private carouselExists() {
    return this.carousel && this.carousel.nativeElement;
  }


  private positionCarouselElements() {
    this.positionCarouselChildren();
    this.positionCarouselMidElement();
    this.positionLeftNodes();
    this.positionRightNodes();
  }

  private positionCarouselChildren() {
    gsap.to(this.carousel.nativeElement.children, {
      duration: 0,
      top: '40%',
      left: '50%',
      transform: `translate(-50%, -50%)`,
    });
  }

  private positionCarouselMidElement() {
    const midElement: Element = this.carousel.nativeElement.children[this.middleIndex - 1];

    gsap.to(midElement, {
      duration: 0,
      zIndex: this.baseZIndex,
    });
  }


  private positionLeftNodes() {
    let countingForwards = 0
    let nodeZIndex = 0

    for (let i = this.middleIndex - 1; i >= 0; i--) {
      nodeZIndex -= 1;
      countingForwards++
      const leftNode = this.carousel.nativeElement.children[i - 1] as HTMLDivElement;;

      gsap.to(leftNode, {
        duration: 0,
        zIndex: nodeZIndex,
        x: -(220 * countingForwards),
        scale: `0.${this.scaleRatio - countingForwards}`
      });
    }
  }



  private positionRightNodes() {
    const carouselLenth = this.carousel.nativeElement.children.length;
    let countingForwards = 0
    let nodeZIndex = this.baseZIndex

    for (let i = this.middleIndex; i < carouselLenth; i++) {
      countingForwards++
      nodeZIndex -= 1;
      const rightNode = this.carousel.nativeElement.children[i] as HTMLDivElement;
      gsap.to(rightNode, {
        duration: 0,
        zIndex: nodeZIndex,
        x: 220 * countingForwards,
        scale: `0.${this.scaleRatio - countingForwards}`
      });
    }
  }



  next() {
    this.midElementIndex--

    this.isAnimating = true;
    this.prevSlideIsFinished = false;

    if (this.middleIndex >= 0) {
      this.moveLeftSideAlongWithMainElement()
      this.moveRemainingRightSide()
    }
  }

  // styleMidELement() {
  //   gsap.to('.midElement', {
  //     duration: 0.3,
  //     backgroundColor: '#342c24',
  //     filter: 'none'
  //   })
  //   gsap.to('.midElement i', {
  //     duration: 0.3,
  //     color: 'red'
  //   })

  // }


  moveLeftSideAlongWithMainElement() {
    for (let i = 0; i <= this.middleIndex; i++) {
      const element = this.carousel.nativeElement.children[i] as HTMLDivElement;
      const prevElement = this.carousel.nativeElement.children[i - 1] as HTMLDivElement;

      const currentTranslateXValue = gsap.getProperty(element, 'translateX');
      const currentZIndex = gsap.getProperty(element, 'zIndex');
      const currentScale = gsap.getProperty(element, 'scale');

      currentZIndex === this.baseZIndex
        ? this.moveElementsToTheRight(element, currentZIndex, prevElement, i)
        : this.changeZIndexToBase(element, +currentZIndex, +currentTranslateXValue, +currentScale);
    }

  }


  private changeZIndexToBase(element: HTMLDivElement, currentZIndex: number, currentTranslateXValue: number, currentScale: number) {
    gsap.to(element, {
      duration: 0.3,
      zIndex: currentZIndex + 1,
      x: currentTranslateXValue + 220,
      scale: parseFloat((currentScale + 0.1).toFixed(1)),
    });
  }

  private moveElementsToTheRight(element: HTMLDivElement, currentZIndex: number, prevElement: HTMLDivElement, i: number) {
    this.moveElementToRightAndDecreaseZIndex(element, currentZIndex);
    this.updatePreviousElementZIndexToBase(prevElement);
    this.middleIndex = i;
  }

  private updatePreviousElementZIndexToBase(prevElement: HTMLDivElement) {
    gsap.to(prevElement, {
      duration: 0.3,
      zIndex: this.baseZIndex
    });
  }

  private moveElementToRightAndDecreaseZIndex(element: HTMLDivElement, currentZIndex: number) {
    gsap.to(element, {
      duration: 0.3,
      zIndex: currentZIndex - 1,
      x: 220,
      scale: '0.9'
    });
  }

  private moveRemainingRightSide() {
    const length = this.carousel.nativeElement.children.length;

    for (let i = this.middleIndex; i < length; i++) {
      const element = this.carousel.nativeElement.children[i] as HTMLDivElement;
      this.moveElementToTheRight(element);
    }
  }

  private moveElementToTheRight(element: HTMLDivElement) {
    const currentTranslateXValue = gsap.getProperty(element, 'translateX');
    const currentZIndex = gsap.getProperty(element, 'zIndex');
    const currentScale = gsap.getProperty(element, 'scale');

    gsap.to(element, {
      duration: 0.3,
      zIndex: +currentZIndex - 1,
      x: +currentTranslateXValue + 220,
      scale: parseFloat((+currentScale - 0.1).toFixed(1)),
      onComplete: () => { this.isAnimating = false; }
    });
  }

  prev() {
    this.isAnimating = true;
    this.midElementIndex++
    this.moveLeftSideAlongWithMainElementPrev()
    this.moveRemainingRightSidePrev()
  }

  private moveLeftSideAlongWithMainElementPrev() {
    for (let i = this.middleIndex; i >= 0; i--) {
      const element = this.carousel.nativeElement.children[i] as HTMLDivElement;
      const nextElement = this.carousel.nativeElement.children[i + 1] as HTMLDivElement;

      const currentTranslateXValue = gsap.getProperty(element, 'translateX');
      const currentZIndex = gsap.getProperty(element, 'zIndex');
      const currentScale: number = +gsap.getProperty(element, 'scale');

      currentZIndex === this.baseZIndex
        ? this.moveElementsToTheLeft(element, +currentTranslateXValue, currentScale, nextElement, i)
        : this.moveAllRemainingElementToTheLeft(element, +currentZIndex, +currentTranslateXValue, currentScale)
    }
  }

  private moveElementsToTheLeft(element: HTMLDivElement, currentTranslateXValue: number, currentScale: number, nextElement: HTMLDivElement, i: number) {
    this.moveTheMainELementToTheLeft(element, +currentTranslateXValue, currentScale);
    this.updateNextElementZIndexToBeMain(nextElement, currentTranslateXValue, currentScale);
    this.middleIndex = i + 1;
  }

  private moveAllRemainingElementToTheLeft(element: HTMLDivElement, currentZIndex: number, currentTranslateXValue: number, currentScale: number) {
    gsap.to(element, {
      duration: 0.3,
      zIndex: currentZIndex - 1,
      x: currentTranslateXValue - 220,
      scale: parseFloat((currentScale - 0.1).toFixed(1)),
      onComplete: () => {
        this.isAnimating = false;
        this.prevSlideIsFinished = this.noMoreElement ? true : false;
      }
    });
  }

  private updateNextElementZIndexToBeMain(nextElement: HTMLDivElement, currentTranslateXValue: number, currentScale: number) {
    gsap.to(nextElement, {
      duration: 0.3,
      zIndex: this.baseZIndex,
      x: currentTranslateXValue,
      scale: parseFloat((currentScale.toFixed(1))),
    });
  }

  private moveTheMainELementToTheLeft(element: HTMLDivElement, currentTranslateXValue: number, currentScale: number) {
    gsap.to(element, {
      duration: 0.3,
      zIndex: -1,
      x: currentTranslateXValue - 220,
      scale: parseFloat((currentScale - 0.1).toFixed(1)),
    });
  }

  private moveRemainingRightSidePrev() {
    const length = this.carousel.nativeElement.children.length;
    for (let i = this.middleIndex + 1; i < length; i++) {
      this.moveElementToTheRightSide(i);
    }
  }

  private moveElementToTheRightSide(i: number) {
    const element = this.carousel.nativeElement.children[i] as HTMLDivElement;
    const currentTranslateXValue = gsap.getProperty(element, 'translateX');
    const currentZIndex = gsap.getProperty(element, 'zIndex');
    const currentScale = gsap.getProperty(element, 'scale');

    gsap.to(element, {
      duration: 0.3,
      zIndex: +currentZIndex + 1,
      x: +currentTranslateXValue - 220,
      scale: parseFloat((+currentScale + 0.1).toFixed(1)),
    });
  }

}
