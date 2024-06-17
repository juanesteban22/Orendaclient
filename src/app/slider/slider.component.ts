import { Component ,OnInit} from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  currentSlide: number = 0;
  imagesLoaded: boolean[] = [];

  ngOnInit() {
    this.preloadImages();
    this.startAutoSlide();
  }

  preloadImages() {
    const images = document.querySelectorAll('.carousel-item img');
    images.forEach((img, index) => {
      const image = new Image();
      image.src = img.getAttribute('src') || '';
      image.onload = () => {
        this.imagesLoaded[index] = true;
      };
    });
  }

  startAutoSlide() {
    setInterval(() => {
      this.nextSlide();
    }, 3000); // Cambia cada 3 segundos
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % document.querySelectorAll('.carousel-item').length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + document.querySelectorAll('.carousel-item').length) % document.querySelectorAll('.carousel-item').length;
  }
}
