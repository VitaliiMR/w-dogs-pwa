
if ('serviceWorker' in navigator) {
  const serviceWorkerUrl = new URL('./sw.js', document.baseURI).href;

  navigator.serviceWorker.getRegistrations()
    .then(registrations => Promise.all(
      registrations
        .filter(registration =>
          [registration.active, registration.installing, registration.waiting]
            .some(worker => worker?.scriptURL === serviceWorkerUrl)
        )
        .map(registration => registration.unregister())
    ))
    .catch(error => console.error('Service worker cleanup failed:', error));
}