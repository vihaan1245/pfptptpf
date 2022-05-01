vihaan = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function preload()
{
    vihaan = loadSound("heat.mp3");
}

function setup() {
    canvas =  createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet Is not Initialized, Go watch anime!');
}

function gotPoses(results)
{
  if(results.length > 0)
  {
    console.log(results);
    scoreRightWrist = results[0].pose.keypoints[10].score;
    scoreLeftWrist =  results[0].pose.keypoints[9].score;
    console.log("scoreLeftWrist = " + scoreLeftWrist+"scoreRightWrist = "+ scoreRightWrist);
    
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
        
  }
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreRightWrist > 0.2)
    {
      circle(rightWristX,rightWristY,20);

      if(rightWristY >0 && rightWristY <=100)
      {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        vihaan.rate(0.5);
      }
      else if(rightWristY >100 && rightWristY <=200)
      {
        document.getElementById("speed").innerHTML = "Speed = 1x";
        vihaan.rate(1);
      }
      else if(rightWristY >200 && rightWristY <=300)
      {
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        vihaan.rate(1.5);
      }
      else if(rightWristY >300 && rightWristY <=400)
      {
        document.getElementById("speed").innerHTML = "Speed = 2x";
        vihaan.rate(2);
      }
      else if(rightWristY > 400 && rightWristY <=500)
      {
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        vihaan.rate(2.5);
      }
      
    }


    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX,leftWristY,20);
        InNumberleftWristY = Number(leftWristY); 
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;     
        vihaan.setVolume(volume); 
    }
}

function play()
{
    vihaan.play();
    vihaan.setVolume(1);
    vihaan.rate(1);
}

function stop()
{
  vihaan.stop();
}
