document.querySelector('.profile-pic').addEventListener('mouseover', function () {
    document.querySelector('.dropdown').style.display = 'block';
});
document.querySelector('.profile-pic').addEventListener('click', function () {
    document.querySelector('.dropdown').style.display = 'block';
});
document.querySelector('.profile-pic').addEventListener('mouseout', function () {
    document.querySelector('.dropdown').style.display = 'none';
});
document.querySelector('.dropdown').addEventListener('mouseover', function () {
    document.querySelector('.dropdown').style.display = 'block';
});
document.querySelector('.dropdown').addEventListener('mouseout', function () {
    document.querySelector('.dropdown').style.display = 'none';
});