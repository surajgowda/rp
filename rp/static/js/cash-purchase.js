document.querySelector('#add').addEventListener('click', function (e) {
    e.preventDefault();
    // Select the tabl
    const table = document.querySelector('#vchrs-desc-amt-table');

    // Create a new row and cells
    const newRow = table.insertRow();

    // Create and insert new cells in the new row
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);

    // Add content to the new cells (in this case, empty elements)
    cell1.innerHTML = '<textarea name="subvoucher" id="subvoucher"></textarea>';
    cell2.innerHTML = '<textarea name="description" id="description"></textarea>';
    cell3.innerHTML = '<input type="number" name="amount" id="amount">';
    cell4.innerHTML = '<input type="number" name="paise" id="paise">';
});