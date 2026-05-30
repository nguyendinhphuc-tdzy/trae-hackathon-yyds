(function () {
  function renderOverview(onTabChange, onAddClientTrigger) {
    if (typeof window.renderOverview === 'function') return window.renderOverview(onTabChange, onAddClientTrigger);
    return null;
  }

  window.YYDSComponents = window.YYDSComponents || {};
  window.YYDSComponents.overview = { renderOverview };
})();
