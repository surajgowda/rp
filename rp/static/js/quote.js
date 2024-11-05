var selectedRadioId = '';
var data = {};
var totalmachinecount = 0;
var totalaccessorycount = 0;
var totalchemicalcount = 0;
var machineCostAcademia = {};
var machineCostIndustry = {};
var machineCostMSME = {};
var machineCostInternational = {};

(function getdetails() {
    fetch('/apiquote/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken') // Include the CSRF token for security
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Return the parsed JSON response
        })
        .then(response => {
            data = response;
            for (var machine in data.machines) {
                machineCostAcademia[machine] = data.machines[machine].academia;
                machineCostIndustry[machine] = data.machines[machine].industry;
                machineCostMSME[machine] = data.machines[machine].msme;
                machineCostInternational[machine] = data.machines[machine].international;
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            triggerAlert("Error in fetching machine, accessories and chemical data\n");
        });
})();

function updateUnitTotalCost(rownumber) {
    // Get the row of the quantity input
    var row = document.getElementById(`row-${rownumber}`);

    // Get the unit rate cell and total cost cell
    var unitRateCell = row.cells[7];
    var totalCostCell = row.cells[8];

    // Calculate and update the total cost
    var cost = parseInt(unitRateCell.innerHTML) || 0;
    console.log(row.cells[5]);
    var quantity = parseInt(row.cells[5].querySelector('input').value) || 0;
    totalCostCell.innerHTML = cost * quantity;

    updateTotalCost();
}

