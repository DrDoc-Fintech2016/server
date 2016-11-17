var fs = require('fs');
var analyze_image = function(path,result_callback) {
	console.log("processing: "+path);
  //return "Checking "+path;
  var key="AIzaSyBY-JuW4suG6pnW7rBBaM4Tfk34FOHUCpg";
  const vision = require('node-cloud-vision-api')
  vision.init({auth: key})
  // construct parameters
	const req = new vision.Request({
	  //image: new vision.Image('/Users/tejitak/temp/test1.jpg'),
	  image: new vision.Image({
			url: 'http://www.clearpoint.org/wp-content/uploads/rsz_paystub.png'
		}),
	  features: [
		//new vision.Feature('FACE_DETECTION', 4),
		new vision.Feature('TEXT_DETECTION', 10),
	  ]
	})

	// send single request
	vision.annotate(req).then((res) => {
	  // handling response
	  //console.log(JSON.stringify(res.responses));
	  if (typeof(result_callback=="function"))
		result_callback(res.responses);
	  fs.writeFile("dump.json", JSON.stringify(res.responses), function(err) {
			if(err) {
				return console.log(err);
			}

			console.log("The file was saved!");
		}); 
	  
	}, (e) => {
	  console.log('Error: ', e)
	})
	
	
};
module.exports.analyze_image = analyze_image;