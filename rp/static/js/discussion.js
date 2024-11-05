function displayAnswered(button) {
    document.querySelector('.select-type .selected').classList.remove('selected');
    button.classList.add('selected');

    // Show answered content
    document.querySelector('.answers').style.display = 'block';
    document.querySelector('.questions').style.display = 'none';
}

function displayUnanswered(button) {
    document.querySelector('.select-type .selected').classList.remove('selected');
    button.classList.add('selected');
    // Show unanswered content
    document.querySelector('.answers').style.display = 'none';
    document.querySelector('.questions').style.display = 'block';
}
function displaywide(number) {
    const modal = document.getElementById('imageModal-' + number);
    const modalImage = document.getElementById('modalImage-' + number);
    const imageSrc = event.target.src; // Get the source of the clicked image

    modalImage.src = imageSrc;
    modal.style.display = "block";
}

function closeModal(number) {
    document.getElementById('imageModal-'+number).style.display = "none";
}