function handleTypeChange(rownumber) {
    const type_of = document.getElementById(`type-of-${rownumber}`).value;
    document.getElementById(`type-of-${rownumber}`).disabled = true;

    var row = document.getElementById(`row-${rownumber}`);

    if (type_of == 'machine') {
        totalmachinecount += 1;
        for (var cellno = 2; cellno < 9; cellno++) {
            var newcell = document.createElement('td');
            newcell.id = 'cell-' + rownumber + '-' + cellno;
            if (cellno == 2) {
                newcell.innerHTML =
                    `<select id="dropdownmachines-${totalmachinecount}" name="machine-${totalmachinecount}" onchange="handleSelectionChange(this)">
                <option value="null">Select Machine</option>
                </select>`
                row.appendChild(newcell)

                const selectElement = document.getElementById(`dropdownmachines-${totalmachinecount}`)
                Object.entries(data.machines).forEach(([key, machine]) => {
                    const option = document.createElement('option');
                    option.value = key;
                    option.textContent = machine.name;
                    selectElement.appendChild(option);
                });
            } else if (cellno == 3) {
                newcell.innerHTML =
                    `<input type="text" class="description" name="machine-description-${totalmachinecount}" placeholder="Enter machine description"/>`
                row.appendChild(newcell)
            } else if (cellno == 4) {
                newcell.innerHTML =
                    `<input type="text" class="specification" name="machine-specification-${totalmachinecount}" placeholder="Enter machine specification"/>`
                row.appendChild(newcell)
            } else if (cellno == 5) {
                newcell.innerHTML =
                    `<input type="number" class="quantity" name="machine-quantity-${rownumber}" placeholder="Enter Quantity" onchange="updateUnitTotalCost(${rownumber})"/>`;
                row.appendChild(newcell);
            } else if (cellno == 6) {
                newcell.innerHTML =
                    `<select id="dropdownunit" name="machine-unit-${totalmachinecount}">
                    <option value="null">Select Unit</option>
                    <option value="hour">Hour</option>
                    <option value="test">Test</option>
                    <option value="element">Element</option>
                    <option value="sample">Sample</option>
                    <option value="parameter">Parameter</option>
                    <option value="machine">Machine</option>
                    <option value="ls">L/s</option>
                    <option value="na">NA</option>
                </select>`;
                row.appendChild(newcell);
            } else if (cellno == 7) {
                newcell.innerHTML = 0;
                row.appendChild(newcell)
            } else if (cellno == 8) {
                newcell.innerHTML = 0;
                row.appendChild(newcell)
            }
        }
    } else if (type_of == 'accessories') {
        totalaccessorycount += 1;
        for (var cellno = 2; cellno < 9; cellno++) {
            var newcell = document.createElement('td');
            newcell.id = 'cell-' + rownumber + '-' + cellno; // Adding IDs similar to the machine section
            if (cellno == 2) {
                newcell.innerHTML =
                    `<select id="dropdownaccessories-${totalaccessorycount}" name="accessories-${totalaccessorycount}" onchange="handleChange(this,'acc')" />
                        <option>Select Accessory</option>
                    </select>`;
                row.appendChild(newcell);

                const selectElement = document.getElementById(`dropdownaccessories-${totalaccessorycount}`);
                Object.entries(data.accessories).forEach(([key, accessory]) => {
                    const option = document.createElement('option');
                    option.value = key;
                    option.textContent = accessory.name;
                    selectElement.appendChild(option);
                });
            } else if (cellno == 3) {
                newcell.innerHTML =
                    `<input type="text" class="description" name="accessory-description-${totalaccessorycount}" placeholder="Enter accessory description"/>`;
                row.appendChild(newcell);
            } else if (cellno == 4) {
                newcell.innerHTML =
                    `<input type="text" class="specification" name="accessory-specification-${totalaccessorycount}" placeholder="Enter accessory specification"/>`;
                row.appendChild(newcell);
            } else if (cellno == 5) {
                newcell.innerHTML =
                    `<input type="number" class="quantity" name="accessory-quantity-${rownumber}" placeholder="Enter Quantity" onchange="updateUnitTotalCost(${rownumber})" />`;
                row.appendChild(newcell);
            } else if (cellno == 6) {
                newcell.innerHTML =
                    `<select id="dropdownunit" name="accessory-unit-${totalaccessorycount}">
                        <option value="null">Select Unit</option>
                        <option value="hour">Hour</option>
                        <option value="test">Test</option>
                        <option value="element">Element</option>
                        <option value="sample">Sample</option>
                        <option value="parameter">Parameter</option>
                        <option value="machine">Machine</option>
                        <option value="ls">L/s</option>
                        <option value="na">NA</option>
                    </select>`;
                row.appendChild(newcell);
            } else if (cellno == 7) {
                newcell.innerHTML = 0;
                row.appendChild(newcell);
            } else if (cellno == 8) {
                newcell.innerHTML = 0;
                row.appendChild(newcell);
            }
        }
    } else if (type_of == 'chemical') {
        totalchemicalcount += 1;
        for (var cellno = 2; cellno < 9; cellno++) {
            var newcell = document.createElement('td');
            newcell.id = 'cell-' + rownumber + '-' + cellno; // Adding IDs similar to the machine section
            if (cellno == 2) {
                newcell.innerHTML =
                    `<select id="dropdownchemicals-${totalchemicalcount}" name="chemicals-${totalchemicalcount}" onchange="handleChange(this,'chem')"/>
                        <option>Select Chemical</option>
                    </select>`;
                row.appendChild(newcell);

                const selectElement = document.getElementById(`dropdownchemicals-${totalchemicalcount}`);
                Object.entries(data.chemicals).forEach(([key, chemical]) => {
                    const option = document.createElement('option');
                    option.value = key;
                    option.textContent = chemical.name;
                    selectElement.appendChild(option);
                });
            } else if (cellno == 3) {
                newcell.innerHTML =
                    `<input type="text" class="description" name="chemical-description-${totalchemicalcount}" placeholder="Enter chemical description"/>`;
                row.appendChild(newcell);
            } else if (cellno == 4) {
                newcell.innerHTML =
                    `<input type="text" class="specification" name="chemical-specification-${totalchemicalcount}" placeholder="Enter chemical specification"/>`;
                row.appendChild(newcell);
            } else if (cellno == 5) {
                newcell.innerHTML =
                    `<input type="number" class="quantity" name="chemical-quantity-${rownumber}" placeholder="Enter Quantity" onchange="updateUnitTotalCost(${rownumber})"/>`;
                row.appendChild(newcell);
            } else if (cellno == 6) {
                newcell.innerHTML =
                    `<select id="dropdownunit" name="chemical-unit-${totalchemicalcount}">
                        <option value="null">Select Unit</option>
                        <option value="hour">Hour</option>
                        <option value="test">Test</option>
                        <option value="element">Element</option>
                        <option value="sample">Sample</option>
                        <option value="parameter">Parameter</option>
                        <option value="machine">Machine</option>
                        <option value="ls">L/s</option>
                        <option value="na">NA</option>
                    </select>`;
                row.appendChild(newcell);
            } else if (cellno == 7) {
                newcell.innerHTML = 0;
                row.appendChild(newcell);
            } else if (cellno == 8) {
                newcell.innerHTML = 0;
                row.appendChild(newcell);
            }
        }
    }

}

