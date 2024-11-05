var redirect_url = 'none';

function triggerAlert(message, redirect = 'none') {
    const alertMessage = document.getElementById('alert-message');
    const alertOverlay = document.getElementById('alert-overlay');
    const alertBox = document.getElementById('alert-box');

    message = message.replace(/\n/g, '<br>');
    message = message.replace(/_/g, ' ');
    message = message.replace(/,/g, '<br>');

    alertMessage.innerHTML = '<h4>Rectify these errors to continue.</h4>' + message;
    alertOverlay.style.display = 'block';
    alertBox.style.display = 'block';

    if (redirect !== 'none') {
        redirect_url = redirect;
    }
}

function closeAlert() {
    const alertBox = document.getElementById('alert-box');
    const alertOverlay = document.getElementById('alert-overlay');
    alertBox.style.display = 'none';
    alertOverlay.style.display = 'none';

    if (redirect_url !== 'none') {
        window.location.href = redirect_url;
    }
}