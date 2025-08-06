/*const renderPredictions = (predictions, ctx) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const font = "16px sans-serif";
  ctx.font = font;
  ctx.textBaseline = "top";

  predictions.forEach((prediction) => {
    const [x, y, width, height] = prediction["bbox"];
    const isPerson = prediction.class === "person";

    // Draw bounding box
    ctx.strokeStyle = isPerson ? "red" : "green";
    ctx.lineWidth = 4;
    ctx.strokeRect(x, y, width, height);

    // Fill the box with semi-transparent color
    ctx.fillStyle = `rgba(255, 0, 0, ${isPerson ? 0.2 : 0})`;
    ctx.fillRect(x, y, width, height);

    // Draw label background
    const textWidth = ctx.measureText(prediction.class).width;
    const textHeight = parseInt(font, 10);
    ctx.fillStyle = isPerson ? "red" : "green";
    ctx.fillRect(x, y, textWidth + 4, textHeight + 4);

    // Draw label text
    ctx.fillStyle = "#000000";
    ctx.fillText(prediction.class, x + 2, y + 2);
  });
};

export default renderPredictions;*/

const renderPredictions = (predictions, ctx) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const font = "16px sans-serif";
  ctx.font = font;
  ctx.textBaseline = "top";

  predictions.forEach((prediction) => {
    const [x, y, width, height] = prediction["bbox"];
    const isPerson = prediction.class === "person";

    // Draw bounding box
    ctx.strokeStyle = isPerson ? "red" : "green";
    ctx.lineWidth = 4;
    ctx.strokeRect(x, y, width, height);

    // Fill with semi-transparent red if person
    ctx.fillStyle = `rgba(255, 0, 0, ${isPerson ? 0.2 : 0})`;
    ctx.fillRect(x, y, width, height);

    // Draw label background
    const textWidth = ctx.measureText(prediction.class).width;
    const textHeight = parseInt(font, 10);
    ctx.fillStyle = isPerson ? "red" : "green";
    ctx.fillRect(x, y, textWidth + 4, textHeight + 4);

    // Draw label text
    ctx.fillStyle = "#000000";
    ctx.fillText(prediction.class, x + 2, y + 2);
  });
};

export default renderPredictions;

