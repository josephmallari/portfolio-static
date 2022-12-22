document.querySelectorAll('.project__text').forEach((button) => {
    button.onclick = (e) => {
        e.target.nextElementSibling.classList.toggle('project--show');
    }
});