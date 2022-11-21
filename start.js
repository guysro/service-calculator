const cashIn = document.querySelector("#cashIn");
const creditIn = document.querySelector("#creditIn");
const confBtn = document.querySelector("#confBtn");
const dateIn = document.querySelector("#dateIn");
const barDrop = document.querySelector("#barDrop");

let cash = 0;
let credit = 0;
let date = "dd/mm/yyyy";
let cashAfterBar = cash * 0.95;
let credAfterBar = credit * 0.95;

function confStart() {
  cash = cashIn.value;
  credit = creditIn.value;
  date = dateIn.value;
  if (barDrop.checked) {
    cashAfterBar = cash * 0.95;
    credAfterBar = credit * 0.95;
    localStorage["bar"] = cash * 0.05 + credit * 0.05;
  } else {
    cashAfterBar = cash;
    credAfterBar = credit;
    localStorage["bar"] = 0;
  }
  location.href = "addPage.html";
  localStorage["cash"] = cashAfterBar;
  localStorage["cred"] = credAfterBar;
  localStorage["date"] = date;

  // alert(`${date} , ${cash} , ${credit}`);
}

confBtn.addEventListener("click", confStart);
