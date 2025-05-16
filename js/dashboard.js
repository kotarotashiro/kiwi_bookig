document.addEventListener('DOMContentLoaded', function() {
  // 日付範囲選択
  const dateRange = document.getElementById('date-range');
  const customDateRange = document.getElementById('custom-date-range');
  const dateFrom = document.getElementById('date-from');
  const dateTo = document.getElementById('date-to');
  
  if (dateRange) {
    dateRange.addEventListener('change', function() {
      if (this.value === 'custom') {
        customDateRange.style.display = 'flex';
      } else {
        customDateRange.style.display = 'none';
      }
    });
  }
  
  // 日本語カレンダー初期化
  if (dateFrom && dateTo) {
    flatpickr(dateFrom, {
      locale: 'ja',
      dateFormat: 'Y/m/d',
      maxDate: 'today'
    });
    
    flatpickr(dateTo, {
      locale: 'ja',
      dateFormat: 'Y/m/d',
      maxDate: 'today'
    });
  }
  
  // グラフタイプ切り替え
  const chartType = document.getElementById('chart-type');
  if (chartType) {
    chartType.addEventListener('change', function() {
      // 実際のシステムではここでグラフデータを更新
      console.log('グラフタイプ変更:', this.value);
    });
  }
  
  // 予約詳細モーダル表示（予約一覧ページ用）
  const viewButtons = document.querySelectorAll('.action-view');
  const reservationModal = document.getElementById('reservation-modal');
  const modalClose = document.querySelector('.wp-modal-close');
  const modalCloseBtn = document.getElementById('modal-close');
  
  if (viewButtons.length > 0 && reservationModal) {
    viewButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        reservationModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
      });
    });
    
    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }
    
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closeModal);
    }
    
    // モーダル外クリックで閉じる
    window.addEventListener('click', function(e) {
      if (e.target === reservationModal) {
        closeModal();
      }
    });
    
    function closeModal() {
      reservationModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  }
  
  // 予約ステータス変更
  const reservationStatus = document.getElementById('reservation-status');
  const modalSave = document.getElementById('modal-save');
  
  if (reservationStatus && modalSave) {
    modalSave.addEventListener('click', function() {
      const newStatus = reservationStatus.value;
      
      // 実際のシステムではAPIを呼び出し
      console.log('ステータス変更:', newStatus);
      
      // 成功メッセージ
      showToast('更新完了', '予約情報が更新されました');
      
      // モーダルを閉じる
      closeModal();
    });
  }
  
  // トースト通知の表示
  function showToast(title, description) {
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toastTitle');
    const toastDescription = document.getElementById('toastDescription');
    
    if (!toast || !toastTitle || !toastDescription) return;
    
    toastTitle.textContent = title;
    toastDescription.textContent = description;
    
    toast.classList.add('show');
    
    // 5秒後に自動で閉じる
    setTimeout(() => {
      toast.classList.remove('show');
    }, 5000);
  }
});