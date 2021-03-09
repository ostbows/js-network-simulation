// =============================================================================
//  Helpers.
// =============================================================================

// Render all the entities in the given canvas.
var renderWorld = function(canvas, entities) {
  // Clear the canvas.
  canvas.width = canvas.width;

  var colours = ["blue", "red"];

  for (var i in entities) {
    var entity = entities[i];

    // Compute size and position.
    var radius = canvas.height*0.9/2;
    var x = (entity.x / 10.0)*canvas.width;

    // Draw the entity.
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(x, canvas.height / 2, radius, 0, 2*Math.PI, false);
    ctx.fillStyle = colours[entity.entity_id];
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "dark" + colours[entity.entity_id];
    ctx.stroke();
  }
}