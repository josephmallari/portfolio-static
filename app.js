document.querySelectorAll(".project__text").forEach((button) => {
  button.onclick = (e) => {
    if (e.target.nextElementSibling) {
      e.target.nextElementSibling.classList.toggle("project--show");
    }
  };
});
