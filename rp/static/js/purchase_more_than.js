var selectedType;

document.getElementById('add').addEventListener('click', function (event) {
  event.preventDefault();
  // Get the table by ID
  var table = document.getElementById('itemsTable');

  // Create a new row
  var newRow = table.insertRow(table.rows.length - 1); // Insert before the last row

  // Insert new cells in the row
  for (var i = 0; i < 4; i++) {
    var newCell = newRow.insertCell(i);
    if (i === 0) {
      newCell.innerHTML = table.rows.length - 2; // Sl No.
    } else if (i === 1) {
      newCell.innerHTML = `<textarea name="item-description-${table.rows.length - 2}" placeholder="Enter description of the item" style="width:95%" ></textarea>`;
    } else if (i === 2) {
      newCell.innerHTML = `<input type="number" name="item-quantity-${table.rows.length - 2}" placeholder="Enter quantity">`;
    } else {
      newCell.innerHTML = `<input type="number" name="item-estimate-${table.rows.length - 2}" placeholder="Enter estimated cost">`;
    }
  }

  // Update the number of items in the form
  var count = document.getElementById('items');
  count.value = parseInt(count.value) + 1;
});

function toggleItems(show, className) {
  var trainingRows = document.querySelectorAll(className);
  trainingRows.forEach(function (row) {
    if (show) {
      row.style.visibility = 'visible';
    } else {
      row.style.visibility = 'hidden';
    }
  });
}

function showDropdown() {
  document.getElementById('certificate-dropdown').style.visibility = 'visible';
  document.getElementById('save-form').style.display = 'none';
  document.getElementById('next').style.display = 'block';
}

function hideDropdown() {
  document.getElementById('certificate-dropdown').style.visibility = 'hidden';
  document.querySelector('.article-cert').style.visibility = 'hidden';
  document.querySelector('.item-cert').style.visibility = 'hidden';
}

function showNextForm() {
  const selectedType = document.getElementById('certificate-type').value;
  if (selectedType === 'article') {
    document.querySelector('.article-cert').style.display = 'block';
    document.getElementById('first-page').style.display = 'none';
  } else if (selectedType === 'item') {
    document.getElementById('first-page').style.display = 'none';
    document.querySelector('.item-cert').style.display = 'block';
  }
}