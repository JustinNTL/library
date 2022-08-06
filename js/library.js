const bookContainer = document.querySelector('[data-book-card-container]');
const addBookBtnHome = document.querySelector('[data-add-book-btn]');
const addBookSection = document.querySelector('[data-add-book-section]');
const closeFormBtn = document.querySelector('[data-form-close-btn]');
const addBookBtnForm = document.querySelector('[data-form-add-book-btn]');
const formTitle = document.querySelector('[data-form-title]');
const formAuthor = document.querySelector('[data-form-author]');
const formPages = document.querySelector('[data-form-pages]');
const formLang = document.querySelector('[data-form-lang]');
const formPub = document.querySelector('[data-form-pub]');
const formReadStatus = document.querySelector('[data-form-read-status]');
let loadOnce = true;
let myLibrary = [];

class Book {
  constructor(formTitle, formAuthor, formPages, formLang, formPub, formReadStatus) {
    if (window.onload && loadOnce) {
      this.formTitle = formTitle;
      this.formAuthor = formAuthor;
      this.formPages = formPages;
      this.formLang = formLang;
      this.formPub = formPub;
      this.formReadStatus = formReadStatus;
      loadOnce = !loadOnce;
    } else {
      this.formTitle = formTitle.value;
      this.formAuthor = formAuthor.value;
      this.formPages = formPages.value;
      this.formLang = formLang.value;
      this.formPub = formPub.value;
      this.formReadStatus = formReadStatus.value;
      }
  }
  
  displayBook() {
    while (bookContainer.firstChild) {
      bookContainer.removeChild(bookContainer.lastChild);
    }
    let i = 0;
    myLibrary.forEach((books) => {
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
        <div class="book-card ${sanitizeHtml(books.formReadStatus) === 'read' ? '' : 'book-card-unread'}" data-book-card=${i}>
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
            <span class="toggle-slider" data-toggle-status=${i}></span>
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

      const bookCard = document.querySelector(`[data-book-card='${i}']`);
      const toggleStatus = document.querySelector(`[data-toggle-status='${i}']`);
      const switchStatus = () => {
        let switchStat = toggleStatus.dataset.toggleStatus;
        if (myLibrary[parseInt(switchStat)].formReadStatus === 'read') {
          myLibrary[parseInt(switchStat)].formReadStatus = 'unread';
          bookCard.classList.add('book-card-unread');
        } else if (myLibrary[parseInt(switchStat)].formReadStatus === 'unread') {
          myLibrary[parseInt(switchStat)].formReadStatus = 'read';
          bookCard.classList.remove('book-card-unread');
        }
      }
      toggleStatus.addEventListener('click', () => {
        switchStatus();
      })
      i++;
    })

  } // things to do: link/count for books in library, clear form button, check if date insert is locale.

}

const addSampleBook = () => {
  let book = new Book('Think Like a Programmer: An Introduction to Creative Problem Solving', 'V. Anton Spraul', '256', 'English', 'August 12 2012', 'read');
  myLibrary.push(book);
  book.displayBook();
}

const addBookToLibrary = () => {
  let book = new Book(formTitle, formAuthor, formPages, formLang, formPub, formReadStatus);
  if (formTitle.value === '' || formAuthor.value === '' || formPages.value === '' ||
    formLang.value === '' || formPub.value === '' || formReadStatus.value === '') return
  myLibrary.push(book);
  book.displayBook();
}

const openBookFormAdd = () => {
  let formStatus = getComputedStyle(document.documentElement).getPropertyValue('--bookFormDisplayStatus');
  if (formStatus.split(' ').join('') === 'none') {
    document.documentElement.style.setProperty('--bookFormDisplayStatus', 'grid');
  } 
}

const closeBookFormUsingOutClick = (e) => {
  let addBookForm = e.target.classList.value;
  if (addBookForm.split(' ').join('') === 'add-book-form') {
    document.documentElement.style.setProperty('--bookFormDisplayStatus', 'none');
  }
}

const closeBookFormUsingBtn = () => {
  let formStatus = getComputedStyle(document.documentElement).getPropertyValue('--bookFormDisplayStatus');
  if (formStatus.split(' ').join('') === 'grid') {
    document.documentElement.style.setProperty('--bookFormDisplayStatus', 'none');
  } 
}

window.onload = () => addSampleBook();

addBookBtnForm.addEventListener('click', () => {
 addBookToLibrary();
})

addBookBtnHome.addEventListener('click', () => {
  openBookFormAdd();
})

addBookSection.addEventListener('click', (e) => {
  closeBookFormUsingOutClick(e);
})

closeFormBtn.addEventListener('click', () => {
  closeBookFormUsingBtn();
})

// debate on auto fit vs auto fill