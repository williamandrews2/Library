function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read; //Unsure if this is how they want it to be. Should it be a boolean?

  this.info = function () {
    return (
      this.title +
      " by " +
      this.author +
      ", " +
      this.pages +
      " pages, " +
      this.read
    );
  };
}

const firstBook = new Book("Harry Potter", "J.K. Rowling", 234, "not read yet");
