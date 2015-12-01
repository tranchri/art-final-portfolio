var newNoteTitle = document.getElementById("new-note-title");
var newNoteInput = document.getElementById("new-note");
var notes = document.getElementById("notes");
var createButton = document.getElementById("create");
var modifyButtons = document.getElementsByClassName("modify-buttons");


function createNewNoteElem(id, titleValue, textValue) {
	// Create the elements needed for the new note.
	var newNote = document.createElement("li");
	var noteHeader = document.createElement("div");
	var noteTitle = document.createElement("h3");
	var noteTitleInput = document.createElement("input");
	var modifyButtonContainer = document.createElement("div");
	var editButton = document.createElement("button");
	var editButtonIcon = document.createElement("i");
	var deleteButton = document.createElement("button");
	var deleteButtonIcon = document.createElement("i");
	var label = document.createElement("label");
	var noteText = document.createElement("textarea");

	// Populate attributes
	newNote.className = "note-style";
	noteHeader.className = "note-header";
	noteTitle.className = "note-title";
	noteTitleInput.type = "text";
	modifyButtonContainer.className = "modify-buttons";
	editButton.className = "edit";
	editButtonIcon.className = "fi-pencil";
	deleteButton.className = "delete";
	deleteButtonIcon.className = "fi-trash";
	newNote.id = id;
	noteTitle.innerText = titleValue;
	noteTitleInput.value = titleValue;
	label.innerText = textValue;
	noteText.innerText = textValue;

	newNote.appendChild(noteHeader);
	noteHeader.appendChild(noteTitle);
	noteHeader.appendChild(noteTitleInput);
	noteHeader.appendChild(modifyButtonContainer);
	modifyButtonContainer.appendChild(editButton);
	editButton.appendChild(editButtonIcon);
	modifyButtonContainer.appendChild(deleteButton);
	deleteButton.appendChild(deleteButtonIcon);
	newNote.appendChild(label);
	newNote.appendChild(noteText);

	return newNote;
}


// Generates a unique ID based on datetime to use as a key for localStorage
function uniqueID() {
	var id = new Date();
	return id.toUTCString();

}


// Functions to save/update/delete/load notes in localStorage
function saveNoteToStorage(id, noteTitleVal, noteTextVal) {
	localStorage.setItem(id, [noteTitleVal, noteTextVal]);
}

function deleteFromStorage(id) {
	localStorage.removeItem(id);
}

function updateStorage(id, newNoteTitle, newNoteText) {
	localStorage.setItem(id, [newNoteTitle, newNoteText]);
}

function createNoteFromStorage(id) {
	// Data from localStorage returned as comma separated string
	var storageData = localStorage.getItem(id).split(",");
	var newNote = createNewNoteElem(id, storageData[0], storageData[1]);

	notes.appendChild(newNote);
	bindEvents(newNote);
}

function loadNotes() {
	var key;
	var loadedNote;

	for (var i = localStorage.length - 1; i >= 0; i--) {
		key = localStorage.key(i);
		loadedNote = localStorage.getItem(key).split(",");
		createNoteFromStorage(key, loadedNote[0], loadedNote[1]);
	}
}


// Functions to create, delete, and edit notes
function newNote() {
	var title;
	if (newNoteTitle.value == "") title = "Untitled";
	else title = newNoteTitle.value;
	var text = newNoteInput.value;
	var newNote = createNewNoteElem(uniqueID(), title, text);
	notes.insertBefore(newNote, notes.firstChild);

	saveNoteToStorage(newNote.id, title, text);

	// Clear the new note input fields
	newNoteTitle.value = "";
	newNoteInput.value = "";

	bindEvents(newNote);
}

function editNote() {
	var li = this.closest(".note-style");
	var noteTitle = li.querySelector("h3.note-title");
	var editTitle = li.querySelector("input[type=text]");
	var noteText = li.querySelector("label");
	var editText = li.querySelector("textarea");
	var editModeOn = li.classList.contains("edit-mode");

	if(editModeOn) {
		noteTitle.innerText = editTitle.value;
		noteText.innerText = editText.value;
		updateStorage(li.id, editTitle.value, editText.value);
	}
	else {
		editTitle.value = noteTitle.innerText;
		editText.value = noteText.innerText;
		updateStorage(li.id, noteTitle.innerText, noteText.innerText);
	}

	li.classList.toggle("edit-mode");
}

function deleteNote() {
	var li = this.closest(".note-style");
	
	deleteFromStorage(li.id);
	li.remove();
}


// Event Binders
// Bind edit and delete buttons to handler function
function bindEvents (noteItem) {
	var editButton = noteItem.querySelector("button.edit");
	var deleteButton = noteItem.querySelector("button.delete");

	editButton.onclick = editNote;
	deleteButton.onclick = deleteNote;
}

// Loop through and bind edit/delete buttons for past notes
for (var i = 0; i < modifyButtons.length; i++) {
	bindEvents(modifyButtons[i]);
}

// Bind create new note button
createButton.onclick = newNote;


// Load all saved notes from storage
loadNotes();