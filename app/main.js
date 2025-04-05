let balance = 1000;
const symbols = ["🍒", "🍋", "🍇", "🍊", "🍍"];

document.addEventListener("DOMContentLoaded", () => {
  const spinButton = document.getElementById("spin-button");
  const resultMessage = document.getElementById("result-message");
  const balanceMessage = document.getElementById("balance-message");
  const wagerInput = document.getElementById("wager");

  function spinSlots(wager) {
    const slot1 = document.getElementById("slot1");
    const slot2 = document.getElementById("slot2");
    const slot3 = document.getElementById("slot3");

    resultMessage.textContent = "Spinning...";

    const spinDuration = 2000;
    let spinInterval = setInterval(() => {
      slot1.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      slot2.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      slot3.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    }, 100);

    setTimeout(() => {
      clearInterval(spinInterval);

      const result = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ];

      slot1.textContent = result[0];
      slot2.textContent = result[1];
      slot3.textContent = result[2];

      let winnings = 0;

      if (result[0] === result[1] && result[1] === result[2]) {
        winnings = wager * 10; 
        resultMessage.textContent = `🎉 Jackpot! You win $${winnings}!`;
      } else if (result[0] === result[1] || result[1] === result[2] || result[0] === result[2]) {
        winnings = wager;
        resultMessage.textContent = `✅ Two match! You get your $${wager} back.`;
      } else {
        winnings = 0; 
        resultMessage.textContent = "❌ No match. You lose your wager.";
      }

      balance = balance - wager + winnings;
      balanceMessage.textContent = `Balance: $${balance}`;

      if (balance <= 0) {
        resultMessage.textContent += " Game Over!";
        document.getElementById("spin-button").disabled = true;
      }
    }, spinDuration); 
  }

  // Event listener for the Spin button
  spinButton.addEventListener("click", () => {
    let wager = parseInt(wagerInput.value);

    if (isNaN(wager) || wager <= 0) {
      resultMessage.textContent = "Enter a valid wager!";
      return;
    }

    if (wager > balance) {
      resultMessage.textContent = "Insufficient funds!";
      return;
    }

    spinSlots(wager);  
  });
});
