const bookContainer = document.querySelector('[book-card-container]');
const addBookBtn = document.querySelector('[add-book]');
const formTitle = document.querySelector('[form-title]');
const formAuthor = document.querySelector('[form-author]');
const formPages = document.querySelector('[form-pages]');
const formLang = document.querySelector('[form-lang]');
const formPub = document.querySelector('[form-pub]');
const formReadStatus = document.querySelector('[form-read-status]');

let myLibrary = [{}];

class Library {
  constructor(formTitle, formAuthor, formPages, formLanguage, formPublication, formReadStatus) {
    this.formTitle = title;
    this.formAuthor = author;
    this.formPages = pages;
    this.formLanguage = language;
    this.formPublication = publication;
    this.formReadStatus = bstatus;
  }
  //next course of action, grab form values and push into array (this goes before the html conversion and template), create loop to go through 
  //the array to display (doesn't really seem necessary when it all dissappears on refresh) this push/pop/splice forgot which one for del, similar
  //to calculator
  addBook() {
    const convertHtml = (html) => {
      const template = document.createElement('template');
      template.innerHTML = html.trim();
      return template.content.firstElementChild;
    }
    const sanitizeHTML = (str) => {
      const temp = document.createElement('div');
      temp.textContent = str;
      return temp.innerHTML;
    }
    const book_html_template = `
      <div class="book-card">
      <span class="card-remove">+</span>
      <h3 class="book-title">${sanitizeHtml(this.title)}</h3>
      <span class="book-author">
        <span class="book-label">Author:</span>
        ${sanitizeHtml(this.author)}
      </span>
      <span class="book-pages">
        <span class="book-label">Page Count:</span>
        ${sanitizeHtml(this.pages)}
      </span>
      <span class="book-language">
        <span class="book-label">Language:</span>
        ${sanitizeHtml(this.language)}
      </span>
      <span class="book-publication">
        <span class="book-label">Published:</span>
        ${sanitizeHtml(this.publication)} 
      </span>
      <span class="read-toggle-label">Mark As Read:</span>
      <label class="toggle-switch">
        <input type="checkbox" ${sanitizeHtml(this.bstatus) === 'read' ? 'checked' : 'unchecked'}>
        <span class="toggle-slider"></span>
      </label>
    </div>`;
    bookContainer.append(convertHtml(book_html_template));
  } //may not need to sanitize the publication and bstatus above here ^^^

  delBook() {

  }

  statusBook() {
    //etch a sketch will help here
  }

  
  // possible delete option to keep track of respective cards using data attributes

}

const library = new Library(formTitle, formAuthor, formPages, formLanguage, formPublication, formReadStatus);

addBookBtn.addEventListener('click', () => Library.addBook())


/* this works in adding the template, use this as a foundation for the class.
function addBook() {
  const htmlConversion = (html) => {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstElementChild;
  }
  const sanitizeHTML = (str) => {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
  }
  const book_html_template = `
  <div class="book-card">
    <span class="card-remove">+</span>
    <h3 class="book-title"></h3>
    <span class="book-author">
      <span class="book-label">Author:</span>
      
    </span>
    <span class="book-pages">
      <span class="book-label">Page Count:</span>
      
    </span>
    <span class="book-language">
      <span class="book-label">Language:</span>
      
    </span>
    <span class="book-publication">
      <span class="book-label">Published:</span>
      
    </span>
    <span class="read-toggle-label">Mark As Read:</span>
    <label class="toggle-switch">
      <input type="checkbox" >
      <span class="toggle-slider"></span>
    </label>
  </div>`;
  
  might want to change this to be more modular or something
  bookContainer.append(htmlConversion(book_html_template));
} */