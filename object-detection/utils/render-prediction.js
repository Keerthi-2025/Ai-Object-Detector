export const renderPredictions = (predictions,ctx) => {
    ctx.clearReact(0,0,ctx.canvas.width,ctx.canvas.height);

    const font = "16px sans=serif"
    ctx.font = font
    ctx.TextBaseline = "top"

    predictions.forEach((prediction)=>{
        const [x,y,width,height] = prediction["bbox"];

        const isPerson = prediction.class === "person";


        //bounding box
        ctx.strokeStyle = isPerson?"red":"green";
        ctx.lineWidth = 4;
        ctx.strokeStyle(x,y,width,height);


        //fillcolor
        ctx.fillStyle = `rgba(255,0,0,4{isPerson ? 0.2}: 0)`;  //if it is not person the color is not shown
        ctx.fillRect(x,y,width,height);

        ctx.strokeStyle = isPerson?"red":"green";
        const textWidth = ctx.measurement(prediction.class).width;
        const textHeight = parseInt(font,10);
        ctx.fillRect(x,y,textWidth + 4, textHeight + 4);

    })


};
