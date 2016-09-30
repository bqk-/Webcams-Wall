

var devicesList = [];
var videosObj = [];
var k = 0;
var c = 0;

navigator.getUserMedia = navigator.getUserMedia ||
  navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
  console.log("enumerateDevices() not supported.");
}

// List cameras.
navigator.mediaDevices.enumerateDevices()
.then(function(devices) {
  devices.forEach(function(device) {
	  if(device.kind == 'videoinput')
	  {
		  console.log("Found " + device.label + ", " + device.deviceId );
		  devicesList[k] = device.deviceId;
		  
		  var video = document.createElement('video');
		  video.setAttribute('autoplay', 'autoplay');
		  video.setAttribute('muted', 'muted');
		  video.setAttribute('width', 640);
		  video.setAttribute('height', 320);
		  videosObj[k] = video;
		  
		  document.getElementById('container').appendChild(video);
		  start(k);
		  k++;
		  
	  }
  });
})
.catch(function(err) {
  console.log(err.name + ": " + err.message);
});

function errorCallback(error) {
  console.log('navigator.getUserMedia error: ', error);
}

function start(idx) {
   var constraints = {
	audio: false,
    video: {
      deviceId: devicesList[idx],
	  width: 640, 
	  height: 360,
	  aspectRatio: 640/360
    }
  };
  navigator.mediaDevices.getUserMedia(constraints)
	.then(function(mediaStream)
	{	
		/*
		var video = document.getElementById('video');
		video.src = window.URL.createObjectURL(mediaStream);
		video.play();
		*/
		videosObj[idx].src = window.URL.createObjectURL(mediaStream);
		videosObj[idx].load();
		videosObj[idx].play();
		
	})
	.catch(function(err) {
	  console.log(err.name + ": " + err.message);
	});
}

/*
document.addEventListener("click", clickVideo, false);
function clickVideo(e)
{
	console.log(c);
	start(c++ % 4);
}
*/