function addColumn(e) {
    // Get the table by its ID
    e.preventDefault();
    var table = document.getElementById("myTable");
    // Insert a new row at the end of the table
    var newRow = table.insertRow(-1);
    var rownumber = table.rows.length - 1;
    newRow.id = 'row-' + rownumber;

    // Loop through and add cells to the new row
    for (var cellno = 0; cellno < 2; cellno++) {
        var newCell = newRow.insertCell(cellno);
        newCell.id = 'cell-' + rownumber + '-' + cellno;

        if (cellno == 0) {
            newCell.innerHTML = rownumber;
        } else if (cellno == 1) {
            newCell.innerHTML =
                `<select name="type-of-${rownumber}" id="type-of-${rownumber}" onchange="handleTypeChange(${rownumber})">
                <option value="null">Select Type</option>
                <option value="machine">Machine</option>
                <option value="accessories">Accessories</option>
                <option value="chemical">Chemical</option>
            </select>`
        }
    }
    var number = rownumber
    var ele1 = document.createElement("p")
    ele1.innerHTML = number + ":" + ` <input type='text' class='activity_notes' id='activity-${rownumber}' placeholder='Enter activity note' />`
    document.querySelector(".activity_content").appendChild(ele1)

    var ele2 = document.createElement("p")
    ele2.innerHTML = number + ":" + ` <input type='text' class='scopes' id='scope-${rownumber}' placeholder='Enter scope of work'/>`
    document.querySelector(".scope_content").appendChild(ele2)
}

function updateTotalCost() {
    var sum_total = 0;
    var count = 1;
    while (document.getElementById(`cell-${count}-8`)) {
        var totalCost = parseInt(document.getElementById(`cell-${count}-8`).textContent) || 0;
        sum_total += parseInt(totalCost);
        count++;
    }
    document.getElementById("sum_total_cost").textContent = sum_total;
}

function handleChange(selectElement, type) {
    if (type == 'acc') {
        var selectedAccessoryId = selectElement.value;
        var cost = data.accessories[selectedAccessoryId].price;
    } else {
        console.log('in chem');
        var selectedChemicalId = selectElement.value;
        console.log(selectedChemicalId);
        var cost = data.chemicals[selectedChemicalId].price;
        console.log(cost);
    }

    var row = selectElement.parentElement.parentElement;
    var unitRateCell = row.cells[7];
    var totalCostCell = row.cells[8];
    unitRateCell.innerHTML = cost;
    var quantity = parseInt(row.cells[5].querySelector("input").value) || 0;
    totalCostCell.innerHTML = cost * quantity;
}

function handleSelectionChange(selectElement) {
    const selected = document.querySelector('input[name="type"]:checked');

    if (selected) {
        if (selected.id === "academia") {
            var machineCost = machineCostAcademia;
        } else if (selected.id === "industry") {
            var machineCost = machineCostIndustry;
        } else if (selected.id === "msme") {
            var machineCost = machineCostMSME;
        } else {
            var machineCost = machineCostInternational;
        }
    } else {
        triggerAlert('Please select the type of customer');
    }
    var selectedMachineId = selectElement.value;

    // Get the cost of the selected machine
    var cost = machineCost[selectedMachineId];

    // Find the row and update the cost cell
    var row = selectElement.parentElement.parentElement; // Get the row of the select element
    var unitRateCell = row.cells[7]; // Assuming the unit rate is in the 7th column (index 6)
    var totalCostCell = row.cells[8]; // Assuming the total cost is in the 8th column (index 7)
    // Update the unit rate
    unitRateCell.innerHTML = cost;

    // Update the total cost
    var quantity = parseInt(row.cells[5].querySelector("input").value) || 0; // Get the quantity value (default to 0 if empty)
    totalCostCell.innerHTML = cost * quantity;

    updateTotalCost();
}

