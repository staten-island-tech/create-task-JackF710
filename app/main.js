const symbols = ["Cherry", "Lemon", "Melon", "Orange"];

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

function displayBalance(balance) {
  console.log(`Your current balance is: $${balance}`);
}

function playSlotMachine() {
  let balance = 100;
  let keepPlaying = true;

  while (keepPlaying && balance > 0) {
    displayBalance(balance);

    const betAmount = parseFloat(prompt("Enter your bet amount: "));

    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
      console.log("Invalid bet amount. Please try again.");
      continue;
    }

    const spinResult = spinMachine();
    console.log(`Spin result: ${spinResult.join(" | ")}`);

    const winnings = calculateWinnings(spinResult, betAmount);
    if (winnings > 0) {
      console.log(`Congratulations! You won $${winnings}!`);
      balance += winnings;
    } else {
      console.log("No match. Better luck next time!");
      balance -= betAmount;
    }

    if (balance <= 0) {
      console.log("You ran out of money. Game over!");
      break;
    }

    keepPlaying = confirm("Do you want to play again?");
  }

  console.log("Thank you for playing! Your final balance is: $" + balance);
}

playSlotMachine();
