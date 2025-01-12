const symbols = ["🍒", "🍋", "🍇", "🍊", "🍍"];
let balance = 1000;

document.getElementById("spin-button").addEventListener("click", () => {
  const wagerInput = document.getElementById("wager");
  const resultMessage = document.getElementById("result-message");
  const balanceMessage = document.getElementById("balance-message");

  let wager = parseInt(wagerInput.value);

  if (isNaN(wager) || wager <= 0) {
    resultMessage.textContent = "Please enter a valid wager!";
    return;
  }

  if (wager > balance) {
    resultMessage.textContent = "You don't have enough balance!";
    return;
  }

  // Start spin animation
  resultMessage.textContent = "Spinning...";
  const slot1 = document.getElementById("slot1");
  const slot2 = document.getElementById("slot2");
  const slot3 = document.getElementById("slot3");

  let animationInterval = setInterval(() => {
    slot1.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    slot2.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    slot3.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  }, 100);

  setTimeout(() => {
    clearInterval(animationInterval);

    // Final spin results
    const finalSymbols = [
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
    ];

    slot1.textContent = finalSymbols[0];
    slot2.textContent = finalSymbols[1];
    slot3.textContent = finalSymbols[2];

    // Calculate result
    if (finalSymbols[0] === finalSymbols[1] && finalSymbols[1] === finalSymbols[2]) {
      balance += wager * 10;
      resultMessage.textContent = "Jackpot! You win $" + wager * 10 + "!";
    } else if (finalSymbols[0] === finalSymbols[1] || finalSymbols[1] === finalSymbols[2] || finalSymbols[0] === finalSymbols[2]) {
      resultMessage.textContent = "You get your wager back: $" + wager;
    } else {
      balance -= wager;
      resultMessage.textContent = "You lose! Better luck next time.";
    }

    balanceMessage.textContent = "Balance: $" + balance;

    if (balance <= 0) {
      resultMessage.textContent = "Game Over! You're out of money.";
      document.getElementById("spin-button").disabled = true;
    }
  }, 3000);
});
