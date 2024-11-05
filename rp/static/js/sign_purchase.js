const canvas = document.getElementById('signature-pad');
const signaturePad = new SignaturePad(canvas, {
    penColor: 'blue'
});
var dataURL;

document.getElementById('clear').addEventListener('click', (event) => {
    event.preventDefault();
    signaturePad.clear();
});

document.getElementById('save').addEventListener('click', (event) => {
    event.preventDefault();
    if (signaturePad.isEmpty()) {
        triggerAlert("Please provide a signature first.");
    } else {
        dataURL = signaturePad.toDataURL();
        console.log(dataURL);
        triggerAlert('Signature saved successfully');
        document.getElementById('clear').style.display = 'none';
        document.getElementById('save').style.display = 'none';
        document.getElementById('signature-pad').style.display = 'none';
        var signimg = document.createElement('img');
        signimg.src = dataURL;
        signimg.draggable = false;
        document.getElementById('indenting_officer').prepend(signimg);
        document.getElementById('sign_indenting_officer').value = dataURL;
    }
});