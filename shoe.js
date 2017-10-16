var canvas = document.getElementById("heel");
canvas.height = 113;
canvas.width = 750;
var multiplier = 0.75;
var canvasHeight = canvas.height*multiplier;
var canvasWidth = canvas.width*multiplier;

var ctx = canvas.getContext("2d");
ctx.font = "12pt Tahoma";

var inputs = [
	document.getElementById("wood-thickness"),
	document.getElementById("heel-height"),
	document.getElementById("heel2bof")
]
inputs.forEach(function(i){i.oninput = updateCanvas;});

function updateCanvas(){
	canvas.width = canvas.width;

	var heelHeight = new Number(document.getElementById("heel-height").value);
	var footLength = new Number(document.getElementById("heel2bof").value);
	var angle = Math.atan(heelHeight/footLength)*180/Math.PI;

	var woodThickness = new Number(Math.max(0.1, document.getElementById("wood-thickness").value));
	var numWoodBlocks = Math.ceil(heelHeight/woodThickness);

	var drawHeight = heelHeight*canvasHeight;//footLength > canvas.width/(multiplier*100) ? canvasWidth*heelHeight/footLength : heelHeight*canvasHeight;
	var drawWidth = footLength > canvas.width/(multiplier*100) ? canvasWidth : footLength*100*multiplier;
	var translateY = canvasHeight*(1-heelHeight);

	var hStep = -drawHeight/numWoodBlocks;
	var wStep = -drawWidth/numWoodBlocks;

	drawHeight += translateY;

	function redLines(){
		ctx.globalAlpha = 0.3;
		ctx.strokeStyle = "#ff0000";
		ctx.moveTo(0, translateY);
		ctx.lineTo(drawWidth, drawHeight);
		ctx.lineTo(0, drawHeight);
		ctx.stroke();

		ctx.beginPath();
		var realHeelHeight = numWoodBlocks*woodThickness;
		var realIntededRatio = heelHeight/realHeelHeight;
		var drawIntendedHeelHeight = drawHeight+(Math.round((numWoodBlocks)*hStep*realIntededRatio));
		ctx.strokeStyle = "#00ff00";
		ctx.moveTo(0, drawIntendedHeelHeight);
		ctx.lineTo(drawWidth, drawIntendedHeelHeight+1);
		ctx.stroke();

		ctx.beginPath();
		ctx.strokeStyle = "#0000ff";
		var drawRealHeelHeight = drawHeight+Math.round((numWoodBlocks)*hStep);
		ctx.moveTo(0, drawRealHeelHeight);
		ctx.lineTo(drawWidth, drawRealHeelHeight+1);
		ctx.stroke();

		ctx.globalAlpha = 1;
		ctx.fillStyle = "#ff0000";
		ctx.fillText(angle.toFixed(3)+"°", drawWidth+wStep/1.5, canvasHeight-5);

		ctx.globalAlpha = 0.6;
		if (heelHeight == realHeelHeight){
			ctx.fillStyle = "#0000ff";
			ctx.fillText(heelHeight.toFixed(3)+'"', drawWidth-30, drawIntendedHeelHeight+10);
		}
		else{
			ctx.fillStyle = "#006400";
			ctx.fillText(heelHeight.toFixed(3)+'"', drawWidth-30, drawIntendedHeelHeight+10);
			ctx.fillStyle = "#0000ff";
			ctx.fillText(realHeelHeight.toFixed(3)+'"', drawWidth-70, drawRealHeelHeight+10);	
		}
	}

	function drawBlackBoxes(){
		ctx.globalAlpha = 1.0;
		ctx.strokeStyle = "#999";

		for (var i = 0; i < numWoodBlocks; i++){
			ctx.strokeRect(0, drawHeight+(Math.round(i*hStep)), drawWidth+(i*wStep), Math.round(hStep));
			var text = woodThickness.toFixed(3)+'" x '+(footLength/numWoodBlocks*(numWoodBlocks-i)).toFixed(3)+'"';
			ctx.fillText(text, 10, drawHeight+(Math.round(hStep*(i+0.5))));
		}
	}

	drawBlackBoxes();
	redLines();
}
updateCanvas();