export function fetchToggles() {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          "is-dailog-open": false,
          "is-menu-expanded": true
        }),
      300
    );
  });
}
