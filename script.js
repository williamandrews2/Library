const myLibrary = [];
const content = document.querySelector(".content");
const addbookform = document.querySelector(".addbookform");
const submitButton = document.querySelector("#submit-btn");
const cancelButton = document.querySelector("#cancel-btn");
const form = document.getElementById("myForm");

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
    updateBooks();
  } else {
    alert("This book is already in your Library!");
  }
}

function updateBooks() {
  let i = myLibrary.length - 1;
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

  let readStatus = document.createElement("input");
  readStatus.className = "readStatus";
  readStatus.type = "checkbox";
  readStatus.name = "name";
  readStatus.id = "readStatus";
  let label = document.createElement("label");
  label.appendChild(document.createTextNode("Read"));

  title.innerHTML = `${myLibrary[i].title}`;
  author.innerHTML = `${myLibrary[i].author}`;
  info.innerHTML = `${myLibrary[i].title}, by ${myLibrary[i].author}, ${myLibrary[i].pages} pages, ${myLibrary[i].read}`;

  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(info);
  card.appendChild(label);
  card.appendChild(readStatus);

  content.appendChild(card);
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
}

function handleSubmit(event) {
  closePopup();
  storeInput();
  event.preventDefault();
}

function handleCancel(event) {
  closePopup();
  event.preventDefault();
}

// Function to toggle the read status of a book.
function toggleReadStatus(value, position) {
  if (value === "Not read yet") {
    console.log(1);
    myLibrary[position].read = "Read";
  } else {
    console.log(2);
    myLibrary[position].read = "Not read yet";
  }
}

// ------------ TESTING SECTION (sample books) -------------

addBookToLibrary(
  "The 48 Laws of Power",
  "Robert Greene",
  "480",
  "Not read yet"
);
addBookToLibrary(
  "How to Win Friends & Influence People",
  "Dale Carnegie",
  "320",
  "Not read yet"
);
addBookToLibrary("The Lean Startup", "Eric Ries", "336", "Read");

//----------------------------------------------------------

// Event listeners
submitButton.addEventListener("click", handleSubmit, false);
cancelButton.addEventListener("click", handleCancel, false);

const readToggle = document.getElementsByClassName("readStatus");

// Add event listener to all new read buttons
for (let i = 0; i < readToggle.length; i++) {
  readToggle[i].addEventListener("click", () => {
    toggleReadStatus(myLibrary[i].read, i);
  });
}
