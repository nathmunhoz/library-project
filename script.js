/* how to maintain the cards displaying even when you reload the page,
	Write a function that loops through the array and displays each book on the page.

how to put the same configurations to the first card in the script
	USE IT A CONST DEFAULT = {}

all of your book objects should have a unique id, which can be generated using crypto.randomUUID().
*/

const bookInput = document.getElementById('book');
const authorInput = document.getElementById('author');
const statusSelect = document.getElementById('status');
const addBook = document.getElementById('add');

const myLibrary = [];

function Book(title, author, read) {
	this.title = title;
	this.author = author;
	this.read = read;
}

addBook.addEventListener('click', (event) => {
	event.preventDefault();
	
	const display = document.querySelector('.display-book');

	const book = bookInput.value.trim();
	const author = authorInput.value.trim();
	const status = statusSelect.value;

	// avoid add nothing 
	if (!book || !author) return alert('Fill in all fields.');

	const newBook = new Book(book, author, status);
	myLibrary.push(newBook);

	const newDiv = document.createElement('div');

	const pTitle = document.createElement('p');
	pTitle.textContent = `"${newBook.title}"`;
	const pAuthor = document.createElement('p');
	pAuthor.textContent = newBook.author;

	const bStatus = document.createElement('button');
	bStatus.textContent = newBook.read;
	if (status === 'Read') {
		bStatus.classList.add('read');
	} else if (status === 'Not read') {
		bStatus.classList.add('not-read');
	} else {
		bStatus.classList.add('in-progress');
	}
	const bRemove = document.createElement('button');
	bRemove.classList.add('remove');
	bRemove.textContent = 'Remove';

	newDiv.appendChild(pTitle);
	newDiv.appendChild(pAuthor);
	newDiv.appendChild(bStatus);
	newDiv.appendChild(bRemove);

	display.appendChild(newDiv);

	// clear the inputs
	bookInput.value = '';
  	authorInput.value = '';
  	statusSelect.selectedIndex = 0;

	// remove button 
	bRemove.addEventListener('click', () => {
		newDiv.remove();
		const index = myLibrary.indexOf(newBook);
		if (index > -1) myLibrary.splice(index, 1);
	});

	bStatus.addEventListener('click', () => {
		if (bStatus.classList.contains('not-read')) {
		  bStatus.classList.remove('not-read');
		  bStatus.classList.add('in-progress');
		  bStatus.textContent = 'In progress';
		} else if (bStatus.classList.contains('in-progress')) {
		  bStatus.classList.remove('in-progress');
		  bStatus.classList.add('read');
		  bStatus.textContent = 'Read';
		} else {
		  bStatus.classList.remove('read');
		  bStatus.classList.add('not-read');
		  bStatus.textContent = 'Not read';
		}
	});
})