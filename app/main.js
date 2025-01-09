// Symbols for the slot machine 🍒🍋🍉🍇🍊🍍🍓🍑🍏🍊
const symbols = ["🍒", "🍋", "🍉", "🍇", "🍊", "🍍", "🍓", "🍑", "🍏", "🍊"];

// Starting balance 💸
let balance = 100;

// Function to randomly select 3 symbols 🎰
function spinMachine() {
  const spinResult = [];
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * symbols.length);
    spinResult.push(symbols[randomIndex]);
  }
  return spinResult;
}

// Function to calculate winnings 🏆
function calculateWinnings(spinResult, betAmount) {
  if (spinResult[0] === spinResult[1] && spinResult[1] === spinResult[2]) {
    return betAmount * 10; // 10x winnings if all symbols match 🎉
  }
  return 0; // No winnings if symbols do not match 💔
}

// Update the balance on the screen 💵
function updateBalance() {
  document.getElementById(
    "balance"
  ).textContent = `Your current balance is: $${balance} 💰`;
}

// Animate the spin effect 🔄
function animateSpin() {
  const slots = document.querySelectorAll(".slot");
  let count = 0;

  const interval = setInterval(() => {
    for (let i = 0; i < 3; i++) {
      const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
      slots[i].textContent = randomSymbol; // Use textContent to update the symbol 🍒🍋🍉
    }
    count++;

    // After 30 updates, stop the animation ⏳
    if (count === 30) {
      clearInterval(interval);
    }
  }, 100); // Update every 100ms ⏱️

  return new Promise((resolve) => {
    setTimeout(() => resolve(), 2000); // Wait 2 seconds before showing the final result ⏳
  });
}

// Handle the spin button click event 🖱️
async function handleSpin() {
  const betAmount = Number(document.getElementById("betAmount").value); // Convert to number 🔢

  // Validate bet amount 🚫
  if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
    alert("Invalid bet amount. Please try again. 💸");
    return;
  }

  // Deduct the bet amount from the balance before spinning 💳
  balance -= betAmount;
  updateBalance();

  // Start the spin animation 🎰
  await animateSpin();

  // Get the final spin result after the animation 🎉
  const spinResult = spinMachine();
  displaySpinResult(spinResult);

  // Calculate winnings 🏆
  const winnings = calculateWinnings(spinResult, betAmount);
  if (winnings > 0) {
    alert(`🎉 Congratulations! You won $${winnings} 🏆`);
    balance += winnings;
  } else {
    alert("😢 No match. Better luck next time! 🍀");
  }

  // Update balance after the spin 💰
  updateBalance();

  // Check if balance is zero or below and disable the game if so ⛔
  if (balance <= 0) {
    alert("💔 You ran out of money. Game over! ⛔");
    document.getElementById("spinButton").disabled = true;
    document.getElementById("betAmount").disabled = true;
  }
}

// Function to display the spin result on the screen 🎰
function displaySpinResult(spinResult) {
  const slots = document.querySelectorAll(".slot");
  for (let i = 0; i < 3; i++) {
    slots[i].textContent = spinResult[i]; // Set final symbol after animation 🍍
  }
}

// Add event listener to the spin button 🖱️
document.getElementById("spinButton").addEventListener("click", handleSpin);

// Initialize the game with the current balance 💵
updateBalance();
