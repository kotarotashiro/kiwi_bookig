document.addEventListener('DOMContentLoaded', function() {
  // 管理画面共通の初期化処理
  console.log('Kiwi no Kuni 管理画面 - 初期化完了');
  
  // サイドバーのアクティブ状態
  const currentPath = window.location.pathname;
  const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
  
  sidebarLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (currentPath.includes(href)) {
      link.parentElement.classList.add('active');
    }
  });
  
  // トースト通知の共通関数
  window.showToast = function(title, description, type = 'success') {
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toastTitle');
    const toastDescription = document.getElementById('toastDescription');
    
    if (!toast || !toastTitle || !toastDescription) return;
    
    toastTitle.textContent = title;
    toastDescription.textContent = description;
    
    // トーストアイコンの設定
    const toastIcon = document.querySelector('.toast-icon i');
    if (toastIcon) {
      if (type === 'success') {
        toastIcon.className = 'fas fa-check-circle';
        toastIcon.style.color = 'var(--primary-color)';
      } else if (type === 'error') {
        toastIcon.className = 'fas fa-exclamation-circle';
        toastIcon.style.color = '#ef4444';
      }
    }
    
    toast.classList.add('show');
    
    // 5秒後に自動で閉じる
    setTimeout(() => {
      toast.classList.remove('show');
    }, 5000);
  };
  
  // トースト閉じるボタン
  const toastClose = document.querySelector('.toast-close');
  if (toastClose) {
    toastClose.addEventListener('click', () => {
      const toast = document.getElementById('toast');
      if (toast) toast.classList.remove('show');
    });
  }
});