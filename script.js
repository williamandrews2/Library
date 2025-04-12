// Array holding all the books in the library
const myLibrary = [];

// Main content container
const content = document.querySelector(".content");

// "Add book" button and form
const addbookform = document.querySelector(".addbookform");
const submitButton = document.querySelector("#submit-btn");
const cancelButton = document.querySelector("#cancel-btn");
const form = document.getElementById("bookForm");

// "Add book" popup functions
function openPopup() {
  addbookform.classList.add("open-form");
}

function closePopup() {
  addbookform.classList.remove("open-form");
}

// Book object constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

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
  content.innerHTML = ""; // Clear existing content

  myLibrary.forEach((book, index) => {
    // Create new card element for the book
    const card = document.createElement("div");
    card.className = "card";

    // Information displayed in each card
    const title = document.createElement("h1");
    title.className = "title";

    const author = document.createElement("h3");
    author.className = "author";

    const info = document.createElement("p");
    info.className = "info";

    const removeButton = document.createElement("button");
    removeButton.className = "removeButton";

    let readStatus = document.createElement("input");
    readStatus.className = "readStatus";
    readStatus.type = "checkbox";
    readStatus.name = "name";
    readStatus.className = "readStatus";
    readStatus.checked = book.read === "Read";
    let label = document.createElement("label");
    label.appendChild(document.createTextNode("Read"));

    title.innerHTML = `${book.title}`;
    author.innerHTML = `${book.author}`;
    info.innerHTML = `${book.title}, by ${book.author}, ${book.pages} pages, ${book.read}`;
    removeButton.innerHTML = "Remove";

    // Append elements to card
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(info);
    card.appendChild(label);
    card.appendChild(readStatus);
    card.appendChild(removeButton);

    content.appendChild(card);

    removeButton.addEventListener("click", () => removeBook(index));

    // Add event listener to read status checkbox
    readStatus.addEventListener("change", () =>
      toggleReadStatus(index, readStatus.checked)
    );
  });
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  updateBooks();
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

function handleCancel(event) {
  closePopup();
  event.preventDefault();
}

// Function to toggle the read status of a book
function toggleReadStatus(index, isChecked) {
  myLibrary[index].read = isChecked ? "Read" : "Not read yet";
  updateBooks(); // Update the display
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
form.addEventListener("submit", function (e) {
  if (!form.checkValidity()) {
    e.preventDefault();
    form.reportValidity(); // show native validation messages
  }
  e.preventDefault(); // prevent page reload on submit
  closePopup();
  storeInput();
});

cancelButton.addEventListener("click", handleCancel, false);
