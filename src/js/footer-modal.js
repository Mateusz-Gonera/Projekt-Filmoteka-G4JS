// Get modal element
const footModal = document.getElementById('footerModal');
// Get open modal button
const footModalBtn = document.getElementById('footerBtn');
// Get close button
const footCloseBtn = document.getElementById('footerCloseBtn');

// Listen for open click
footModalBtn.addEventListener('click', openModal);

// Listen for close click
footCloseBtn.addEventListener('click', closeModal);

// Listen for outside click
window.addEventListener('click', outsideClick)

// Function to open modal
function openModal(){
    footModal.style.display = 'block';
}

// Function to close modal
function closeModal(){
    footModal.style.display = 'none';
}

// Function to close modal if outside click
function outsideClick(e){
    if(e.target == footModal){

    footModal.style.display = 'none';
    }
}