function radioChange(radioElement) {
    selectedRadioId = radioElement.id;
    if (selectedRadioId === "academia") {
        var machineCost = machineCostAcademia;
    } else if (selectedRadioId === "industry") {
        var machineCost = machineCostIndustry;
    } else if (selectedRadioId === "msme") {
        var machineCost = machineCostMSME;
    } else {
        var machineCost = machineCostInternational;
    }

    var table = document.getElementById("myTable");
    if (table) {
        for (var i = 0; i < table.rows.length; i++) {
            var row = table.rows[i];
            var type = row.cells[1].querySelector("select").value;
            var selectElement = row.cells[2].querySelector("select");
            var quantityInput = row.cells[5].querySelector("input");

            if (selectElement && quantityInput && type === 'machine') {
                var selectedElement = selectElement.value;
                var cost = machineCost[selectedElement];
                row.cells[7].innerHTML = cost;
                var quantity = parseInt(quantityInput.value) || 0;
                row.cells[8].innerHTML = cost * quantity;
            }
        }
    }
    updateTotalCost();
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function validatePhoneNumber(phoneNumber) {
    // Phone number pattern allowing exactly 10 digits
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phoneNumber);
}

function validateNumberWithSize(number, minSize, maxSize) {
    const numericValue = Number(value);

    // Check if the conversion resulted in a valid number
    if (isNaN(numericValue)) {
        return false;
    }

    return String(text).length <= maxSize && String(text).length >= minSize;
}

function validateEmail(email, domain) {
    // Basic email pattern (allows standard email formats)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate email format
    if (!emailPattern.test(email)) {
        return false;
    }
    // Check if email is from the specified domain
    if (domain === 'null') {
        return true;
    } else {
        const domainPattern = new RegExp(`@${domain}$`, 'i');
        return domainPattern.test(email);
    }
}

function validateTextWithSize(text, minSize, maxSize) {
    // Check if the text is within the specified size range
    if (minSize == 'null' || minSize == '' && maxSize == 'null' || maxSize == '') {
        console.log('minSize and maxSize are null');
        return false;
    }
    if (minSize == 'null' || minSize == '') {
        console.log('minSize is null');
        return String(text).length <= maxSize;
    }
    if (maxSize == 'null' || maxSize == '') {
        console.log('maxSize is null');
        return String(text).length >= minSize;
    }
    return String(text).length <= maxSize && String(text).length >= minSize;
}

function isDateInRange(date, startDate, endDate) {
    // Convert input dates to Date objects
    const inputDate = new Date(date);
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Check if input date is within the range
    return inputDate >= start && inputDate <= end;
}

function validateFileInput(fileInput, isEmptyAllowed, maxSize, allowedExtensions) {
    // Check if file input is empty
    if (!fileInput.files || fileInput.files.length === 0) {
        return isEmptyAllowed;
    }

    // Get the file from the input
    const file = fileInput.files[0];

    // Check file size (size is in bytes, so maxSize should also be in bytes)
    if (file.size > maxSize) {
        return false;
    }

    // Check file extension
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
        return false;
    }

    return true;
}

function isAtLeastOneCheckboxChecked(divId) {
    // Get all checkboxes within the specified div
    const checkboxes = document.querySelectorAll(`#${divId} input[type="checkbox"]`);

    // Check if at least one checkbox is checked
    return Array.from(checkboxes).some(checkbox => checkbox.checked);
}

function validateRange(value, minVal, maxVal) {
    // Convert the value to a number if it's a string
    const numericValue = Number(value);

    // Check if the conversion resulted in a valid number
    if (isNaN(numericValue)) {
        return false;
    }
    if (maxVal == 'null') {
        return numericValue >= minVal;
    }
    if (minVal == 'null') {
        return numericValue <= maxVal;
    }

    // Check if the numeric value is within the range
    return numericValue >= minVal && numericValue <= maxVal;
}

function checkcorrect(event) {
    event.preventDefault();
    if (validation()) {
        return true;
    } else {
        return false;
    }
}

