function printHighscores() {
    //Obtain scores from local storage or empty array is set
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    //Sort high scores by descending order
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
    highscores.forEach(function(score) {
      //Create an "li" tag for individual scores
      var liTag = document.createElement("li");
      liTag.textContent = score.initials + " - " + score.score;
      //Display on page
      var olEl = document.getElementById("highscores");
      olEl.appendChild(liTag);
    });
  }
  
  function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
  }
  
  document.getElementById("clear").onclick = clearHighscores;
  //Start function
  printHighscores();