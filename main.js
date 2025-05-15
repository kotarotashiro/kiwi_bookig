document.addEventListener('DOMContentLoaded', function() {
  // 共通の初期化処理
  console.log('Kiwi no Kuni - サイト初期化完了');
  
  // モバイルメニューの処理（必要に応じて実装）
  
  // 予約ボタンのイベントリスナー
  const reservationButtons = document.querySelectorAll('.btn');
  reservationButtons.forEach(button => {
    if (button.textContent.includes('予約する')) {
      button.addEventListener('click', function(e) {
        // 予約ページへの遷移前に必要な処理があれば実装
        console.log('予約ボタンがクリックされました');
      });
    }
  });
});