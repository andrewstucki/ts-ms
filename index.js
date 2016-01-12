var express = require('express');
var moment = require('moment');
var app = express();

var port = process.env.PORT || 3000;

app.get("/:time", function(req, res) {
  var timestamp = req.params.time;
  var unixStamp = moment.unix(timestamp).utc();
  var naturalStamp = moment.utc(timestamp, "MMMM Do, YYYY");
  if (unixStamp.isValid()) {
    res.send({
      unix: timestamp,
      natural: unixStamp.format("MMMM Do, YYYY")
    });
    return
  } else if (naturalStamp.isValid()) {
    res.send({
      unix: parseInt(naturalStamp.unix()),
      natural: timestamp
    });
    return;
  }

  res.send({
    unix: null,
    natural: null
  });
});

module.exports = app.listen(port, function() {
  console.log('Millseconds app listening on port ' + port + '!');
});
