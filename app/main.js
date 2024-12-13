document.addEventListener("DOMContentLoaded", function () {
  const symbols = ["Cherry", "Lemon", "Melon", "Orange"];
  let balance = 100;

  function spinMachine() {
    const spinResult = [];
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * symbols.length);
      spinResult.push(symbols[randomIndex]);
    }
    return spinResult;
  }

  function calculateWinnings(spinResult, betAmount) {
    if (spinResult[0] === spinResult[1] && spinResult[1] === spinResult[2]) {
      return betAmount * 10;
    }
    return 0;
  }

  function updateBalance() {
    document.getElementById(
      "balance"
    ).innerText = `Your current balance is: $${balance}`;
  }

  function displaySpinResult(result) {
    document.getElementById("spinResult").innerHTML = `
          <div class="slot">${result[0]}</div>
          <div class="slot">${result[1]}</div>
          <div class="slot">${result[2]}</div>
      `;
  }

  function animateSpin() {
    const slots = document.querySelectorAll(".slot");
    let count = 0;

    const interval = setInterval(() => {
      for (let i = 0; i < 3; i++) {
        const randomSymbol =
          symbols[Math.floor(Math.random() * symbols.length)];
        slots[i].textContent = randomSymbol;
      }
      count++;

      if (count === 30) {
        clearInterval(interval);
      }
    }, 50);

    return new Promise((resolve) => {
      setTimeout(() => resolve(), 1500);
    });
  }

  async function handleSpin() {
    const betAmount = parseFloat(document.getElementById("betAmount").value);

    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
      alert("Invalid bet amount. Please try again.");
      return;
    }

    await animateSpin();

    const spinResult = spinMachine();
    displaySpinResult(spinResult);

    const winnings = calculateWinnings(spinResult, betAmount);
    if (winnings > 0) {
      alert(`Congratulations! You won $${winnings}!`);
      balance += winnings;
    } else {
      alert("No match. Better luck next time!");
      balance -= betAmount;
    }

    updateBalance();

    if (balance <= 0) {
      alert("You ran out of money. Game over!");
      document.getElementById("spinButton").disabled = true;
      document.getElementById("betAmount").disabled = true;
    }
  }

  document.getElementById("spinButton").addEventListener("click", handleSpin);

  updateBalance();
});
