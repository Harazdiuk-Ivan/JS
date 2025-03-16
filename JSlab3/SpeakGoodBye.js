(function (window) {
  let speakWord = "Good Bye";

  function speak(name) {
    console.log(speakWord + " " + name);
  }
  window.byeSpeaker = {speak};
})(window);


