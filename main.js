const birthday = document.querySelector("#birthdate");
const resultBox = document.querySelector("#result");

// 設定可選最大日期 = 今日
birthday.max = new Date().toISOString().split("T")[0];

// 載入 localStorage 的資料
window.onload = function () {
  const savedDate = localStorage.getItem("dog-birthdate");
  const savedDogAge = localStorage.getItem("dog-age");
  const savedHumanAge = localStorage.getItem("human-age");

  if (savedDate) {
    birthday.value = savedDate;
  }

  if (savedDogAge && savedHumanAge) {
    document.getElementById("dogAge").textContent = savedDogAge;
    document.getElementById("humanAge").textContent = savedHumanAge;
    resultBox.style.display = "block";
  }
};

// 計算函式
function calculateAge() {
  const birthdateInput = birthday.value;

  if (!birthdateInput) {
    alert("請選擇狗狗的出生日期！");
    return;
  }

  const birthdate = new Date(birthdateInput);
  const today = new Date();

  const ageInMilliseconds = today - birthdate;
  const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);

  // 狗齡換算人類年齡
  let humanAge;
  if (ageInYears <= 1) {
    humanAge = ageInYears * 15;
  } else if (ageInYears <= 2) {
    humanAge = 15 + (ageInYears - 1) * 9;
  } else {
    humanAge = 24 + (ageInYears - 2) * 5;
  }

  const dogAgeRounded = ageInYears.toFixed(1);
  const humanAgeRounded = humanAge.toFixed(1);

  // 顯示結果
  document.getElementById("dogAge").textContent = dogAgeRounded;
  document.getElementById("humanAge").textContent = humanAgeRounded;
  resultBox.style.display = "block";

  // 儲存到 localStorage
  localStorage.setItem("dog-birthdate", birthdateInput);
  localStorage.setItem("dog-age", dogAgeRounded);
  localStorage.setItem("human-age", humanAgeRounded);
}
