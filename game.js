document.addEventListener('keydown', function(event) {
    const key = event.key.toUpperCase();
    const button = document.getElementById(key);
    if (button) {
        button.classList.add('pressed');
    }
});

document.addEventListener('keyup', function(event) {
    const key = event.key.toUpperCase();
    const button = document.getElementById(key);
    if (button) {
        button.classList.remove('pressed');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const letterElement = document.getElementById('letter');
    const positiveScoreElement = document.getElementById('positive-score');
    const negativeScoreElement = document.getElementById('negative-score');
    const startButton = document.getElementById('start-button');
    const timeLeftElement = document.getElementById('time-left');
    const resultElement = document.getElementById('result');
    let positiveScore = 0;
    let negativeScore = 0;
    let currentLetter = null;
    let timeLeft = 30; // 制限時間（秒）
    let timer = null;

    // ランダムなアルファベットを生成
    function getRandomLetter() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return letters[Math.floor(Math.random() * letters.length)];
    }

    // 新しいアルファベットを表示
    function showNewLetter() {
        currentLetter = getRandomLetter();
        letterElement.textContent = currentLetter;
        letterElement.style.color = 'black'; // 色を黒にリセット
    }

    // ゲームを開始
    function startGame() {
        positiveScore = 0;
        negativeScore = 0;
        timeLeft = 30;
        resultElement.style.display = 'none';
        positiveScoreElement.textContent = positiveScore;
        negativeScoreElement.textContent = negativeScore;
        timeLeftElement.textContent = timeLeft;

        showNewLetter();

        timer = setInterval(() => {
            timeLeft--;
            timeLeftElement.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(timer);
                endGame();
            }
        }, 1000);
    }

    // ゲームを終了
    function endGame() {
        resultElement.style.display = 'block';
        letterElement.textContent = '';
        document.removeEventListener('keydown', handleKeydown);
    }

    // キーが押されたときの処理
    function handleKeydown(event) {
        const pressedKey = event.key.toUpperCase();

        if (pressedKey === currentLetter) {
            positiveScore++;
            showNewLetter();
        } else {
            negativeScore++;
            letterElement.style.color = 'red'; // 色を赤に変更
        }

        positiveScoreElement.textContent = positiveScore;
        negativeScoreElement.textContent = negativeScore;
    }

    startButton.addEventListener('click', () => {
        clearInterval(timer); // 既存のタイマーをクリア
        startGame();
        document.addEventListener('keydown', handleKeydown);
    });
});
