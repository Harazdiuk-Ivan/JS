console.log("JS WORCKS");

//1.2.3
let car1 = new Object();
car1.color = "black";
car1.maxSpeed = 220;
car1.tuning = true;
car1["number of accidents"] = 0;

let driver = new Object();
driver.name = "Ivan";
driver.category = "C";
driver["personal limitation"] = "No driving at night";

car1.driver = driver;

//1.2.4
let car2 = {
  color: "yellow",
  maxSpeed: 310,
  driver: {
    name: "Dima Herincton",
    category: "B",
    "personal limitation": null,
  },
  tuning: false,
  "number of accidents": 2,

  //1.2.6 - 1
  drive: function () {
    console.log("I can drive anytime");
  },
};

//1.2.5
car1.drive = function () {
  console.log("I am not driving at night");
};
car1.drive();

//1.2.6 - 2
car2.drive();

//1.2.7
function Truck(color, weight, avgSpeed, brand, model) {
  this.color = color;
  this.weight = weight;
  this.avgSpeed = avgSpeed;
  this.brand = brand;
  this.model = model;
}

//1.2.8
Truck.AssignDriver = function (truck, name, nightDriving, experience) { 
  truck.driver = {
    name: name,
    nightDriving: nightDriving,
    experience: experience, 
  };
};

//1.2.9
Truck.prototype.trip = function () {
  if (!this.driver) { 
    console.log("No driver assigned");
    return;
  }

  let message = "Driver " + this.driver.name;
  
  if (this.driver.nightDriving) {
    message += " drives at night";
  } else {
    message += " does not drive at night";
  }
  
  message += " and has " + this.driver.experience + " years of experience";

  console.log(message);
};

//1.2.10
let truck1 = new Truck("Green", 3600, 120, "MAN", "123G");
Truck.AssignDriver(truck1, "Ivan", true, 5); 

let truck2 = new Truck("Blue", 6000, 80, "Volvo", "QWE");
Truck.AssignDriver(truck2, "Mukola", false, 3);

truck1.trip();
truck2.trip();

//------------------------------------------------------------------------------------

//1.2.11 - 12 - 13 - 14 - 15

class Square{
  constructor(a){
    this.a = a;
  }

  static help(){
    console.log("це Квадрат - він квадратний, такий прикольний, і взагалі він чіловий тіп");
  }

  length(){
    console.log("сума довжини сторін --> " + (4 * this.a));
  }

  square(){
    console.log("площа --> " + (this.a * this.a));
  }

  info(){
    console.log("це Квадрат - він взагалі чіловий тіп")
    console.log("довжина сторін --> " + (this.a));
    console.log("типу кути --> 90, 90, 90, 90");
    console.log("сума довжини сторін --> " + (4 * this.a));
    console.log("площа --> " + (this.a * this.a));
  }
}

console.log("\n---------------------------");
let square1 = new Square(7);
Square.help();
square1.length();
square1.square();
square1.info();


//1.2.16 - 17
class Rectangle extends Square{
  constructor(a,b){
    super(a);
    this.b = b;
  }

  static help(){
    console.log("це Прямокутник - він прямокутний, такий прикольний, і взагалі він не дуже чіловий тіп");
  }

  length(){
    console.log("сума довжини сторін --> " + (2 * this.a + 2 * this.b));
  }

  square(){
    console.log("площа --> " + (this.a * this.b));
  }

  info(){
    console.log("це Прямокутник - він взагалі не дуже чіловий тіп")
    console.log("довжина сторін --> " + this.a + " / " + this.b + " / " + this.a + " / " + this.b);
    console.log("типу кути --> 90, 90, 90, 90");
    console.log("сума довжини сторін --> " + (2 * this.a + 2 * this.b));
    console.log("площа --> " + (this.a * this.b));
  }
}

console.log("\n---------------------------");

let rect1 = new Rectangle(5,3);
Rectangle.help();
rect1.length();
rect1.square();
rect1.info();

//1.2.18 - 19 - 21 - 22

class Rhombus extends Square{
  constructor(a, alpha, beta){
  super(a);
  this._a = a;
  this._alpha = alpha;
  this._beta = beta;
  }

  get a(){
    return this._a;
  }

  set a(value){
    this._a = value;
  }

  get alpha(){
  return this._alpha;
  }

  set alpha(value){
  this._alpha = value;
  }

  get beta(){
  return this._beta;
  }

  set beta(value){
  this._beta = value;
  }

  static help(){
    console.log("це Ромб - він ромбний, такий прикольний");
  }