function validation() {
    // Select all input and textarea elements
    var allFields = document.querySelectorAll('input, textarea');
    var errorlist = '<ol>';
    // Iterate over each field
    allFields.forEach(function (field) {
        // Check if the field has a data-validate attribute
        if (field.hasAttribute('data-validity')) {
            // Retrieve the value of the data-validate attribute
            var validationRules = field.getAttribute('data-validity').split(',');
            var type = validationRules[0];

            if (type == 'text') {
                var minSize = Number(validationRules[1]) == 'null' || '' ? 0 : Number(validationRules[1]);
                var maxSize = Number(validationRules[2]) == 'null' || '' ? 'null' : Number(validationRules[2]);
                if (!validateTextWithSize(field.value, minSize, maxSize)) {
                    errorlist += `<li>The field ${field.id} must be between ${minSize} and ${maxSize} characters.\n</li>`;
                }
            } else if (type == 'num') {
                var minSize = Number(validationRules[1]) == 'null' || '' ? 'null' : Number(validationRules[1]);
                var maxSize = Number(validationRules[2]) == 'null' || '' ? 'null' : Number(validationRules[2]);
                var minval = Number(validationRules[3]) == 'null' || '' ? 'null' : Number(validationRules[3]);
                var maxval = Number(validationRules[4]) == 'null' || '' ? 'null' : Number(validationRules[4]);
                if (!validateTextWithSize(field.value, minSize, maxSize)) {
                    errorlist += `<li>The field ${field.id} must be between ${minSize} and ${maxSize} characters.\n</li>`;
                }
                if (!validateRange(field.value, minval, maxval)) {
                    errorlist += `<li>The field ${field.id} must be between ${minval} and ${maxval}.\n</li>`;
                }
            } else if (type == 'file') {
                var isEmptyAllowed = validationRules[1] === 'null';
                var maxSize = Number(validationRules[2]);
                var sizeUnit = validationRules[3];
                var allowedExtensions = validationRules.slice(4);

                // Convert maxSize to bytes if a unit is provided
                if (sizeUnit === 'KB') {
                    maxSize *= 1024;
                } else if (sizeUnit === 'MB') {
                    maxSize *= 1024 * 1024;
                }

                if (!validateFileInput(field, isEmptyAllowed, maxSize, allowedExtensions)) {
                    errorlist += `<li>The file ${field.id} must be smaller than ${maxSize} bytes and have one of the following extensions: ${allowedExtensions.join(', ')}.\n</li>`;
                }
            } else if (type == 'date') {
                var pastyr = validationRules[1];
                var futureyr = validationRules[2];
                if (pastyr == '0') {
                    var startDate = new Date();
                } else if (pastyr > 0) {
                    var startDate = new Date();
                    startDate.setFullYear(startDate.getFullYear() - pastyr);
                } else if (pastyr < 0) {
                    var startDate = new Date();
                    startDate.setFullYear(startDate.getFullYear() - Math.abs(pastyr));
                } else {
                    var startDate = new Date(field.min + 'T00:00:00');
                }

                if (futureyr == '0') {
                    var endDate = new Date();
                } else if (futureyr > 0) {
                    var endDate = new Date();
                    endDate.setFullYear(endDate.getFullYear() + Math.abs(futureyr));
                } else if (futureyr < 0) {
                    var endDate = new Date();
                    endDate.setFullYear(endDate.getFullYear() - Math.abs(futureyr));
                } else {
                    var endDate = new Date(field.max + 'T00:00:00');
                }

                if (!isDateInRange(field.value, startDate, endDate)) {
                    errorlist += `<li>The date ${field.id} must be between ${startDate} and ${endDate}.\n</li>`;
                }
            } else if (type == 'email') {
                var domain = validationRules[1] != 'null' ? validationRules[1] : 'null';
                if (!validateEmail(field.value, domain)) {
                    errorlist += `<li>The ${field.id} must be a valid email address.\n</li>`;
                }
            } else if (type == 'phone') {
                if (!validatePhoneNumber(field.value)) {
                    errorlist += `<li>The ${field.id} must contain 10 numerical digits.\n</li>`;
                }
            } else if (type == 'checkbox') {
                var divId = validationRules[1];
                if (!isAtLeastOneCheckboxChecked(divId)) {
                    errorlist += `<li>At least one checkbox in the group ${divId} must be checked.\n</li>`;
                }
            } else if (type == 'numb') {
                var minSize = Number(validationRules[1]) == 'null' || '' ? 'null' : Number(validationRules[1]);
                var maxSize = Number(validationRules[2]) == 'null' || '' ? 'null' : Number(validationRules[2]);
                if (!validateTextWithSize(field.value, minSize, maxSize)) {
                    errorlist += `<li>The field ${field.id} must be between ${minSize} and ${maxSize} characters.\n</li>`;
                }
            }

        }
    });
    if (errorlist == '<ol>') {
        return true;
    } else {
        console.log(errorlist)
        errorlist += '</ol>';
        triggerAlert(errorlist);
        return false;
    }
}

