const CONVERSION_RATES = {
  meterToFeet: 3.281,
  feetToMeter: 0.3048,
  literToGallon: 0.2642,
  gallonToLiter: 3.785,
  kgToPound: 2.205,
  poundToKg: 0.4536,
};

const INPUT_MIN_VALUE = 1;
const INPUT_MAX_VALUE = 10000;

const inputEl = document.getElementById("input-el");
const convertBtn = document.getElementById("convert-btn");
const iconContainer = document.querySelector(".icon-container");
const errorMessage = document.querySelector(".error-message");

const inputTexts = document.querySelectorAll(".input-value");
const conversionTexts = document.querySelectorAll(".conversion");

convertBtn.addEventListener("click", function () {
  if (
    inputEl.value >= INPUT_MIN_VALUE &&
    inputEl.value <= INPUT_MAX_VALUE &&
    !isNaN(inputEl.value)
  ) {
    const inputValue = parseFloat(inputEl.value);

    const conversions = calculateConversions(inputValue);
    setCurrentValueTexts(inputValue);
    setConversionValues(conversions);
  } else {
    showErrorMessage(
      `Please enter a number between ${INPUT_MIN_VALUE} and ${INPUT_MAX_VALUE}!`
    );
  }
});

function calculateConversions(value) {
  return {
    feet: calculateConversion(value, CONVERSION_RATES.meterToFeet),
    meter: calculateConversion(value, CONVERSION_RATES.feetToMeter),
    gallon: calculateConversion(value, CONVERSION_RATES.literToGallon),
    liter: calculateConversion(value, CONVERSION_RATES.gallonToLiter),
    pound: calculateConversion(value, CONVERSION_RATES.kgToPound),
    kilo: calculateConversion(value, CONVERSION_RATES.poundToKg),
  };
}

function calculateConversion(value, rate) {
  return (value * rate).toFixed(3);
}

function setCurrentValueTexts(currentValue) {
  for (let i = 0; i < inputTexts.length; i++) {
    inputTexts[i].textContent = currentValue;
  }
}

function setConversionValues(conversions) {
  const units = {
    feet: "feet",
    meter: "meter",
    gallon: "gallon",
    liter: "liter",
    pound: "pound",
    kilo: "kilo",
  };

  conversionTexts.forEach((el) => {
    const unit = el.dataset.unit;
    el.textContent = conversions[units[unit]];
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const modeToggleBtn = document.querySelector(".mode-toggler");
  const icons = modeToggleBtn.querySelectorAll("ion-icon");
  const isDarkMode = localStorage.getItem("theme") === "dark";

  body.classList.toggle("dark-mode", isDarkMode);
  icons[0].classList.toggle("hidden", isDarkMode);
  icons[1].classList.toggle("hidden", !isDarkMode);

  modeToggleBtn.setAttribute(
    "aria-label",
    isDarkMode ? "Enable light mode" : "Enable dark mode"
  );
  modeToggleBtn.setAttribute("aria-pressed", isDarkMode);

  modeToggleBtn.addEventListener("click", () => {
    const darkModeEnabled = body.classList.toggle("dark-mode");
    localStorage.setItem("theme", darkModeEnabled ? "dark" : "light");

    icons.forEach((icon) => icon.classList.toggle("hidden"));

    modeToggleBtn.setAttribute(
      "aria-label",
      darkModeEnabled ? "Enable light mode" : "Enable dark mode"
    );

    modeToggleBtn.setAttribute("aria-pressed", darkModeEnabled);
  });
});

function showErrorMessage(message) {
  errorMessage.textContent = message;
  errorMessage.classList.add("show");

  setTimeout(() => {
    errorMessage.classList.remove("show");
  }, 2500);
}
