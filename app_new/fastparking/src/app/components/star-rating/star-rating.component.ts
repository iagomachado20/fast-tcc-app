import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
})
export class StarRatingComponent implements OnInit {

  @Input() rating = 0;
  counter =  Array(5).fill(1).map((x, i) => i + 1);

  constructor() { }

  ngOnInit() {
  }

  checkIsStarFill(counter: number) {

    return this.rating < counter ? 'star-outline' : 'star';

  }

}
