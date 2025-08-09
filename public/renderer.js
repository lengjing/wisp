// const electronAPI = window.electronAPI;

const searchInput = document.getElementById('search-input');

electronAPI.onFocusInput(() => {
  searchInput.focus();
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    electronAPI.hideMainWindow();
    electronAPI.closeLoginWindow();
    electronAPI.closeAnswerWindow();
  }
});

searchInput.addEventListener('keydown', async (e) => {
  if (e.key === 'Enter') {
    const query = searchInput.value.trim();
    if (!query) return;

    const loggedIn = await checkLoginStatus();

    if (!loggedIn) {
      electronAPI.openLoginWindow();
      electronAPI.closeAnswerWindow();
    } else {
      electronAPI.closeLoginWindow();
      electronAPI.openAnswerWindow();

      // 你也可以在 answerWindow 里做自动发送 query 的脚本注入
      // 这里简单示范下通过IPC发给 answerWindow (需要实现对应接收逻辑)
      // 先不实现，留给你扩展
    }
  }
});

async function checkLoginStatus() {
  // 你可以设计跨窗口通信，这里简单返回 false 触发登录窗口
  return new Promise(resolve => {
    resolve(false);
  });
}
