var element = function(id) {
  return document.getElementById(id);
}

// =============================================================================
//  Get everything up and running.
// =============================================================================

// World update rate of the Server.
var server_fps = 4;


// Update simulation parameters from UI.
var updateParameters = function() {
  updatePlayerParameters(player1, "player1");
  updatePlayerParameters(player2, "player2");
  server.setUpdateRate(updateNumberFromUI(server.update_rate, "server_fps"));
  return true;
}


var updatePlayerParameters = function(client, prefix) {
  client.lag = updateNumberFromUI(player1.lag, prefix + "_lag");

  var cb_prediction = element(prefix + "_prediction");
  var cb_reconciliation = element(prefix + "_reconciliation");

  // Client Side Prediction disabled => disable Server Reconciliation.
  if (client.client_side_prediction && !cb_prediction.checked) {
    cb_reconciliation.checked = false;
  }

  // Server Reconciliation enabled => enable Client Side Prediction.
  if (!client.server_reconciliation && cb_reconciliation.checked) {
    cb_prediction.checked = true;
  }

  client.client_side_prediction = cb_prediction.checked;
  client.server_reconciliation = cb_reconciliation.checked;

  client.entity_interpolation = element(prefix + "_interpolation").checked;
}


var updateNumberFromUI = function(old_value, element_id) {
  var input = element(element_id);
  var new_value = parseInt(input.value);
  if (isNaN(new_value)) {
    new_value = old_value;
  }
  input.value = new_value;
  return new_value;
}


// When the player presses the arrow keys, set the corresponding flag in the client.
var keyHandler = function(e) {
  e = e || window.event;
  if (e.keyCode == 39) {
    player1.key_right = (e.type == "keydown");
  } else if (e.keyCode == 37) {
    player1.key_left = (e.type == "keydown");
  } else if (e.key == 'd') {
    player2.key_right = (e.type == "keydown");
  } else if (e.key == 'a') {
    player2.key_left = (e.type == "keydown");
  } else {
    console.log(e)
  }
}
document.body.onkeydown = keyHandler;
document.body.onkeyup = keyHandler;


// Setup a server, the player's client, and another player.
var server = new Server(element("server_canvas"), element("server_status"));
var player1 = new Client(element("player1_canvas"), element("player1_status"));
var player2 = new Client(element("player2_canvas"), element("player2_status"));


// Connect the clients to the server.
server.connect(player1);
server.connect(player2);


// Read initial parameters from the UI.
updateParameters();