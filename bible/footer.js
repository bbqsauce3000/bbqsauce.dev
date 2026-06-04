fetch("/bible/nav.html")
  .then(r => r.text())
  .then(html => {
    const header = document.querySelector("header");
    if (header) {
      header.insertAdjacentHTML("afterend", html);
    }
  });
fetch("/bible/footer.html")
  .then(r => r.text())
  .then(html => {
    document.body.insertAdjacentHTML("beforeend", html);
  });
