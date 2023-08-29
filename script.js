const add_book = document.querySelector(".add_book");
const form = document.querySelector(".book_form");
const cancel = document.querySelector(".cancelBtn");
const add = document.querySelector(".add");
const deleteBtn = document.querySelector("delete");
const mainContent = document.querySelector('main');

const myLibrary = [];

function book(book_name, author_name, no_of_pages, read) {
  this.book_name = book_name
  this.author_name = author_name
  this.no_of_pages = no_of_pages
  this.read = read;
}

function addBook() {
  const bookName = document.getElementById("name").value;
  const authorName = document.getElementById("author").value;
  const noOfPages = parseInt(document.getElementById("pages").value);
  const readStatus = document.getElementById("read_status").checked;

  const newBook = new book(bookName, authorName, noOfPages, readStatus);
  addBookToLibrary(newBook);
  showBooks();
  console.log("book added");

  document.getElementById("name").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("read_status").checked = false;
}

function showBooks() {
  const bookDetailsContainer = document.querySelector(".book_details");
  bookDetailsContainer.innerHTML = ""; // Clear existing content

  for (let i = 0; i < myLibrary.length; i++){
    const book = myLibrary[i];
    const bookContainer = document.createElement("div");
    bookContainer.className = "book";
    bookContainer.dataset.index = i; 

    const bookNameDiv = document.createElement("div");
    bookNameDiv.className = "book_name";
    bookNameDiv.textContent = book.book_name;

    const authorDiv = document.createElement("div");
    authorDiv.className = "author";
    authorDiv.textContent = book.author_name;

    const pagesDiv = document.createElement("div");
    pagesDiv.textContent = "pages : " + book.no_of_pages;

    const buttonsDiv = document.createElement("div");
    buttonsDiv.className = "buttons";

    const readButton = document.createElement("button");
    readButton.className = "read";
    readButton.textContent = book.read ? "Read" : "Not Read";
    readButton.style.backgroundColor = book.read ? "#1be35a":"#5290f2" ;
    readButton.addEventListener("click", () => {
      if (readButton.textContent === "Read") {
        readButton.textContent = "Not Read"
        readButton.style.backgroundColor =  "#5290f2";
      }
      else {
        readButton.textContent = "Read"
        readButton.style.backgroundColor = "#1be35a";
      }
    })
    

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", deleteBook);

    buttonsDiv.appendChild(readButton);
    buttonsDiv.appendChild(deleteButton);

    bookContainer.appendChild(bookNameDiv);
    bookContainer.appendChild(authorDiv);
    bookContainer.appendChild(pagesDiv);
    bookContainer.appendChild(buttonsDiv);

    bookDetailsContainer.appendChild(bookContainer);
  }
}


function addBookToLibrary(book) {
  myLibrary.push(book)
}

function showDialog() {
  overLay.showModal();
}

function closeDialog() {
  overLay.close();
}

add_book.addEventListener("click", () => {
  mainContent.classList.add('blur-background');
  showDialog();
})

cancel.addEventListener("click", () => {
  document.getElementById("name").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("read_status").checked = false;
  closeDialog();
  mainContent.classList.remove('blur-background');
});


form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
  event.preventDefault();

  }
  else {
    addBook();
    closeDialog();
    mainContent.classList.remove('blur-background');
  }
});

form.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent the default Enter key behavior
  }
});


function deleteBook(event) {
  const bookContainer = event.target.parentElement.parentElement; 
  const bookIndex = parseInt(bookContainer.dataset.index);
  myLibrary.splice(bookIndex, 1);
  updateIndexes(); 
  showBooks();
}

function updateIndexes() {
  const bookContainers = document.querySelectorAll(".book");
  bookContainers.forEach((container, index) => {
    container.dataset.index = index;
  });
}


