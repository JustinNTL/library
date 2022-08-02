const bookContainer = document.querySelector('[data-book-card-container]');
const addBookBtn = document.querySelector('[data-add-book]');
const formTitle = document.querySelector('[data-form-title]');
const formAuthor = document.querySelector('[data-form-author]');
const formPages = document.querySelector('[data-form-pages]');
const formLang = document.querySelector('[data-form-lang]');
const formPub = document.querySelector('[data-form-pub]');
const formReadStatus = document.querySelector('[data-form-read-status]');

let myLibrary = [
  {
    formTitle: 'Think Like a Programmer: An Introduction to Creative Problem Solving',
    formAuthor: 'V. Anton Spraul',
    formPages: '256',
    formLang: 'English',
    formPub: 'August 12 2012',
    formReadStatus: 'read'
  }
];

class Book {
  constructor(formTitle, formAuthor, formPages, formLang, formPub, formReadStatus) {
    this.formTitle = formTitle.value;
    this.formAuthor = formAuthor.value;
    this.formPages = formPages.value;
    this.formLang = formLang.value;
    this.formPub = formPub.value;
    this.formReadStatus = formReadStatus.value;
  }
  
  displayBook() {
    while (bookContainer.firstChild) {
      bookContainer.removeChild(bookContainer.lastChild);
    }

    let i = 0;
    myLibrary.forEach((books) => {
      if (books.formTitle === '' || books.formAuthor === '' || books.formPages === '' || 
      books.formLang === '' || books.formPub === '' || books.formReadStatus=== '' ) return //try to do this check later before adding to the array, testing for now

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
          <span class="card-remove" data-close-card=${i}>+</span>
          <h3 class="book-title">${sanitizeHtml(books.formTitle)}</h3>
          <span class="book-author">
            <span class="book-label">Author:</span>
            ${sanitizeHtml(books.formAuthor)}
          </span>
          <span class="book-pages">
            <span class="book-label">Page Count:</span>
            ${sanitizeHtml(books.formPages)}
          </span>
          <span class="book-language">
            <span class="book-label">Language:</span>
            ${sanitizeHtml(books.formLang)}
          </span>
          <span class="book-publication">
            <span class="book-label">Published:</span>
            ${sanitizeHtml(books.formPub)} 
          </span>
          <span class="read-toggle-label">Mark As Read:</span>
          <label class="toggle-switch">
            <input type="checkbox" ${sanitizeHtml(books.formReadStatus) === 'read' ? 'checked' : 'unchecked'}>
            <span class="toggle-slider"></span>
          </label>
        </div>`;

      bookContainer.append(convertHtml(book_html_template));

      const closeCard = document.querySelector(`[data-close-card='${i}']`); 
      const removeCard = () => {
        let removePos = closeCard.dataset.closeCard;
        myLibrary.splice(parseInt(removePos), 1);
        this.displayBook();
      }
      closeCard.addEventListener('click', () => {
        removeCard();
      })
      i++;
    })

  } // things to do: link read toggle to class, button to open/close form, link/count for books in library.

  delBook() {
    removeCard
/*    document.querySelector(`['${this.dataset.close}']`).onclick = function () {
      this.parentNode.remove();
      return false;
    }; */
/*     const closeCard = document.querySelector(`[close-card='${closeCard.dataset.closeCard}']`);
    let removeCard = closeCard.dataset.closeCard;
    myLibrary.splice(parseInt(removeCard, 1)); */
    
  }

  statusBook() {
    //etch a sketch will help here
  }
  
  // possible delete option to keep track of respective cards using data attributes

}


const addBookToLibrary = () => {
  let book = new Book(formTitle, formAuthor, formPages, formLang, formPub, formReadStatus);
  myLibrary.push(book);
  book.displayBook();
}

window.onload = () => addBookToLibrary();

addBookBtn.addEventListener('click', () => {
 addBookToLibrary();
})

// debate on auto fit vs auto fill