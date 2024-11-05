function strike() {
    var text = document.getElementById('striked');
    var checkbox = document.getElementById('strike_out');
    if (checkbox.checked) {
        text.style.textDecoration = "line-through";
    } else {
        text.style.textDecoration = "none";
    }
}

function employeeChanged(selectedId) {
    var selectedEmployee = selectedId.options[selectedId.selectedIndex].value;
    var strip = selectedEmployee.split(",");
    console.log(strip);
    var employeeName = document.getElementById('employee_name');
    var designation = document.getElementById('designation');
    var emp_id = document.getElementById('employee_id');
    var select = document.getElementById('employee');
    select.style.display = "none";
    employeeName.style.display = "block";
    designation.style.display = "block";
    employeeName.value = strip[0];
    designation.value = strip[1];
    emp_id.value = strip[2];
    console.log(strip[2]);
}

function vendorChanged() {
    var selectedVendor = document.getElementById("vendor");
    var strip = (selectedVendor.value).split(",");
    console.log(strip);

    var vendorName = document.getElementById('vendor_name');
    var vendorAddress = document.getElementById('vendor_address');
    var vendorEmail = document.getElementById('vendor_email');
    var vendorPhone = document.getElementById('vendor_contact_no');
    var vendorContact = document.getElementById('vendor_contact_person');
    var vendorId = document.getElementById('vendor_id');

    selectedVendor.style.display = "none";
    vendorName.style.display = "block";
    vendorAddress.style.display = "block";
    vendorEmail.style.display = "block";
    vendorPhone.style.display = "block";
    vendorContact.style.display = "block";

    vendorName.value = strip[0];
    vendorAddress.value = strip[1];
    vendorEmail.value = strip[2];
    vendorContact.value = strip[3];
    vendorPhone.value = strip[4];
    vendorId.value = strip[5];
    console.log(vendorId.value);
}