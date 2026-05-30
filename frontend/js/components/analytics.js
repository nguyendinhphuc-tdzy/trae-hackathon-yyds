(function () {
  function renderAnalytics() {
    if (typeof window.renderAnalytics === 'function') return window.renderAnalytics();
    return null;
  }

  window.YYDSComponents = window.YYDSComponents || {};
  window.YYDSComponents.analytics = { renderAnalytics };
})();
