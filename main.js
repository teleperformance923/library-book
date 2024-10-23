// The array to store book objects
const myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Function to add new books to the library array
function addBookToLibrary(book) {
  myLibrary.push(book);
  displayBooks();
}

// Function to toggle the read status of a book
Book.prototype.toggleRead = function() {
  this.read = !this.read;
};

// Function to display all books in the array on the page
function displayBooks() {
  const bookContainer = document.getElementById('bookContainer');
  bookContainer.innerHTML = ''; // Clear previous display

  myLibrary.forEach((book, index) => {
    // Create a card for each book
    const bookCard = document.createElement('div');
    bookCard.classList.add('card');
    bookCard.dataset.index = index; // Add a data-index attribute to identify the book
    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Status: ${book.read ? 'Read' : 'Not Read'}</p>
      <button class="toggle-read" data-index="${index}">${book.read ? 'Mark as Unread' : 'Mark as Read'}</button>
      <button class="remove-book" data-index="${index}">Remove Book</button>
    `;

    bookContainer.appendChild(bookCard);
  });

  // Add event listeners for the buttons
  document.querySelectorAll('.remove-book').forEach(button => {
    button.addEventListener('click', removeBookFromDOM);  // Updated function
  });

  document.querySelectorAll('.toggle-read').forEach(button => {
    button.addEventListener('click', toggleReadStatus);
  });
}

// Function to remove a book from the DOM
function removeBookFromDOM(e) {
  const index = e.target.getAttribute('data-index'); // Get the index from the data attribute
  const bookCard = e.target.closest('.card'); // Find the closest parent card element
  bookCard.remove(); // Remove the card from the DOM

  myLibrary.splice(index, 1); // Remove the book from the array
}

// Function to toggle the read status of a book
function toggleReadStatus(e) {
  const index = e.target.getAttribute('data-index');
  myLibrary[index].toggleRead();
  displayBooks(); // Refresh the display to update the status
}

// Handle the 'NEW BOOK' button click
document.getElementById('newBookBtn').addEventListener('click', () => {
  const form = document.getElementById('bookForm');
  form.style.display = form.style.display === 'none' ? 'block' : 'none';
});

// Handle the form submission
document.getElementById('newBookForm').addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent form from submitting the traditional way

  // Collect input values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;

  // Create a new book and add it to the library
  const newBook = new Book(title, author, pages, read);
  addBookToLibrary(newBook);

  // Reset the form and hide it
  document.getElementById('newBookForm').reset();
  document.getElementById('bookForm').style.display = 'none';
});

// Manually adding a few books for testing
addBookToLibrary(new Book('The Hobbit', 'J.R.R. Tolkien', 310, true));
addBookToLibrary(new Book('1984', 'George Orwell', 328, false));