  length(){
    console.log("сума довжини сторін --> " + (4 * this._a));
  }

  square(){
    let sinAlpha = Math.sin(this._alpha * Math.PI / 180);
    console.log("площа --> " + (this._a + this._a * sinAlpha));
  }

  info(){
    console.log("це Ромб - він такий прикольний")
    console.log("довжина сторін --> " + this._a + " / " + this._a + " / " + this._a + " / " + this._a);
    console.log("типу кути --> " + this._beta + ", " + this._alpha + ", " + this._beta + ", " + this._alpha);
    console.log("сума довжини сторін --> " + (4 * this._a));
    let sinAlpha = Math.sin(this._alpha * Math.PI / 180);
    console.log("площа --> " + ((this._a * this._a) * sinAlpha));
  }
} 

console.log("\n---------------------------");

let rhomb1 = new Rhombus(5, 120, 60);
Rhombus.help();
rhomb1.length();
rhomb1.square();
rhomb1.info();

console.log("\n---------------------------");

let rhombus = new Rhombus(5, 120, 60);
console.log("rhombus.a = " + rhombus.a); // 5
rhombus.a = 10;
console.log("rhombus.a = " + rhombus.a); // 10

//1.2.20 - 21

class Parallelogram extends Rectangle{
  constructor(a,b,alpha,beta){
    super(a,b);
    this.alpha = alpha;
    this.beta = beta;
  }

  static help(){
    console.log("це Паралелограм - він паралелограмний, такий прикольний");
  }

  length() {
    console.log("сума довжини сторін -->" + (2 * this.a + 2 * this.b));
  }

  square() {
    let sinAlpha = Math.sin(this.alpha * Math.PI / 180);
    console.log("площа --> " + (this.a * this.b * sinAlpha));
  }

  info() {
    console.log("це Паралелограм - він такий eeee");
    console.log("довжина сторін --> " + this.a + ", " + this.b + ", " + this.a + ", " + this.b);
    console.log("типу кути --> " + this.beta + ", " + this.alpha + ", " + this.beta + ", " + this.alpha);
    console.log("сума довжини сторін --> " + (2 * this.a + 2 * this.b));
    let sinAlpha = Math.sin(this.alpha * Math.PI / 180);
    console.log("площа --> " + (this.a * this.b * sinAlpha));
  }
}

console.log("\n---------------------------");

let para1 = new Parallelogram(5, 3, 120, 60);
para1.info();



console.log("\n---------------------------");
//1.2.23

Square.help();
Rectangle.help();
Rhombus.help();
Parallelogram.help();

console.log("\n---------------------------");
//1.2.24

square1.info();
rect1.info();
rhomb1.info();
para1.info();

console.log("\n---------------------------");
//1.2.25 - 26

function Triangular({a = 3, b = 4, c = 5} = {}){
  return{a,b,c};
}


let triangular1 = Triangular();
let triangular2 = Triangular({a: 10, b: 20, c: 30});
let triangular3 = Triangular({a: 22, b: 44, c: 88});

console.log(triangular1);
console.log(triangular2);
console.log(triangular3);

console.log("\n---------------------------");
//1.2.27 - 28

function PiMultiplier(multiplier){
  return function(){
    return Math.PI * multiplier;
  }
}

let doublePi = PiMultiplier(2);
let twoThirdsPi = PiMultiplier(2 / 3);
let halfPi = PiMultiplier(0.5);

console.log(doublePi());      
console.log(twoThirdsPi());   
console.log(halfPi());

console.log("\n---------------------------");
//1.2.29 - 30

function Painter(color) {
  return function(obj) {
      if (obj && obj.type) {
          console.log(color + " " + obj.type);
      } else {
          console.log("No 'type' property occurred!");
      }
  };
}

let PaintBlue = Painter("Blue");
let PaintRed = Painter("Red");
let PaintYellow = Painter("Yellow");

let obj1 = { maxSpeed: 280, type: "Sportcar", color: "magenta" };
let obj2 = { type: "Truck", avgSpeed: 90, loadCapacity: 2400 };
let obj3 = { maxSpeed: 180, color: "purple", isCar: true };

PaintBlue(obj1);  
PaintBlue(obj2);  
PaintBlue(obj3);
console.log("---------------------------");  

PaintRed(obj1);   
PaintRed(obj2);   
PaintRed(obj3); 
console.log("---------------------------");  

PaintYellow(obj1); 
PaintYellow(obj2); 
PaintYellow(obj3); 
console.log("---------------------------");  
