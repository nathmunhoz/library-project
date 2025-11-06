const bookInput = document.getElementById('book');
const authorInput = document.getElementById('author');
const statusSelect = document.getElementById('status');
const addBook = document.getElementById('add');
const display = document.querySelector('.display-book');


const DEFAULT_BOOK = {
	id: crypto.randomUUID(),
	title: 'Thus Spoke Zarathustra',
	author: 'Friedrich Nietzsche',
	read: 'not-read'
};

// start the library
let myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];
if (myLibrary.length === 0) {
	myLibrary.push(DEFAULT_BOOK);
  	saveLibrary();
}

// function to save in the localStorage
function saveLibrary() {
	localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function displayBook(book) {
	const newDiv = document.createElement('div');
	newDiv.dataset.id = book.id;

	const pTitle = document.createElement('p');
	pTitle.textContent = `"${book.title}"`;

	const pAuthor = document.createElement('p');
	pAuthor.textContent = book.author;

	const bStatus = document.createElement('button');
	if (book.read === 'Read') {
		bStatus.textContent = 'Read';
		bStatus.classList.add('read');
	} else if (book.read === 'In progress') {
		bStatus.textContent = 'In progress';
		bStatus.classList.add('in-progress');
	} else {
		bStatus.textContent = 'Not read';
		bStatus.classList.add('not-read');
	}
	
	const bRemove = document.createElement('button');
	bRemove.classList.add('remove');
	bRemove.textContent = 'Remove';

	// alternate between status
	bStatus.addEventListener('click', () => {
		if (bStatus.classList.contains('not-read')) {
		  bStatus.classList.replace('not-read', 'in-progress');
		  bStatus.textContent = 'In progress';
		  book.read = 'in-progress';
		} else if (bStatus.classList.contains('in-progress')) {
		  bStatus.classList.replace('in-progress', 'read');
		  bStatus.textContent = 'Read';
		  book.read = 'read';
		} else {
		  bStatus.classList.replace('read', 'not-read');
		  bStatus.textContent = 'Not read';
		  book.read = 'not-read';
		}
		saveLibrary();
	});

	// remove button 
	bRemove.addEventListener('click', () => {
		newDiv.remove();
		myLibrary = myLibrary.filter((b) => b.id !== book.id);
    	saveLibrary();
	});

	newDiv.appendChild(pTitle);
	newDiv.appendChild(pAuthor);
	newDiv.appendChild(bStatus);
	newDiv.appendChild(bRemove);

	display.appendChild(newDiv);
}

// renders all books when the page loads
function renderLibrary() {
	display.innerHTML = '';
	myLibrary.forEach((book) => displayBook(book));
}
renderLibrary();

// add new book
addBook.addEventListener('click', (event) => {
	event.preventDefault();

	const book = bookInput.value.trim();
	const author = authorInput.value.trim();
	const status = statusSelect.value;

	// avoid add nothing 
	if (!book || !author) return alert('Fill in all fields.');

	const newBook = {
		id: crypto.randomUUID(),
		title: book,
		author: author,
		read: status,
	};

	myLibrary.push(newBook);
	saveLibrary();
	displayBook(newBook);

	// clear the inputs
	bookInput.value = '';
  	authorInput.value = '';
  	statusSelect.selectedIndex = 0;
})