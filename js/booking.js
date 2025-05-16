document.addEventListener('DOMContentLoaded', function() {
  // DOM要素
  const datepicker = document.getElementById('datepicker');
  const timeSlotCard = document.getElementById('timeSlotCard');
  const timeSlots = document.getElementById('timeSlots');
  const selectedDateDisplay = document.getElementById('selectedDateDisplay');
  const summaryDate = document.getElementById('summaryDate');
  const summaryTime = document.getElementById('summaryTime');
  const participants = document.getElementById('participants');
  const totalPrice = document.getElementById('totalPrice');
  const nextButton = document.getElementById('nextButton');
  const backButton = document.getElementById('backButton');
  const submitButton = document.getElementById('submitButton');
  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const customerForm = document.getElementById('customerForm');
  const toast = document.getElementById('toast');
  const toastTitle = document.getElementById('toastTitle');
  const toastDescription = document.getElementById('toastDescription');
  const toastClose = document.querySelector('.toast-close');

  // 状態管理
  let selectedDate = null;
  let selectedTimeSlotValue = null;
  const pricePerPerson = 3800;
  const experienceName = 'キウイ収穫体験';

  // 予約可能な時間枠（実際のシステムではAPIから取得）
  const availableTimeSlots = [
    { id: 1, time: '11:00 ~ 12:00', available: 2 },
    { id: 2, time: '12:00 ~ 13:00', available: 2 },
    { id: 3, time: '13:00 ~ 14:00', available: 2 },
    { id: 4, time: '14:00 ~ 15:00', available: 2 },
    { id: 5, time: '15:00 ~ 16:00', available: 2 },
  ];

  // 日本語カレンダー初期化
  flatpickr(datepicker, {
    locale: 'ja',
    dateFormat: 'Y年m月d日(D)',
    minDate: 'today',
    disableMobile: true,
    onChange: function(selectedDates, dateStr) {
      selectedDate = selectedDates[0];
      summaryDate.textContent = dateStr;
      selectedDateDisplay.textContent = dateStr + 'の予約可能時間';
      renderTimeSlots();
      timeSlotCard.style.display = 'block';
      checkNextButtonState();
    }
  });

  // 時間枠の表示
  function renderTimeSlots() {
    timeSlots.innerHTML = '';
    
    // 実際のシステムでは選択された日付に基づいて利用可能な時間枠をAPIから取得
    // ここではランダムに利用可能枠を生成
    const slots = availableTimeSlots.map(slot => ({
      ...slot,
      available: Math.floor(Math.random() * 5) + 1 // 1-5の範囲でランダムに設定
    }));
    
    slots.forEach(slot => {
      const isDisabled = slot.available === 0;
      const isSelected = selectedTimeSlotValue === slot.time;
      
      const timeSlotElement = document.createElement('button');
      timeSlotElement.className = `time-slot ${isSelected ? 'selected' : ''} ${isDisabled ? 'time-slot-disabled' : ''}`;
      timeSlotElement.disabled = isDisabled;
      timeSlotElement.innerHTML = `
        <span class="time-slot-time">
          <i class="fas fa-clock"></i>
          ${slot.time}
        </span>
        <span class="time-slot-availability">残り${slot.available}枠</span>
      `;
      
      if (!isDisabled) {
        timeSlotElement.addEventListener('click', () => {
          // 以前に選択された時間枠から選択状態を削除
          const previousSelected = timeSlots.querySelector('.selected');
          if (previousSelected) {
            previousSelected.classList.remove('selected');
          }
          
          // 新しい時間枠を選択状態に
          timeSlotElement.classList.add('selected');
          selectedTimeSlotValue = slot.time;
          summaryTime.textContent = slot.time;
          checkNextButtonState();
        });
      }
      
      timeSlots.appendChild(timeSlotElement);
    });
  }

  // 参加人数変更時の合計金額更新
  participants.addEventListener('change', updateTotalPrice);

  function updateTotalPrice() {
    const count = parseInt(participants.value);
    const total = pricePerPerson * count;
    totalPrice.textContent = '¥' + total.toLocaleString();
  }

  // 次へボタンの状態チェック
  function checkNextButtonState() {
    nextButton.disabled = !(selectedDate && selectedTimeSlotValue);
  }

  // 次へボタンクリック
  nextButton.addEventListener('click', () => {
    step1.style.display = 'none';
    step2.style.display = 'block';
    backButton.style.display = 'block';
    nextButton.style.display = 'none';
    submitButton.style.display = 'block';
  });

  // 戻るボタンクリック
  backButton.addEventListener('click', () => {
    step2.style.display = 'none';
    step1.style.display = 'block';
    backButton.style.display = 'none';
    nextButton.style.display = 'block';
    submitButton.style.display = 'none';
  });

  // 予約確定ボタンクリック
  submitButton.addEventListener('click', handleSubmitReservation);

  async function handleSubmitReservation() {
    // フォームバリデーション
    const customerName = document.getElementById('customerName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const notes = document.getElementById('notes').value;

    if (!customerName || !email || !phone) {
      showToast('入力エラー', 'すべての必須項目を入力してください', 'error');
      return;
    }

    if (!selectedDate || !selectedTimeSlotValue) {
      showToast('入力エラー', '日付と時間を選択してください', 'error');
      return;
    }

    // 送信中状態に
    submitButton.disabled = true;
    submitButton.textContent = '送信中...';

    try {
      // 実際のシステムではAPIを呼び出し
      // ここではモックレスポンスを使用
      await new Promise(resolve => setTimeout(resolve, 1500)); // API呼び出しの遅延をシミュレート
      
      // 予約番号の生成（実際のシステムではサーバーから返される）
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const reservationId = `KW-${year}${month}${day}-${randomNum}`;
      
      // 予約情報をローカルストレージに保存（実際のシステムではDBに保存）
      const reservationData = {
        reservationId,
        customerName,
        email,
        phone,
        notes,
        experienceName,
        date: selectedDate,
        timeSlot: selectedTimeSlotValue,
        participants: parseInt(participants.value),
        totalPrice: pricePerPerson * parseInt(participants.value)
      };
      
      localStorage.setItem('lastReservation', JSON.stringify(reservationData));
      
      // 成功トースト表示
      showToast('予約完了', `予約が確定しました。確認メールをお送りしました。予約番号: ${reservationId}`, 'success');
      
      // 予約確認ページへリダイレクト
      setTimeout(() => {
        window.location.href = 'confirmation.html?reservationId=' + reservationId;
      }, 1500);
      
    } catch (error) {
      console.error('予約エラー:', error);
      showToast('エラー', '予約処理中にエラーが発生しました', 'error');
      submitButton.disabled = false;
      submitButton.textContent = '予約を確定する';
    }
  }

  // トースト通知の表示
  function showToast(title, description, type = 'success') {
    toastTitle.textContent = title;
    toastDescription.textContent = description;
    
    // トーストアイコンの設定
    const toastIcon = document.querySelector('.toast-icon i');
    if (type === 'success') {
      toastIcon.className = 'fas fa-check-circle';
      toastIcon.style.color = 'var(--primary-color)';
    } else if (type === 'error') {
      toastIcon.className = 'fas fa-exclamation-circle';
      toastIcon.style.color = '#ef4444';
    }
    
    toast.classList.add('show');
    
    // 5秒後に自動で閉じる
    setTimeout(() => {
      toast.classList.remove('show');
    }, 5000);
  }

  // トースト閉じるボタン
  toastClose.addEventListener('click', () => {
    toast.classList.remove('show');
  });

  // 初期化
  updateTotalPrice();
});