const canvas = document.getElementById('signature-pad');
const signaturePad = new SignaturePad(canvas, {
    penColor: 'blue'
});
var dataURL;

document.getElementById('clear').addEventListener('click', () => {
    signaturePad.clear();
});

document.getElementById('save').addEventListener('click', () => {
    if (signaturePad.isEmpty()) {
        alert("Please provide a signature first.");
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
        document.getElementById('prepared_by').prepend(signimg);
    }
});