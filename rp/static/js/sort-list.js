document.addEventListener('DOMContentLoaded', function () {
    const getCellValue = (row, index) => row.children[index].textContent || row.children[index].innerText;

    const comparer = (index, asc) => (a, b) => ((v1, v2) =>
        v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
    )(getCellValue(asc ? a : b, index), getCellValue(asc ? b : a, index));

    document.querySelectorAll('th').forEach((th, idx) => {
        if (idx === 0) return; // Skip the "Sl No" column
        th.addEventListener('click', function () {
            const table = th.closest('table');
            const tbody = table.querySelector('tbody');
            const rows = Array.from(tbody.querySelectorAll('tr'));

            // Sort rows but keep the Sl No column unchanged
            rows.sort(comparer(idx, this.asc = !this.asc));
            rows.forEach((row, i) => row.children[0].textContent = i + 1); // Update Sl No column

            rows.forEach(row => tbody.appendChild(row));
        });
    });
});