
window.addEventListener("keydown", function (event) {
    // Check if Ctrl + P is pressed
    if (event.ctrlKey && (event.key === 'p' || event.key === 'P')) {
        event.preventDefault(); // Prevent the default print dialog
        window.alert("Don't do that!")
    }
});
function toggleCard(button) {
    const cardContent = button.previousElementSibling;
    const isCollapsed = cardContent.classList.contains('collapsed');

    if (isCollapsed) {
        cardContent.classList.remove('collapsed');
        button.textContent = "Read"; // Change button text to Collapse
    } else {
        cardContent.classList.add('collapsed');
        button.textContent = "Hide"; // Change button text back to Read
    }
}
