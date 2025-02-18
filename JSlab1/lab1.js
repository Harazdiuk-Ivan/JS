console.log("Використання: triangle(value1, type1, value2, type2)");
console.log("Можливі типи: 'leg' (катет), 'hypotenuse' (гіпотенуза),");
console.log(
  "'adjacent angle' (прилеглий кут), 'opposite angle' (протилежний кут), 'angle' (кут при гіпотенузі)."
);

function triangle(value1, type1, value2, type2) {
  let a, b, c, alpha, beta;

  let elements = {};
  elements[type1] = value1;
  elements[type2] = value2;

  // Якщо задані два катети
  if (elements.leg !== undefined && type1 === "leg" && type2 === "leg") {
    a = elements.leg;
    b = value2;
    c = Math.sqrt(a * a + b * b);

    alpha = Math.asin(a / c) * (180 / Math.PI);
    beta = 90 - alpha;
  }

  // Якщо задані катет і гіпотенуза
  else if (elements.leg !== undefined && elements.hypotenuse !== undefined) {
    a = elements.leg;
    c = elements.hypotenuse;

    if (a >= c) {
      console.error(
        "Помилка: Катет не може бути більшим або рівним за гіпотенузу."
      );
      return "failed";
    }

    b = Math.sqrt(c * c - a * a);

    alpha = Math.asin(a / c) * (180 / Math.PI);
    beta = 90 - alpha;
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
    beta = 90 - alpha;
  }

  // Катет + протилежний кут
  else if (
    elements.leg !== undefined &&
    elements["opposite angle"] !== undefined
  ) {
    a = elements.leg;
    alpha = elements["opposite angle"];

    if (alpha <= 0 || alpha >= 90) {
      console.error("Помилка: Гострий кут має бути між 0 і 90 градусами.");
      return "failed";
    }

    let rad = alpha * (Math.PI / 180);
    c = a / Math.sin(rad);
    b = Math.sqrt(c * c - a * a);
    beta = 90 - alpha;
  }

  // Катет + прилеглий кут
  else if (
    elements.leg !== undefined &&
    elements["adjacent angle"] !== undefined
  ) {
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
    console.error(
      "Помилка: Неправильні типи аргументів. Перевірте інструкцію."
    );
    return "failed";
  }

  console.log(`Сторони трикутника: a = ${a}, b = ${b}, c = ${c}`);
  console.log(`Кути трикутника: alpha = ${alpha}, beta = ${beta}`);
  return "success";
}



