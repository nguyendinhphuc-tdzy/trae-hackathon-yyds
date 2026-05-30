(function () {
  function renderInbox(options) {
    if (typeof window.renderInbox === 'function') return window.renderInbox(options);
    return null;
  }

  window.YYDSComponents = window.YYDSComponents || {};
  window.YYDSComponents.inbox = { renderInbox };
})();
