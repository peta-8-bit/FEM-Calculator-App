let display = document.querySelector("#result-span");
let inputString = "";
let displayString = "";
let inputArray;
let opArray = [];
let indexDiv, indexMul, indexAdd, indexSub;
let divBy0;
let result;

btn = (val) => {
  divBy0 = false;
  console.log(val);
  console.log(typeof val);

  if (val === "+" || val === "-" || val === "x" || val === "/") {
    //Case for Operators
    opArray.push(val);
    displayString += val;
    inputString += ",";
    display.textContent = displayString;
  } else if (/[\.]|([0-9])/g.test(val)) {
    //Case for Numerical values
    inputString += val;
    displayString += val;
    display.textContent = displayString;
  } else if (val === "d") {
    //Case for Delete
    console.log("Display String: " + displayString);
    console.log("inputString: " + inputString);
    let del = displayString.charAt(displayString.length - 1);
    console.log("del: " + del);
    if (/[0-9]/g.test(del)) {
      inputString = inputString.slice(0, -1);
      console.log("After inputString: " + inputString);
      console.log("deleting : " + inputString.charAt(inputString.length - 1));
    } else {
      opArray.pop();
      inputString = inputString.slice(0, -1);
      console.log("Else case");
    }
    displayString = displayString.slice(0, -1);
    console.log(" After Display String: " + displayString);
    display.textContent = displayString;
  } else if (val === "r") {
    //Case for Reset
    inputString = "";
    displayString = "";
    opArray = [];
    display.textContent = displayString;
  } else {
    //Case for =
    inputArray = inputString.split(",");
    display.textContent = "";
    inputString = "";
    displayString = "";

    calculation();

    opArray = [];
  }
};

checkOp = (op) => {
  for (let i = 0; i < opArray.length; i++) {
    if (opArray[i] === op) {
      shiftOpArray(i);
      return i;
    }
  }
};

shiftOpArray = (index) => {
  console.log("Before opArray: " + opArray);
  let ln = opArray.length;
  for (let i = index; i < ln; i++) {
    opArray[i] = opArray[i + 1];
  }
  opArray.length = opArray.length - 1;
  console.log("After opArray: " + opArray);
};

shiftInputArray = (num, index) => {
  console.log("Before inputArray: " + inputArray);
  let ln = inputArray.length;
  inputArray[index] = num;
  for (let i = index + 1; i < ln; i++) {
    inputArray[i] = inputArray[i + 1];
  }
  inputArray.length = inputArray.length - 1;
  console.log("After inputArray: " + inputArray);
};

calculationDivision = () => {
  indexDiv = checkOp("/");
  let n1, n2, n3;
  if (indexDiv !== undefined) {
    n1 = parseFloat(inputArray[indexDiv]);
    n2 = parseFloat(inputArray[indexDiv + 1]);
    if (n2 !== 0) {
      n3 = n1 / n2;
      shiftInputArray(n3, indexDiv);

      calculationDivision();
    } else {
      divBy0 = true;
      result = "Invalid";
      return;
    }
  }
};

calculationMultiply = () => {
  indexMul = checkOp("x");
  let n1, n2, n3;
  if (indexMul !== undefined) {
    n1 = parseFloat(inputArray[indexMul]);
    n2 = parseFloat(inputArray[indexMul + 1]);
    n3 = n1 * n2;
    shiftInputArray(n3, indexMul);

    calculationMultiply();
  }
};

calculationAddition = () => {
  indexAdd = checkOp("+");
  let n1, n2, n3;
  if (indexAdd !== undefined) {
    n1 = parseFloat(inputArray[indexAdd]);
    n2 = parseFloat(inputArray[indexAdd + 1]);
    n3 = n1 + n2;
    shiftInputArray(n3, indexAdd);

    calculationAddition();
  }
};

calculationSubtract = () => {
  indexSub = checkOp("-");
  let n1, n2, n3;
  if (indexSub !== undefined) {
    n1 = parseFloat(inputArray[indexSub]);
    n2 = parseFloat(inputArray[indexSub + 1]);
    n3 = n1 - n2;
    shiftInputArray(n3, indexSub);

    calculationSubtract();
  }
};

calculation = () => {
  calculationDivision();
  if (divBy0 !== true) {
    calculationMultiply();
    calculationAddition();
    calculationSubtract();
    result = inputArray[0];
  }
  display.textContent = result;
};

changeTheme = () => {
  let theme = document.querySelectorAll(".theme");

  theme.forEach((item) => {
    if (item.classList.contains("theme-1")) {
      item.classList.remove("theme-1");
      item.classList.add("theme-2");
    } else if (item.classList.contains("theme-2")) {
      item.classList.remove("theme-2");
      item.classList.add("theme-3");
    } else {
      item.classList.remove("theme-3");
      item.classList.add("theme-1");
    }
  });
};
