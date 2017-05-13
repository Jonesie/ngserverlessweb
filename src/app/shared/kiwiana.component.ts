import { Component, OnInit } from '@angular/core';

export interface IImage {
  title: string;
  fileName: string;
}

@Component({
  selector: "comp-kiwiana",
  templateUrl: "./kiwiana.component.html",
  styleUrls: ["./kiwiana.component.css"]
})
export class KiwianaComponent implements OnInit {
  currentImage : IImage;

  images: IImage[] = [
    { "title": "Missing Pavalova", "fileName": "kiwi-icon.png" },
    { "title": "Black Gold", "fileName": "vegemite.jpg" },
    { "title": "Heros", "fileName": "FrodoBagginsSamG.jpg" },
    { "title": "Mountains", "fileName": "Mount-Cook.jpg" }
  ];

  ngOnInit() {
    var index = Math.floor((Math.random() * this.images.length));
    this.currentImage = this.images[index];
  }

}
