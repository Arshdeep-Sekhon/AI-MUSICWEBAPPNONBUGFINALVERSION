song1 = "";
song2 = "";

song1_status = "";
song2_status = "";

scoreLeftWrist = 0;
scoreRightWrist = 0;


rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();
	
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
   if(results.length > 0) {
	console.log(results);
	scoreLeftWrist =  results[0].pose.keypoints[9].score;
	console.log("scoreLeftWrist = " + scoreLeftWrist);

	scoreRightWrist =  results[0].pose.keypoints[10].score;
	console.log("scoreRightWrist = " + scoreRightWrist);
	
	rightWristX = results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
	console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
		
  }
}

function preload() {
	song1 = loadSound("music2.mp3");
    song2 = loadSound("music.mp3");
}

function modelLoaded() {
    console.log("POSENET IS INITIALISED! BOOP BEEP!");
}

function draw() {
	image(video, 0, 0, 600, 500);
	
	song1_status = song1.isPlaying();
	song2_status = song2.isPlaying();

	fill("#FF0000");
	stroke("#FF0000");

	if(scoreLeftWrist > 0.2)
	{
		circle(leftWristX,leftWristY,20);

		if(song1_status == false)
		{
			song2.stop();
			song1.play();
			document.getElementById("song").innerHTML = "Playing - Peter Pan Theme Song";
		}
	}
	else if(scoreLeftWrist > 0.2 && scoreLeftWrist < scoreRightWrist)
	{
		circle(leftWristX,leftWristY,20);

		if(song1_status == false)
		{
			song2.stop();
			song1.play();
			document.getElementById("song").innerHTML = "Playing - Peter Pan Theme Song";
		}
	}
	else if(scoreRightWrist > 0.2)
	{
		circle(rightWristX,rightWristY,20);

		if(song2_status == false)
		{
			song1.stop();
			song2.play();
			document.getElementById("song").innerHTML = "Playing - Harry Potter Theme Song";
		}
	}

	else if(scoreRightWrist > 0.2 && scoreRightWrist < scoreLeftWrist)
	{
		circle(rightWristX,rightWristY,20);

		if(song2_status == false)
		{
			song1.stop();
			song2.play();
			document.getElementById("song").innerHTML = "Playing - Harry Potter Theme Song";
		}
	}


}