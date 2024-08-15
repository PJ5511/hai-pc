document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('wheelcanvas');
    const ctx = canvas.getContext('2d');
    const spinButton = document.getElementById('spinButton');

    // 刪除不需要的獎品項目後的獎品列表
    const prizes = [
        { name: '當筆折扣1000元', probability: 0.25, url: 'result1.html' },
        { name: '當筆95折優惠', probability: 0.75, url: 'result2.html' },
        { name: '品牌周邊小物', probability: 44, url: 'result4.html' },
        { name: '品牌精選首飾', probability: 55, url: 'result5.html' }
    ];

    const prizeColors = ['#FFDDC1', '#FFABAB', '#FFC3A0', '#FF677D', '#D4A5A5', '#392F5A'];
    const totalProbability = prizes.reduce((sum, prize) => sum + prize.probability, 0);

    function drawWheel() {
        const numSegments = prizes.length;
        const angleStep = (2 * Math.PI) / numSegments;

        prizes.forEach((prize, index) => {
            const startAngle = index * angleStep;
            const endAngle = (index + 1) * angleStep;
            ctx.beginPath();
            ctx.moveTo(250, 250);
            ctx.arc(250, 250, 250, startAngle, endAngle);
            ctx.closePath();
            ctx.fillStyle = prizeColors[index % prizeColors.length];
            ctx.fill();
            ctx.save();

            ctx.translate(250 + Math.cos(startAngle + angleStep / 2) * 150, 250 + Math.sin(startAngle + angleStep / 2) * 150);
            ctx.rotate(startAngle + angleStep / 2 + Math.PI / 2);
            ctx.textAlign = 'center';
            ctx.fillStyle = 'black';
            ctx.font = '20px Arial';
            ctx.fillText(prize.name, 0, 0);
            ctx.restore();
        });
    }

    function spinWheel() {
        const randomValue = Math.random() * totalProbability;
        let accumulatedProbability = 0;
        let selectedPrize = null;

        for (let prize of prizes) {
            accumulatedProbability += prize.probability;
            if (randomValue <= accumulatedProbability) {
                selectedPrize = prize;
                break;
            }
        }

        localStorage.setItem('prize', selectedPrize.name);
        window.location.href = selectedPrize.url; // 自動跳轉到對應的結果頁面
    }

    drawWheel();

    spinButton.onclick = function() {
        spinWheel();
    };
});
