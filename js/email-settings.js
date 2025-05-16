document.addEventListener('DOMContentLoaded', function() {
  // タブ切り替え
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');
      
      // アクティブなタブボタンを更新
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // アクティブなタブコンテンツを更新
      tabContents.forEach(content => content.classList.remove('active'));
      document.getElementById(tabId).classList.add('active');
    });
  });
  
  // SMTP設定フォーム
  const smtpForm = document.getElementById('smtpForm');
  if (smtpForm) {
    smtpForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // フォームデータの取得
      const smtpHost = document.getElementById('smtp_host').value;
      const smtpPort = document.getElementById('smtp_port').value;
      const smtpSecure = document.getElementById('smtp_secure').checked;
      const smtpUser = document.getElementById('smtp_user').value;
      const smtpPassword = document.getElementById('smtp_password').value;
      
      // バリデーション
      if (!smtpHost || !smtpPort || !smtpUser || !smtpPassword) {
        showToast('入力エラー', '必須項目をすべて入力してください', 'error');
        return;
      }
      
      // 設定の保存（実際のシステムではAPIを呼び出し）
      // ここではローカルストレージに保存
      const smtpSettings = {
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        user: smtpUser,
        password: smtpPassword
      };
      
      localStorage.setItem('smtpSettings', JSON.stringify(smtpSettings));
      
      // 成功メッセージ
      showToast('設定を保存しました', 'メール設定が正常に保存されました。', 'success');
    });
  }
  
  // テストメール送信
  const sendTestBtn = document.getElementById('sendTestBtn');
  if (sendTestBtn) {
    sendTestBtn.addEventListener('click', function() {
      const testEmail = document.getElementById('test_email').value;
      
      if (!testEmail) {
        showToast('入力エラー', 'テストメールの送信先を入力してください。', 'error');
        return;
      }
      
      // 送信中状態に
      sendTestBtn.disabled = true;
      const originalText = sendTestBtn.innerHTML;
      sendTestBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 送信中...';
      
      // テストメール送信（実際のシステムではAPIを呼び出し）
      setTimeout(() => {
        sendTestBtn.disabled = false;
        sendTestBtn.innerHTML = originalText;
        showToast('テストメール送信', `${testEmail} 宛にテストメールを送信しました。`, 'success');
      }, 1500);
    });
  }
  
  // 保存済み設定の読み込み
  loadSavedSettings();
  
  function loadSavedSettings() {
    const savedSettings = localStorage.getItem('smtpSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      
      // フォームに値を設定
      if (document.getElementById('smtp_host')) document.getElementById('smtp_host').value = settings.host || '';
      if (document.getElementById('smtp_port')) document.getElementById('smtp_port').value = settings.port || '587';
      if (document.getElementById('smtp_secure')) document.getElementById('smtp_secure').checked = settings.secure || false;
      if (document.getElementById('smtp_user')) document.getElementById('smtp_user').value = settings.user || '';
      if (document.getElementById('smtp_password')) document.getElementById('smtp_password').value = settings.password || '';
    }
  }
  
  // トースト通知の表示
  function showToast(title, description, type = 'success') {
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
  }
  
  // トースト閉じるボタン
  const toastClose = document.querySelector('.toast-close');
  if (toastClose) {
    toastClose.addEventListener('click', () => {
      const toast = document.getElementById('toast');
      if (toast) toast.classList.remove('show');
    });
  }
});