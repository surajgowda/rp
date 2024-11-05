document.addEventListener('DOMContentLoaded', function () {
    var dropdownLinks = document.querySelectorAll('.dropdown-links');

    dropdownLinks.forEach(function (link) {
        link.addEventListener('mouseenter', function () {
            var icon = this.querySelector('.dropdown-icon');
            icon.innerHTML = '&#9660;';
            var subLinks = this.nextElementSibling;
            if (subLinks && subLinks.classList.contains('sub-links')) {
                subLinks.style.display = 'block';
                subLinks.setAttribute('aria-hidden', 'false');
                storeExpandedDiv(subLinks.getAttribute('id'));
            }
        });
    });
    var leavenavbar = document.querySelector('.sidebar');
    leavenavbar.addEventListener('mouseleave', function () {
        var dropdownLinks = document.querySelectorAll('.dropdown-links');
        dropdownLinks.forEach(function (link) {
            var icon = link.querySelector('.dropdown-icon');
            icon.innerHTML = '&#9658;';
            var subLinks = link.nextElementSibling;
            if (subLinks && subLinks.classList.contains('sub-links')) {
                subLinks.style.display = 'none';
                subLinks.setAttribute('aria-hidden', 'true');
                storeExpandedDiv(subLinks.getAttribute('id'));
            }
        });
    });
});

function storeExpandedDiv(id) {
    var expandedDivs = getExpandedDivs();
    if (!expandedDivs.includes(id)) {
        expandedDivs.push(id);
        localStorage.setItem('expanded_divs', JSON.stringify(expandedDivs));
    }
}

function removeExpandedDiv(id) {
    var expandedDivs = getExpandedDivs();
    var index = expandedDivs.indexOf(id);
    if (index !== -1) {
        expandedDivs.splice(index, 1);
        localStorage.setItem('expanded_divs', JSON.stringify(expandedDivs));
    }
}

function getExpandedDivs() {
    var expandedDivs = localStorage.getItem('expanded_divs');
    return expandedDivs ? JSON.parse(expandedDivs) : [];
}