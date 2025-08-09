const { contextBridge } = require('electron');

// 注入页面时隐藏多余UI，保留回复区域
window.addEventListener('DOMContentLoaded', () => {
  const hideUI = () => {
    const selectors = [
      'nav', 'header', 'aside', 'form',
      '[class*="sidebar"]', '[class*="header"]', '[class*="composer"]'
    ];
    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => el.style.display = 'none');
    });
    document.body.style.background = '#fff';
  };

  hideUI();

  new MutationObserver(hideUI).observe(document.body, { childList: true, subtree: true });
});
