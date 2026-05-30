(function () {
  function renderClients() {
    if (typeof window.renderClients === 'function') return window.renderClients();
    return null;
  }

  window.YYDSComponents = window.YYDSComponents || {};
  window.YYDSComponents.clients = { renderClients };
})();
