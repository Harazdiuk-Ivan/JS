(function(){
  let names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];

  for (let i = 0; i < names.length; i++) {
    let firstL = names[i].charAt(0).toLowerCase();
    if (firstL === "j") {
      console.log("Good Bye " + names[i]);
    } else {
      console.log("Hello " + names[i]);
    }
  }

  console.log("\n+---------------+---------------+");
  console.log("|  Hello Name! |  Good Bye name! |");
  for(let i = 0; i < names.length; i++) {
    let lastL = names[i].charAt(names[i].length - 1).toLowerCase();
    if(lastL === "a"){
      console.log("Selected: " + names[i] + "-Last(a) | Hello " + names[i]);
    }else{
      console.error("Selected: " + names[i] + "-Last | Good Bye " + names[i]);
    }
  }

  console.log("\n+---------------+---------------+");
  console.log("|--------------SUM--------------|");
  for(let i = 0; i < names.length; i++) {
    let sum = 0;
    for(let j = 0; j < names[i].length; j++){
      sum += names[i].charCodeAt(j);
    }
    if(sum > 500){
      console.log("Selected: " + names[i] + " SUM: " + sum);
    }
    else{
      console.error("Selected: " + names[i] + " SUM: " + sum);
    }
  }
  console.log("+---------------+---------------+");
})();