function save(event) {
    var validate = checkcorrect(event);
    if (validate == false) {
        return false;
    }

    var center = "SVT";
    var lab = "STDC";
    var enquiry_no = document.getElementById("enq_no").textContent;
    var date = document.getElementById("date").textContent;

    var type_of_business = selectedRadioId; // Ensure selectedRadioId is set correctly
    var customer_details = document.getElementById("customer_deet").value;
    var customer_code = document.getElementById("customer_code").value;
    var gst_details = document.getElementById("gst_details").value;

    var contact_person = document.getElementById("contact_person").value;
    var designation = document.getElementById("designation").value;
    var department = document.getElementById("department").value;
    var mobile_number = document.getElementById("mobile_number").value;
    var phone_number = document.getElementById("phone_number").value;
    var email_id = document.getElementById("email_id").value;
    var enquiry_date = document.getElementById("enquiry_date").value;

    var subject = document.getElementById("subject").value;

    var payment = document.getElementById("payment").value;
    var delivery_period = document.getElementById("delivery_period").value;

    var place_of_work = document.getElementById("place_of_work").value;
    var ot_charges = document.getElementById("ot_charges").value;

    var tandc = document.getElementById("tandc").value;
    var visiting_person = document.getElementById("visiting_person").value;

    var table = document.getElementById("myTable");
    var table_data = [];
    for (var i = 1; i < table.rows.length; i++) {
        var row = table.rows[i];
        var activity_note = document.getElementById(`activity-${row.cells[0].innerHTML}`)?.value || '';
        var scope = document.getElementById(`scope-${row.cells[0].innerHTML}`)?.value || ''; // Ensure value extraction

        var rowData = {
            "sl_no": row.cells[0].innerHTML,
            "type": row.cells[1].querySelector("select").value,
            "sample_activity": row.cells[2].querySelector("select").value,
            "description": row.cells[3].querySelector("input").value,
            "specification": row.cells[4].querySelector("input").value,
            "quantity": row.cells[5].querySelector("input").value,
            "unit": row.cells[6].querySelector("select").value,
            "activity_note": activity_note,
            "scope": scope
        };
        table_data.push(rowData);
    }

    var payload = {
        "center": center,
        "lab": lab,
        "enquiry_no": enquiry_no,
        "date": date,
        "customer_details": customer_details,
        "customer_code": customer_code,
        "gst_details": gst_details,
        "contact_person": contact_person,
        "designation": designation,
        "department": department,
        "mobile_number": mobile_number,
        "phone_number": phone_number,
        "email_id": email_id,
        "enquiry_date": enquiry_date,
        "subject": subject,
        "payment": payment,
        "type_of_business": type_of_business,
        "delivery_period": delivery_period,
        "place_of_work": place_of_work,
        "ot_charges": ot_charges,
        "tandc": tandc,
        "sign_prepared_by": dataURL, // Ensure dataURL is correctly set
        "visiting_person": visiting_person,
        "table_data": table_data
    };

    console.log(payload);

    fetch('/create-quote/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken') // Include the CSRF token for security
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse JSON response
        })
        .then(data => {
            // Call the triggerAlert function with the data
            triggerAlert(data.message, '/quotes/'); // Assuming the response JSON has a 'message' field
        })
        .catch((error) => {
            console.error('Error:', error);
            triggerAlert("Error in saving quote\n" + error);
        });
}