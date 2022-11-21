const waiterFinish = document.querySelector("#waiterFinish");
const nameIn = document.querySelector("#waiterName");
const hoursIn = document.querySelector("#waiterHours");
const minutesIn = document.querySelector("#waiterMinutes");
const addWaiterBtn = document.querySelector("#addWaiter");
const is70Check = document.querySelector("#is70");
const waiterList = document.querySelector("#waiter-list");
const download = document.querySelector("#download-link");

let is70 = is70Check.checked;
let currentWaiter;
let totalHours70 = 0;
let totalHours = 0;
let cashPerHour70 = 0;
let cashPerHour = 0;
let creditPerHour70 = 0;
let creditPerHour = 0;
let cashHere = localStorage["cash"];
let credHere = localStorage["cred"];
let dateHere = localStorage["date"];
let bar = localStorage["bar"];
let cashAfter70;
let credAfter70;
let cash70 = 0;
let cred70 = 0;

let waiterDetails = [[]];
let waiters = [];
let currentWaiterName = "";
let currentWaiterCash = 0;
let currentWaiterCred = 0;
let currentWaiterIs70 = false;

class waiter {
  name = "";
  hours = 0;
  minutes = 0;
  hoursTotal = 0;
  is70 = false;
  constructor(name, hours, minutes, is70) {
    this.name = name;
    this.minutes = Number(minutes);
    this.hours = Number(hours);
    this.hoursTotal = Number(this.hours + this.minutes / 60);
    this.is70 = is70;
  }
  getTotalHours() {
    return this.hoursTotal;
  }
  getName() {
    return this.name;
  }
  getIs70() {
    return this.is70;
  }
}

function addWaiter() {
  is70 = is70Check.checked;
  currentWaiter = new waiter(
    nameIn.value,
    hoursIn.value,
    minutesIn.value,
    is70
  );
  if (is70) {
    totalHours70 += currentWaiter.getTotalHours();
    totalHours += currentWaiter.getTotalHours();
  } else {
    totalHours += currentWaiter.getTotalHours();
  }
  // console.log(`${totalHours}   ${totalHours70}`);
  nameIn.value = "";
  hoursIn.value = "";
  minutesIn.value = "";
  is70Check.checked = false;
  waiters.push(currentWaiter);
  addWaterToList(
    currentWaiter.getName(),
    currentWaiter.getTotalHours().toFixed(2)
  );
}
function addWaterToList(name, hours) {
  var tempLi = document.createElement("li");
  tempLi.appendChild(document.createTextNode(`${name}: ${hours}`));
  waiterList.appendChild(tempLi);
}
addWaiterBtn.addEventListener("click", addWaiter);

function doneAdding() {
  //70% try

  cashPerHour70 = (cashHere / totalHours) * 0.7;
  creditPerHour70 = (credHere / totalHours) * 0.7;
  // console.log(cashPerHour70 + "  " + creditPerHour70);

  for (var i = 0; i < waiters.length; i++) {
    if (waiters[i].getIs70()) {
      currentWaiterName = waiters[i].getName();
      currentWaiterCash = cashPerHour70 * waiters[i].getTotalHours();
      currentWaiterCash.toFixed(2);
      currentWaiterCred = creditPerHour70 * waiters[i].getTotalHours();
      currentWaiterCred.toFixed(2);
      currentWaiterIs70 = "כן";

      cash70 += currentWaiterCash;
      cred70 += currentWaiterCred;
      totalHours = totalHours - waiters[i].getTotalHours();

      waiterDetails[i] = [
        `שם: ${currentWaiterName} `,
        `מזומן: ${currentWaiterCash} `,
        `אשראי: ${currentWaiterCred} `,
        `70%: ${currentWaiterIs70} `,
        "\n\n",
      ];
    }
  }
  cashAfter70 = cashHere - cash70;
  credAfter70 = credHere - cred70;
  cashPerHour = cashAfter70 / totalHours;
  creditPerHour = credAfter70 / totalHours;

  for (var i = 0; i < waiters.length; i++) {
    if (!waiters[i].getIs70()) {
      currentWaiterName = waiters[i].getName();
      currentWaiterCash = cashPerHour * waiters[i].getTotalHours();
      currentWaiterCash.toFixed(2);
      currentWaiterCred = creditPerHour * waiters[i].getTotalHours();
      currentWaiterCred.toFixed(2);
      currentWaiterIs70 = "לא";

      waiterDetails[i] = [
        `שם: ${currentWaiterName} `,
        `מזומן: ${currentWaiterCash} `,
        `אשראי: ${currentWaiterCred} `,
        `70%: ${currentWaiterIs70} `,
        "\n\n",
      ];
    }
  }

  let file = new File(
    [
      `מזומן: ${cashHere} \n\n אשראי: ${credHere} \n\n סה"כ: ${
        parseInt(credHere) + parseInt(cashHere)
      } \n\n טיפים בר: ${
        localStorage["bar"]
      } \n\n מזומן בשעה: ${cashPerHour.toFixed(
        2
      )} \n\n אשראי בשעה: ${creditPerHour.toFixed(
        2
      )} \n\n מזומן בשעה 70%: ${cashPerHour70.toFixed(
        2
      )} \n\n אשראי בשעה 70%: ${creditPerHour70.toFixed(
        2
      )} \n\n ${waiterDetails}`,
    ],
    {
      type: "application/json",
    }
  );

  const fileURL = URL.createObjectURL(file);
  download.setAttribute("href", fileURL);
  download.setAttribute("download", `${dateHere}.json`);

  download.click();
  waiterList.children = "";
}
waiterFinish.addEventListener("click", doneAdding);
