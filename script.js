const myLibrary = [];
const content = document.querySelector(".content");
const addbookform = document.querySelector(".addbookform");
const submitButton = document.querySelector("submit-btn");
const cancelButton = document.querySelector("cancel-btn");

// Animation to open add book form
function openPopup() {
  addbookform.classList.add("open-form");
}

function closePopup() {
  addbookform.classList.remove("open-form");
}

// Constructor for Book objects
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Create a new book and add it to the myLibrary array
function addBookToLibrary(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);

  // Check if newBook is already in the library
  const found = myLibrary.some((book) => book.title === newBook.title);
  if (!found) {
    myLibrary.push(newBook);
  } else {
    alert("This book is already in your Library!");
  }
}

// Display each book on the page (DOM manipulation)
function displayBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    //Create new card element for the book
    const card = document.createElement("div");
    card.className = "card";

    // Information displayed in each card
    const title = document.createElement("h1");
    title.className = "title";

    const author = document.createElement("h3");
    author.className = "author";

    const info = document.createElement("p");
    info.className = "info";

    title.innerHTML = `${myLibrary[i].title}`;
    author.innerHTML = `${myLibrary[i].author}`;
    info.innerHTML = `${myLibrary[i].title}, by ${myLibrary[i].author}, ${myLibrary[i].pages} pages, ${myLibrary[i].read}`;

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(info);

    content.appendChild(card);
  }
}

// Store and send input values to the array
function storeInput() {
  // Retrieve input elements
  const titleInput = document.getElementById("titleInput");
  const authorInput = document.getElementById("authorInput");
  const pagesInput = document.getElementById("pagesInput");
  const readInput = document.getElementById("readInput");

  const titleValue = titleInput.value;
  const authorValue = authorInput.value;
  const pagesValue = pagesInput.value;
  const readValue = readInput.value;

  addBookToLibrary(titleValue, authorValue, pagesValue, readValue);
  displayBooks();
}

// ------------ TESTING SECTION-------------

addBookToLibrary("Book1", "Jack", "234", "not read");
addBookToLibrary("Life Book 2", "Kanye West", "121", "read");
addBookToLibrary("Rose from Concrete", "Lebron James", "98", "not read");

displayBooks();

//-------------------------------------------

// Event listener for taking input data and closing form on click
if (submitButton != null) {
  submitButton.addEventListener("click", () => {
    storeInput();
    closePopup();
    console.log(myLibrary);
  });

  cancelButton.addEventListener("click", () => {
    closePopup();
  });
}
