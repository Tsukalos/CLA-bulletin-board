async function loadNotes() {
    const response = await fetch('./notes/notes_index.json');
    const notes = await response.json();

    const board = document.getElementById('board');
    const modal = document.getElementById('note-modal');
    const modalContent = document.getElementById('note-content');
    const closeBtn = document.querySelector('.close-btn');

    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
        modalContent.innerHTML = '';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
            modalContent.innerHTML = '';
        }
    });

    notes.forEach((note) => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';

        // Calculate scaled positions
        const boardWidth = board.offsetWidth;
        const boardHeight = board.offsetHeight;
        noteElement.style.top = `${note.y * boardHeight}px`;
        noteElement.style.left = `${note.x * boardWidth}px`;
        noteElement.dataset.file = note.file;

        noteElement.addEventListener('click', async () => {
            const res = await fetch(`./notes/${note.file}`);
            const text = await res.text();
            const markdown = marked.parse(text);
            modalContent.innerHTML = markdown;
            modal.classList.remove('hidden');
        });

        board.appendChild(noteElement);
    });
}

window.addEventListener('DOMContentLoaded', loadNotes);
