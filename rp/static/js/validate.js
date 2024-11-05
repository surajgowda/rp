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

function validate(event) {
    event.preventDefault();
    if (validation()) {
        document.querySelector('form').submit();
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
                if (sizeUnit === 'kb') {
                    maxSize *= 1024;
                } else if (sizeUnit === 'mb') {
                    maxSize *= 1024 * 1024;
                }

                if (!validateFileInput(field, isEmptyAllowed, maxSize, allowedExtensions)) {
                    errorlist += `<li>The file ${field.id} must be smaller than ${validationRules[2]} ${validationRules[3]} and have one of the following extensions: ${allowedExtensions.join(', ')}.\n</li>`;
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
        errorlist += '</ol>';
        triggerAlert(errorlist);
        return false;
    }
}