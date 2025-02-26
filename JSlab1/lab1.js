console.log("Використання: triangle(value1, type1, value2, type2)");
console.log("Можливі типи: 'leg' (катет), 'hypotenuse' (гіпотенуза),");
console.log("'adjacent angle' (прилеглий кут), 'opposite angle' (протилежний кут), 'angle' (кут при гіпотенузі).");

function round(value, precision = 9) {
  return parseFloat(value.toFixed(precision));
}

function triangle(value1, type1, value2, type2) {
  if (arguments.length !== 4) {
    console.error("Помилка: Функція приймає рівно 4 аргументи.");
    return "failed";
  }

  if (value1 <= 0 || value2 <= 0) {
    console.error("Помилка: Значення мають бути додатними.");
    return "failed";
  }

  let a, b, c, alpha, beta;
  let elements = {};
  elements[type1] = value1;
  elements[type2] = value2;

  // Якщо задано два катети
  if (type1 === "leg" && type2 === "leg") {
    a = value1;
    b = value2;
    c = Math.sqrt(a * a + b * b);
    alpha = Math.asin(a / c) * (180 / Math.PI);
  }
  // Якщо задані катет і гіпотенуза
  else if (elements.leg !== undefined && elements.hypotenuse !== undefined) {
    a = elements.leg;
    c = elements.hypotenuse;
    if (a >= c) {
      console.error("Помилка: Катет не може бути більшим або рівним за гіпотенузу.");
      return "failed";
    }
    b = Math.sqrt(c * c - a * a);
    alpha = Math.asin(a / c) * (180 / Math.PI);
  }
  // Якщо задані гіпотенуза і один з гострих кутів
  else if (elements.hypotenuse !== undefined && elements.angle !== undefined) {
    c = elements.hypotenuse;
    alpha = elements.angle;
    if (alpha <= 0 || alpha >= 90) {
      console.error("Помилка: Гострий кут має бути між 0 і 90 градусами.");
      return "failed";
    }
    let rad = alpha * (Math.PI / 180);
    a = c * Math.sin(rad);
    b = c * Math.cos(rad);
  }
  // Катет + протилежний кут
  else if (elements.leg !== undefined && elements["opposite angle"] !== undefined) {
    a = elements.leg;
    alpha = elements["opposite angle"];
    if (alpha <= 0 || alpha >= 90) {
      console.error("Помилка: Гострий кут має бути між 0 і 90 градусами.");
      return "failed";
    }
    let rad = alpha * (Math.PI / 180);
    c = a / Math.sin(rad);
    b = Math.sqrt(c * c - a * a);
  }
  // Катет + прилеглий кут
  else if (elements.leg !== undefined && elements["adjacent angle"] !== undefined) {
    b = elements.leg;
    beta = elements["adjacent angle"];
    if (beta <= 0 || beta >= 90) {
      console.error("Помилка: Гострий кут має бути між 0 і 90 градусами.");
      return "failed";
    }
    let rad = beta * (Math.PI / 180);
    c = b / Math.cos(rad);
    a = Math.sqrt(c * c - b * b);
    alpha = 90 - beta;
  } else {
    console.error("Помилка: Неправильні типи аргументів. Перевірте інструкцію.");
    return "failed";
  }

  if (alpha < 0.0001) {
    alpha = 0.0001;
    beta = 89.9999;
  } else {
    beta = 90 - alpha;
  }

  a = round(a);
  b = round(b);
  c = round(c);
  alpha = round(alpha);
  beta = round(beta);

  console.log(`Сторони трикутника: a = ${a}, b = ${b}, c = ${c}`);
  console.log(`Кути трикутника: alpha = ${alpha}, beta = ${beta}`);
  return "success";
}
