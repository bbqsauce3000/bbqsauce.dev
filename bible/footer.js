fetch("/bible/viewport.html")
  .then(r => r.text())
  .then(html => {
    // Only insert if not already present
    if (!document.querySelector('meta[name="viewport"]')) {
      document.head.insertAdjacentHTML("afterbegin", html);
    }
  });

fetch("/bible/nav.html")
  .then(r => r.text())
  .then(html => {
    const header = document.querySelector("header");
    if (header) {
      header.insertAdjacentHTML("beforeend", html);
    }
  });

fetch("/bible/footer.html")
  .then(r => r.text())
  .then(html => {
    document.body.insertAdjacentHTML("beforeend", html);
  });
