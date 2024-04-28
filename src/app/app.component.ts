import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public index = 0;

  public tempTitle = '';
  public tempDesc = '';
  public tempAuthor = '';
  rating: number=0;
  numRatings:number=0;
  public completionMessage: string = '';
  public isRatingCompleted: boolean = false;

  public BookCollection = [
    {
      number: 'Книга номер: 1',
      title: 'Червеният дракон',
      desc: '',
      author: 'Томас Харис',
      rating:0,
      numRatings: 0
    },
    {
      number: 'Книга номер: 2',
      title: 'Да убиеш пресмехулник',
      desc: '',
      author: 'Харпър Лий',
      rating:0,
      numRatings: 0
    },
    {
      number: 'Книга номер: 3',
      title: 'Мълчанието на агнетата',
      desc: '',
      author: 'Томас Харис',
      rating:0,
      numRatings: 0
    },
    {
      number: 'Книга номер: 4',
      title: '',
      desc: '',
      author: '',
      rating:0,
      numRatings: 0
    },
  ];

  public processPrevBook() {
    if (this.index > 0) {
      this.index--;
      this.rating = this.BookCollection[this.index].rating;
      this.resetTempData();
    }
  }
  public processNextBook() {
    if (this.index < this.BookCollection.length - 1) {
      this.index++;
      this.rating = this.BookCollection[this.index].rating;
      this.resetTempData();
    }
  }
  
  public processInputBookTitle(input) {
    this.tempTitle = input.target.value;
  }

  public processInputBookDesc(input) {
    this.tempDesc = input.target.value;
  }

  public processInputBookAuthor(input) {
    this.tempAuthor = input.target.value;
  }

  public processSaveBookData() {
    this.BookCollection[this.index].title = this.tempTitle;
    this.BookCollection[this.index].desc = this.tempDesc;
    this.BookCollection[this.index].author = this.tempAuthor;
    this.resetTempData();

    const titleInput = document.querySelector(
      'input[type="text"][placeholder="Заглавие на книгата"]'
    ) as HTMLInputElement;
    const descInput = document.querySelector(
      'input[type="text"][placeholder="Описание на книгата"]'
    ) as HTMLInputElement;
    const authorInput = document.querySelector(
      'input[type="text"][placeholder="Автор на книгата"]'
    ) as HTMLInputElement;
    if (titleInput && descInput && authorInput) {
      titleInput.value = '';
      descInput.value = '';
      authorInput.value = '';
    }
  }
  private resetTempData() {
    this.tempTitle = '';
    this.tempDesc = '';
    this.tempAuthor = '';
  }
  public rateAgain() {
    this.index = 0;
    this.rating = this.BookCollection[this.index].rating || 0;
  }
  public AllDone() {
    this.completionMessage = 'Оценяването е завършено успешно!';
    this.isRatingCompleted = true;
  }

  public rateBook(rating: number) {
    const currentBook = this.BookCollection[this.index];
    let currentRating = currentBook.rating;
    let totalRating = currentRating * currentBook.numRatings;
    let totalCount = currentBook.numRatings;

    totalRating += rating;
    totalCount++;

    const newRating = totalRating / totalCount;
    currentBook.rating = newRating;
    currentBook.numRatings = totalCount;

    this.rating = currentBook.rating; 
    this.processNextBook()
  
  }
  
}
