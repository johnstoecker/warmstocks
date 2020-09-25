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

var GOOGER_CLIENT_ID = "294344663767-q4nhebps1mv4k4tor5et123478io234d.apps.googleusercontent.com"
var GOOGER_API_KEY = "AIzaSyCLnUbUGZwGKeknJvv-Lt7FkwBl9_LfOzw"
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

function loadData() {
  // var url="https://docs.google.com/spreadsheet/pub?key=1_4IOELTABwgEyPDKjr7L7Wbo27Gbo9eiVNtPlOIUOP8&single=true&gid=0&range=A1&output=csv";
  // xmlhttp=new XMLHttpRequest();
  // xmlhttp.onreadystatechange = function() {
  //   if(xmlhttp.readyState == 4 && xmlhttp.status==200){
  //     document.getElementById("leaderboard").innerHTML = xmlhttp.responseText;
  //   }
  // };
  // xmlhttp.open("GET",url,true);
  // xmlhttp.send(null);
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


function listMajors() {
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    range: 'Class Data!A2:E',
  }).then(function(response) {
    var range = response.result;
    document.getElementById("leaderboard").innerHTML = range.values;
    // if (range.values.length > 0) {
    //   appendPre('Name, Major:');
    //   for (i = 0; i < range.values.length; i++) {
    //     var row = range.values[i];
    //     // Print columns A and E, which correspond to indices 0 and 4.
    //     appendPre(row[0] + ', ' + row[4]);
    //   }
    // } else {
    //   appendPre('No data found.');
    // }
  }, function(response) {
    console.error('Error: ' + response.result.error.message);
  });
}


var initialize = function(){
    document.getElementById("tagline").innerHTML = TAGLINES[Math.floor(Math.random() * TAGLINES.length)];
    loadData();
};

function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}


function initClient() {
  gapi.client.init({
    apiKey: GOOGER_API_KEY,
    clientId: GOOGER_CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  }, function(error) {
    appendPre(JSON.stringify(error, null, 2));
  });
}

if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  initialize();
} else {
  document.addEventListener("DOMContentLoaded", initialize);
}
