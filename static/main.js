var app = angular.module("selbo", ['angularGrid']); 
app.service('imageService',['$q','$http',function($q,$http){
        this.loadImages = function(){
            return $http.jsonp("https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSON_CALLBACK");
        };
    }]);
var commands=
	{
		"light_on" : {//turn on led 
			"cmd" : "led",
			"data" : "on"
		},
		"light_off" : {//turn off led
			"cmd" : "led",
			"data" : "off"
		},
		"pause_navigation" : { //stop navigation
			"cmd" : "nav",
			"data" : "pause"
		},
		"resume_navigation" : {//resume navigation
			"cmd" : "nav",
			"data" : "resume"
		},
		"capture_img" : {//take image, pause navigation is implicit 
			"cmd" : "camera",
			"data" : "capture"
		},
		"image_captured" : {//image captured notification
			"cmd" : "camera_status",
			"data" : "captured"
		},
		"immediate_capture" : { //capture image, no navigaton pause
			"cmd" : "camera",
			"data" : "immediate_capture"
		},
		"error" : { //report an error, use how ever you want
			"cmd" : "error",
			"data" : "your agent name"
		},
		"nav_paused" : { //navigation paused ack
			"cmd" : "nav_status",
			"data" : "paused"
		},
		"nav_resumed" : {//navigatino resumed ack
			"cmd" : "nav_status",
			"data" : "resumed"
		},
		"saved_img" : {//navigatino resumed ack
			"cmd" : "img_saved",
			"data" : "url of img"
		},
		"joystick_button" : {//joystick button click
			"cmd" : "joystick_button",
			"data" : "on"
		},
		"joystick_vertical" : {//joystick vertical move
			"cmd" : "img_saved",
			"data" : "value of vertical button"
		},
		"joystick_horizontal" : {//joystick horizontal move
			"cmd" : "img_saved",
			"data" : "value of horizontal button"
		},
	};
app.controller("slbo_ctrl",['$scope','$timeout','imageService', 'angularGridInstance',function($scope,$timeout,imageService,angularGridInstance) {
	$scope.heartbit_cycle=3000;
	$scope.reconnect_cycle=6000;
    $scope.host=window.location.hostname;
	$scope.ws_port=window.location.port-1; 
	$scope.connection=null;
	$scope.led_state="off";
	$scope.online=false; 
	$scope.nav="idle"; 
	imageService.loadImages().then(function(data){
            data.data.items.forEach(function(obj){
                var desc = obj.description,
                    width = desc.match(/width="(.*?)"/)[1],
                    height = desc.match(/height="(.*?)"/)[1];
                
                obj.actualHeight  = height;
                obj.actualWidth = width;
            });
           //$scope.pics = data.data.items;
           
        });
	$scope.pics=[];
	$scope.toggle_light=function(){
			/*if ($scope.led_state==null||$scope.led_state=="off")
			{
				$scope.send_command(commands.light_on.cmd,commands.light_on.data );
				return; 
			}
			if ($scope.led_state==null||$scope.led_state=="on")
			{
				$scope.send_command(commands.light_off.cmd,commands.light_off.data );
				return; 
			}*/
			$.post( "/api/capture", { img: test_img, time: "2pm" })
				  .done(function( data ) {
					//alert( "Data Loaded: " + data );
				  });
		}
	$scope.last_captured_img_url="http://"+window.location.host+"/photos/selbo.jpg";
	$scope.take_picture=function(){
		$scope.send_short(commands.capture_img);
	};
	$scope.toggle_nav=function(){
			if ($scope.nav=="idle")
			{
				$scope.send_command(commands.resume_navigation.cmd,commands.resume_navigation.data );
				return; 
			}
			if ($scope.nav=="active")
			{
				$scope.send_command(commands.pause_navigation.cmd,commands.pause_navigation.data );
				return; 
			}
		};
	$scope.full_screen=function()
	{
	
		var el=document.getElementById("main_img"),
		rfs = el.requestFullscreen
        || el.webkitRequestFullScreen
        || el.mozRequestFullScreen
        || el.msRequestFullscreen ;

		if (rfs)
			rfs.call(el);
		else alert("No full screen in this browser");
	};
	$scope.send_command=function(cmd,data)
	{
		$scope.connection.send(JSON.stringify({cmd:cmd,data:data}));
	};
	$scope.send_short=function(key_val)
	{
		$scope.connection.send(JSON.stringify({cmd:key_val['cmd'],data:key_val['data']}));
	};
	$scope.handle_new_img=function(img)
	{
		$scope.last_captured_img_url=img.url;
		tumb={};
		tumb.height=50;
		tumb.width=tumb.height*16/9;
		tumb.url=img.thumb;
		
		$scope.pics.push(tumb);
		$scope.$apply();
	};
	$scope.handle_message=function(msg)
	{
		switch (msg.cmd)
		{
			case "nav_status":
				switch(msg.data)
				{
					case "resumed":
						$scope.nav="active";
						break;
					case "paused":
						$scope.nav="idle"
						break; 
				}
				break
			case "led_status":
				switch(msg.data)
				{
					case "on":
						$scope.led_state="on";
						break;
					case "off":
						$scope.led_state="off";
						break; 
				}
				break;
			case "img_saved":
				$scope.handle_new_img(msg.data);
				break; 
		}
	}
	$scope.connect=function()
	{
		if ($scope.connection && ($scope.connection.readyState==1||$scope.connection.readyState==0))
			return; //already connected/ing. 
		if ($scope.connection && $scope.connection.readyState==2)
		{
			//busy closing, give some time before retry 
			$timeout($scope.connect,$scope.reconnect_cycle);
			return; 
		}
		var addr='ws://'+$scope.host+":"+$scope.ws_port; 
		console.log("Connecting to:"+addr);
		var connection = new WebSocket(addr);
		connection.onclose = function(){
			   $scope.online=false;
			   console.log('Connection closed');
			   $timeout($scope.connect,$scope.reconnect_cycle);
			}
		connection.onopen = function(){
		   /*Send a small message to the console once the connection is established */
		   console.log('Connection open!');
		   $scope.online=true; 
		}
		connection.onerror = function(error){
		   console.log('Error detected: ' + error);
		   //alert("Error "+error);
		}
		connection.onmessage = function(e){
		   var server_message = e.data;
		   console.log("Received:"+server_message);
		   try {
				msg=JSON.parse(server_message);
				$scope.handle_message(msg);
		   }
		   catch(err) {
				console.log( "Message error:"+ server_message)
			}	
		}
		$scope.connection=connection;
		$timeout($scope.connect,$scope.heartbit_cycle);
	}
	$scope.heartbit=function()
	{
		
		$timeout($scope.heartbit,$scope.heartbit_cycle);
	};
	$scope.init=function()
	{
		$scope.connect();
		$scope.heartbit();
	}
	$scope.init();
}]);

var test_img="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";