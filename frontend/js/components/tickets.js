(function () {
  function renderTickets(options) {
    if (typeof window.renderTickets === 'function') return window.renderTickets(options);
    return null;
  }

  window.YYDSComponents = window.YYDSComponents || {};
  window.YYDSComponents.tickets = { renderTickets };
})();
