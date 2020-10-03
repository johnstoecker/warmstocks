var TAGLINES = ["Your YOLO space for Q4",
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

var TABS = ["leaderboard", "rules"]

function loadData() {
  var url="https://sheets.googleapis.com/v4/spreadsheets/1_4IOELTABwgEyPDKjr7L7Wbo27Gbo9eiVNtPlOIUOP8/values/Main!B4:C30?key=AIzaSyCjz8-wT6vG8WQJJbyqQjD1_30xVCFwXyQ";
  xmlhttp=new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    var leaders = []
    if(xmlhttp.readyState == 4) {
      if (xmlhttp.status==200){
        var values = JSON.parse(xmlhttp.responseText)['values'];
        for(var i=0; i<values.length; i++) {
          var row = values[i];
          if (row.length == 2) {
            leaders.push(row);
          }
        }
        leaders = leaders.sort(leaderSort);
      } else {
        leaders = [['Fakeman', 1000], ['Placeholder', 900.75], ['Nobody', 600], ['Mr. Who', 1001.65], ['Mrs. Who', 965]].sort(leaderSort);
      }
    }

    var innerHTML = '';
    // fun, manual HTML construction in pure JS....
    for (var i=0; i<leaders.length; i++) {
      innerHTML+=`<div class='leader-row'><div class='leader-name'>${leaders[i][0]}</div><div class='leader-warmth'>${leaders[i][1]}</div></div>`
    }
    document.getElementById("leaderboard").innerHTML = innerHTML;
  };
  xmlhttp.open("GET",url,true);
  xmlhttp.send(null);
}


function leaderSort(a, b) {
  var num1 = parseFloat(a[1]);
  var num2 = parseFloat(b[1]);
  if (num1 < num2) {
    return 1;
  }
  if (num1 > num2) {
    return -1;
  }
  return 0;
}

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
    loadData();
};

if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  initialize();
} else {
  document.addEventListener("DOMContentLoaded", initialize);
}
