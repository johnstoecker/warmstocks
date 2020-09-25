TAGLINES = ["Your YOLO space for Q4",
"Where the friends are cool and the market is warm",
"Lose money with friends",
"How fast can you lose 1k",
"Your yolofolio",
"Your portfoolio",
"Play it safe, play it stupid",
"OK Google, how do options work",
"Buy the dip. Ranch pls",
"Light your money on fire",
"Warm stocks, toasty dividends",
"Be the goose in a bear/bull market",
"Money Mismanagement",
"All risk no reward",
"The house always wins",
"Stocks only go up...right?"];

TABS = ["leaderboard", "rules"]

var chooseTab = function(tab) {
  var containerElements = document.getElementsByClassName("content-container");
  for (var i=0; i<containerElements.length; i++) {
    containerElements[i].style.display = "none";
  }
  var tabElements = document.getElementsByClassName("navigation-tab");
  for (var i=0; i<containerElements.length; i++) {
    tabElements[i].classList.remove("active")
  }

  document.getElementById(tab+"-container").style.display = "inherit";
  document.getElementById(tab+"-tab").classList.add("active");
}

var initialize = function(){
    document.getElementById("tagline").innerHTML = TAGLINES[Math.floor(Math.random() * TAGLINES.length)];
};

if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  initialize();
} else {
  document.addEventListener("DOMContentLoaded", initialize);
}
