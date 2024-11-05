document.addEventListener('DOMContentLoaded', function () {
    // Handle column-all selection
    document.querySelectorAll('thead input[id="column-all"]').forEach(function (columnCheckbox, colIndex) {
        columnCheckbox.addEventListener('change', function () {
            const rows = document.querySelectorAll('tbody tr');
            rows.forEach(row => {
                const checkbox = row.querySelectorAll('td input[type="checkbox"]')[colIndex];
                if (checkbox) {
                    checkbox.checked = columnCheckbox.checked;
                }
            });
        });
    });

    // Handle row-all selection
    document.querySelectorAll('tbody input[id="row-all"]').forEach(function (rowCheckbox) {
        rowCheckbox.addEventListener('change', function () {
            const row = this.closest('tr');
            const checkboxes = row.querySelectorAll('td input[type="checkbox"]');
            checkboxes.forEach(checkbox => checkbox.checked = rowCheckbox.checked);
        });
    });
});