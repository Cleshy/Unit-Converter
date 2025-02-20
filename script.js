/*

1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound

Requirements:

- Follow the design spec
- Generate all conversions when the user clicks "Convert"
- Round the numbers down to three decimal places

*/

const CONVERSION_RATES = {
  meterToFeet: 3.281,
  feetToMeter: 0.3048,
  literToGallon: 0.2642,
  gallonToLiter: 3.785,
  kgToPound: 2.205,
  poundToKg: 0.4536,
};

const inputEl = document.getElementById("input-el");
const convertBtn = document.getElementById("convert-btn");
const iconContainer = document.querySelector(".icon-container");
const errorMessage = document.querySelector(".error-message");

console.log(iconContainer);

const inputTexts = document.querySelectorAll(".input-value");
const conversionTexts = document.querySelectorAll(".conversion");

convertBtn.addEventListener("click", function () {
  const inputValue = parseFloat(inputEl.value);

  if (!isNaN(inputValue) && inputValue > 0) {
    const conversions = calculateConversions(inputValue);
    setCurrentValueTexts(inputValue);
    setConversionValues(conversions);
  } else {
    errorMessage.classList.add("show");

    setTimeout(function () {
      errorMessage.classList.remove("show");
    }, 2000);
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
  const icons = document.querySelectorAll(".icon");
  const isDarkMode = localStorage.getItem("theme") === "dark";

  body.classList.toggle("dark-mode", isDarkMode);
  icons[0].classList.toggle("hidden", isDarkMode);
  icons[1].classList.toggle("hidden", !isDarkMode);

  icons.forEach((icon) => {
    icon.addEventListener("click", () => {
      const darkModeEnabled = body.classList.toggle("dark-mode");
      localStorage.setItem("theme", darkModeEnabled ? "dark" : "light");

      icons.forEach((i) => i.classList.toggle("hidden"));
    });
  });
});
