// These are the three values that change as the user interacts with the page.
let selectedCat = "";
let selectedAction = "";
let noiseLevel = 25;

// These constants connect JavaScript to elements in the HTML.
const catButtons = document.querySelectorAll(".cat-button");
const actionButtons = document.querySelectorAll(".action-button");
const noiseSlider = document.querySelector("#noise-slider");
const noiseValue = document.querySelector("#noise-value");
const responseArea = document.querySelector("#response-area");
const responseText = document.querySelector("#response-text");

// These names make the short data values friendlier when they appear on screen.
const catNames = {
  sweet: "Mantou (馒头)",
  shy: "Naicha (奶茶)",
  playful: "Xuegao (雪糕)"
};

const actionNames = {
  pet: "Pet",
  feed: "Feed",
  play: "Play",
  space: "Give Space"
};

// Check all three input variables and choose one response.
function updateResponse() {
  let message = "";
  let backgroundColor = "#e7def7";

  if (selectedCat === "") {
    message = "Choose a cat before choosing an action.";
  } else if (selectedAction === "") {
    message = catNames[selectedCat] + " is ready. Now choose an action!";
  } else if (selectedAction === "space") {
    message = catNames[selectedCat] + " feels calm and comfortable with some space.";
    backgroundColor = "#fff3cf";
  } else if (selectedCat === "sweet" && selectedAction === "pet") {
    message = "Mantou (馒头) feels happy and purrs when you pet it!";
    backgroundColor = "#f7d9df";
  } else if (
    selectedCat === "shy" &&
    selectedAction === "pet" &&
    noiseLevel <= 50
  ) {
    message = "Naicha (奶茶) feels relaxed because you are petting it in a quiet room.";
    backgroundColor = "#dff2e3";
  } else if (
    selectedCat === "shy" &&
    selectedAction === "pet" &&
    noiseLevel > 50
  ) {
    message = "Naicha (奶茶) feels nervous because the room is noisy.";
    backgroundColor = "#ffe0d6";
  } else if (selectedCat === "playful" && selectedAction === "play") {
    message = "Xuegao (雪糕) feels excited and is ready to play!";
    backgroundColor = "#fff0b8";
  } else if (selectedCat === "playful" && selectedAction === "feed") {
    message = "Xuegao (雪糕) feels happy because it loves food!";
    backgroundColor = "#f7d9df";
  } else {
    message =
      catNames[selectedCat] +
      " is curious about the " +
      actionNames[selectedAction] +
      " action.";
  }

  responseText.textContent = message;
  responseArea.style.backgroundColor = backgroundColor;
}

// Listen for a click on each cat button.
catButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    selectedCat = button.dataset.cat;

    catButtons.forEach(function (catButton) {
      catButton.classList.remove("selected");
      catButton.setAttribute("aria-pressed", "false");
    });

    button.classList.add("selected");
    button.setAttribute("aria-pressed", "true");
    updateResponse();
  });
});

// Listen for a click on each action button.
actionButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    selectedAction = button.dataset.action;

    actionButtons.forEach(function (actionButton) {
      actionButton.classList.remove("selected");
      actionButton.setAttribute("aria-pressed", "false");
    });

    button.classList.add("selected");
    button.setAttribute("aria-pressed", "true");
    updateResponse();
  });
});

// The input event runs continuously while the slider moves.
noiseSlider.addEventListener("input", function () {
  noiseLevel = Number(noiseSlider.value);

  if (noiseLevel <= 50) {
    noiseValue.textContent = "Current level: Quiet (" + noiseLevel + ")";
  } else {
    noiseValue.textContent = "Current level: Noisy (" + noiseLevel + ")";
  }

  updateResponse();
});
