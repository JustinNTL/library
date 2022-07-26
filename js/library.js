const bookContainer = document.querySelector('[book-card-container]');
const addBookBtn = document.querySelector('[add-book]');
const formTitle = document.querySelector('[form-title]');
const formAuthor = document.querySelector('[form-author]');
const formPages = document.querySelector('[form-pages]');
const formLang = document.querySelector('[form-lang]');
const formPub = document.querySelector('[form-pub]');
const formReadStatus = document.querySelector('[form-read-status]');

let myLibrary = [];

class Book {
  constructor(formTitle, formAuthor, formPages, formLang, formPub, formReadStatus) {
    this.formTitle = formTitle.value;
    this.formAuthor = formAuthor.value;
    this.formPages = formPages.value;
    this.formLang = formLang.value;
    this.formPub = formPub.value;
    this.formReadStatus = formReadStatus.value;
  }

  addBook() {
    const convertHtml = (html) => {
      const template = document.createElement('template');
      template.innerHTML = html.trim();
      return template.content.firstElementChild;
    }
    const sanitizeHtml = (str) => {
      const temp = document.createElement('div');
      temp.textContent = str;
      return temp.innerHTML;
    }
    const book_html_template = `
      <div class="book-card">
      <span class="card-remove">+</span>
      <h3 class="book-title">${sanitizeHtml(this.formTitle)}</h3>
      <span class="book-author">
        <span class="book-label">Author:</span>
        ${sanitizeHtml(this.formAuthor)}
      </span>
      <span class="book-pages">
        <span class="book-label">Page Count:</span>
        ${sanitizeHtml(this.formPages)}
      </span>
      <span class="book-language">
        <span class="book-label">Language:</span>
        ${sanitizeHtml(this.formLang)}
      </span>
      <span class="book-publication">
        <span class="book-label">Published:</span>
        ${sanitizeHtml(this.formPub)} 
      </span>
      <span class="read-toggle-label">Mark As Read:</span>
      <label class="toggle-switch">
        <input type="checkbox" ${sanitizeHtml(this.formReadStatus) === 'read' ? 'checked' : 'unchecked'}>
        <span class="toggle-slider"></span>
      </label>
    </div>`;
    bookContainer.append(convertHtml(book_html_template));
    myLibrary.push(convertHtml(book_html_template));

  } 

  delBook() {

  }

  statusBook() {
    //etch a sketch will help here
  }
  
  // possible delete option to keep track of respective cards using data attributes

}

addBookBtn.addEventListener('click', () => {
 const book = new Book(formTitle, formAuthor, formPages, formLang, formPub, formReadStatus);
 myLibrary.push(book)
 book.addBook();
})
