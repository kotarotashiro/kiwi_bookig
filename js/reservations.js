document.addEventListener('DOMContentLoaded', function() {
  // 日付フィルター初期化
  const dateFrom = document.getElementById('filter-date-from');
  const dateTo = document.getElementById('filter-date-to');
  
  if (dateFrom && dateTo) {
    flatpickr(dateFrom, {
      locale: 'ja',
      dateFormat: 'Y/m/d'
    });
    
    flatpickr(dateTo, {
      locale: 'ja',
      dateFormat: 'Y/m/d'
    });
  }
  
  // 全選択チェックボックス
  const selectAll = document.getElementById('select-all');
  const checkboxes = document.querySelectorAll('input[name="reservation[]"]');
  
  if (selectAll && checkboxes.length > 0) {
    selectAll.addEventListener('change', function() {
      const isChecked = this.checked;
      checkboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
      });
    });
    
    // 個別チェックボックスの変更を監視
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', updateSelectAllState);
    });
    
    function updateSelectAllState() {
      const checkedCount = document.querySelectorAll('input[name="reservation[]"]:checked').length;
      selectAll.checked = checkedCount === checkboxes.length;
      selectAll.indeterminate = checkedCount > 0 && checkedCount < checkboxes.length;
    }
  }
  
  // フィルター適用
  const applyFilters = document.getElementById('apply-filters');
  if (applyFilters) {
    applyFilters.addEventListener('click', function() {
      const status = document.getElementById('filter-status').value;
      const experience = document.getElementById('filter-experience').value;
      const dateFromValue = dateFrom ? dateFrom.value : '';
      const dateToValue = dateTo ? dateTo.value : '';
      const searchTerm = document.getElementById('search-reservations').value;
      
      // 実際のシステムではAPIを呼び出し
      console.log('フィルター適用:', {
        status,
        experience,
        dateFrom: dateFromValue,
        dateTo: dateToValue,
        searchTerm
      });
      
      // フィルター適用メッセージ
      showToast('フィルター適用', 'フィルターが適用されました');
    });
  }
  
  // フィルターリセット
  const resetFilters = document.getElementById('reset-filters');
  if (resetFilters) {
    resetFilters.addEventListener('click', function() {
      const filterStatus = document.getElementById('filter-status');
      const filterExperience = document.getElementById('filter-experience');
      const searchReservations = document.getElementById('search-reservations');
      
      if (filterStatus) filterStatus.value = '';
      if (filterExperience) filterExperience.value = '';
      if (dateFrom) dateFrom.value = '';
      if (dateTo) dateTo.value = '';
      if (searchReservations) searchReservations.value = '';
      
      // 実際のシステムではAPIを呼び出し
      console.log('フィルターリセット');
      
      // リセットメッセージ
      showToast('フィルターリセット', 'フィルターがリセットされました');
    });
  }
  
  // CSVエクスポート
  const exportCsv = document.getElementById('export-csv');
  if (exportCsv) {
    exportCsv.addEventListener('click', function() {
      // 実際のシステムではAPIを呼び出し
      console.log('CSVエクスポート');
      
      // エクスポートメッセージ
      showToast('エクスポート完了', '予約データがCSVでエクスポートされました');
    });
  }
  
  // 新規予約ボタン
  const newReservation = document.getElementById('new-reservation');
  if (newReservation) {
    newReservation.addEventListener('click', function() {
      // 実際のシステムでは新規予約フォームへ遷移
      console.log('新規予約作成');
    });
  }
  
  // 予約詳細モーダル表示
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
  
  // 削除ボタン
  const deleteButtons = document.querySelectorAll('.action-delete');
  if (deleteButtons.length > 0) {
    deleteButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('この予約を削除してもよろしいですか？')) {
          // 実際のシステムではAPIを呼び出し
          console.log('予約削除');
          
          // 削除メッセージ
          showToast('削除完了', '予約が削除されました');
        }
      });
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