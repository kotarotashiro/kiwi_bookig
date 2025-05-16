document.addEventListener('DOMContentLoaded', function() {
  // URLからパラメータを取得
  const urlParams = new URLSearchParams(window.location.search);
  const reservationId = urlParams.get('reservationId');
  
  // 予約IDを表示
  const reservationIdElement = document.getElementById('reservationId');
  if (reservationIdElement && reservationId) {
    reservationIdElement.textContent = reservationId;
  }
  
  // ローカルストレージから予約情報を取得（実際のシステムではAPIから取得）
  const lastReservation = localStorage.getItem('lastReservation');
  if (lastReservation) {
    const reservationData = JSON.parse(lastReservation);
    console.log('予約情報:', reservationData);
    
    // 必要に応じて予約情報を表示
    // ...
  }
  
  // カウントダウンタイマー
  let countdown = 10;
  const redirectMessage = document.getElementById('redirectMessage');
  
  const timer = setInterval(() => {
    countdown--;
    if (redirectMessage) {
      redirectMessage.textContent = `${countdown}秒後にホームページに戻ります...`;
    }
    
    if (countdown <= 0) {
      clearInterval(timer);
      // ホームページにリダイレクト
      window.location.href = 'index.html';
    }
  }, 1000);
});