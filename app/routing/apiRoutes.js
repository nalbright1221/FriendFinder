// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsAPI = require("../data/friends");



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsAPI);
  });

  
  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // console.log(req.body);
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
    //  console.log(friendsAPI[0].scores[3]);
    //best match Data 
     
 
    var user = req.body;
   

    for ( var i = 0; i < user.scores.length; i++){
      user.scores[i] = parseInt(user.scores[i]);
    }

    var bestMatchIndex = 0;
    var minDifference = 40; 
     
for (var i = 0; i <friendsAPI.length; i++) {
  var totalDifference = 0;
  for(var j = 0; j < friendsAPI[i].scores.length; j++) {
    var difference = Math.abs(user.scores[j] - friendsAPI[i].scores[j]);
    totalDifference += difference;
  }

  if(totalDifference < minDifference) {
    bestMatchIndex = i;
    minDifference = totalDifference;
  }
}
    
  
    friendsAPI.push(user);
    console.log(friendsAPI[bestMatchIndex])
      return res.json(friendsAPI[bestMatchIndex]);
      

  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post("/api/clear", function(req, res) {
    // Empty out the arrays of data
    friendsAPI.length = [];
   

    res.json({ ok: true });
  });
};
