(function () {
  function renderHeader(activeTab) {
    if (typeof window.renderHeader === 'function') return window.renderHeader(activeTab);
    return null;
  }

  window.YYDSComponents = window.YYDSComponents || {};
  window.YYDSComponents.header = { renderHeader };
})();
