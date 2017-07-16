import React from 'react';

class App extends React.Component {
		constructor(props){
			super(props);
			this.state = { zoom:7, autoDriveSteps:[], autoDriveSteps2:[] };
		}
		static propTypes() {
			initialCenter: React.PropTypes.objectOf(React.PropTypes.number).isRequired
  	}
  	/*setAnimatedRoute(origin,destination,waypoints,origin2,destination2,waypoints2,map) {
    	// init routing services
    	var _self = this;
    	var _val = this.state;
    	var directionsService = new google.maps.DirectionsService;
    	//calculate route
    	if(origin && destination){
    		var directionsRenderer = new google.maps.DirectionsRenderer({
        	map: map
    		});
    		directionsService.route({
	        origin: origin,
	        destination: destination,
	        waypoints: waypoints,
	        travelMode: google.maps.TravelMode.DRIVING
	      },function(response, status) {
		      if (status == google.maps.DirectionsStatus.OK) {
		          // display the route
		          directionsRenderer.setDirections(response);
		          _val.autoDriveSteps = new Array();
		          _val.autoDriveSteps = response.routes[0].overview_path.slice(0);
		          //_self.startRouteAnimation(origin,_val.autoDriveSteps);
		      } 
		      else{
		        window.alert('Directions request failed due to ' + status);
		      }
	    	});
    	}
    	if(origin2 && destination2){
    		var directionsRenderer2 = new google.maps.DirectionsRenderer({
        	map: map
    		});
    		directionsService.route({
		      origin: origin2,
		      destination: destination2,
		      waypoints: waypoints2,
		      travelMode: google.maps.TravelMode.DRIVING
		    },function(response, status) {
		      if (status == google.maps.DirectionsStatus.OK) {
		          // display the route
		          directionsRenderer2.setDirections(response);
		          _val.autoDriveSteps2 = new Array();
		          _val.autoDriveSteps2 = response.routes[0].overview_path.slice(0);
		          //_self.startRouteAnimation(origin2,_val.autoDriveSteps2);
		      } 
		      else{
		        window.alert('Directions request failed due to ' + status);
		      }
		  	});
    	}
    }*/
    setAnimatedRoute(origin,destination,waypoints,map){
    	var _self = this;
    	var _val = this.state;
    	var directionsService = new google.maps.DirectionsService;
    	//calculate route
    	if(origin && destination){
    		var directionsRenderer = new google.maps.DirectionsRenderer({
        	map: map
    		});
    		directionsRenderer.setDirections(null);
    		directionsService.route({
	        origin: origin,
	        destination: destination,
	        waypoints: waypoints,
	        travelMode: google.maps.TravelMode.DRIVING
	      },function(response, status) {
		      if (status == google.maps.DirectionsStatus.OK) {
		          // display the route
		          directionsRenderer.setDirections(response);
		          _val.autoDriveSteps = new Array();
		          _val.autoDriveSteps = response.routes[0].overview_path.slice(0);
		          _self.startRouteAnimation(origin,_val.autoDriveSteps);
		      } 
		      else{
		        window.alert('Directions request failed due to ' + status);
		      }
	    	});
    	}
    }
		// start the route simulation   
		startRouteAnimation(origin,arr) {
			var _self = this;
			var _val = this.state;
			var marker = new google.maps.Marker(
		  {
		    position: origin,
		    map: this.map,
		  });
		  var length = arr.length;
      var i=0;
    	var autoDriveTimer = setInterval(function () {
          // stop the timer if the route is finishe
        _self.map.panTo(arr[i]);
        marker.setPosition(arr[i]);
        i++;
        if(i==length){
        	clearInterval(autoDriveTimer);
        }
      },80);
		}
  	render() {
	    return(
	    	<div>
		    	<div className="col-md-6">
		    		<div className="GMap">
			      	<div className='GMap-canvas' ref="mapCanvas">
			      	</div>
			      </div>
			    </div>
			    <div className="col-md-6">
		      	{/*<button type="button" className="btn btn-primary" onClick={() => this.startRouteAnimation(this.state.origin,this.state.autoDriveSteps)}>Click to start Route 1</button>
		      	<button type="button" className="btn btn-primary" onClick={() => this.startRouteAnimation(this.state.origin2,this.state.autoDriveSteps2)}>Click to start Route 2</button>*/}
		      	<button type="button" className="btn btn-primary" onClick={() => this.setAnimatedRoute(this.state.startCord1,this.state.endCord1,this.state.waypointsArr1,this.state.map)}>Click to start Route 1</button>
		      	<button type="button" className="btn btn-primary" onClick={() => this.setAnimatedRoute(this.state.startCord2,this.state.endCord2,this.state.waypointsArr2,this.state.map)}>Click to start Route 2</button>
		      </div>
		    </div>
	    ) 
		}

	  componentDidMount() {
	    this.map = this.createMap();
	    this.state.map = this.map;
	    var _val = this.state;
	    google.maps.event.addListener(this.map, 'zoom_changed', ()=> this.handleZoomChange())
	    _val.startCord1 = 'New Delhi';
	    _val.endCord1 = 'Jamshedpur';
	    _val.waypointsArr1 = 
	    [
	    	{
	    		location:'Agra',
	    		stopover: true
	    	},
	    	{
	    		location:'Allahabad',
	    		stopover:true
	    	},
	    	{
	    		location:'Varanasi',
	    		stopover:true
	    	},
	    	{
	    		location:'Gaya',
	    		stopover:true
	    	}
	    ];
	    _val.startCord2 = 'Panipat';
	    _val.endCord2 = 'Mathura';
	    _val.waypointsArr2 = 
	    [
	    	{
	    		location:'Aligarh',
	    		stopover:true
	    	}
	    ]
	    //this.setAnimatedRoute(_val.startCord1,_val.endCord1,_val.waypointsArr1,_val.startCord2,_val.endCord2,_val.waypointsArr2,this.map);
	  }

	  // clean up event listeners when component unmounts
	  componentDidUnMount() {
	    google.maps.event.clearListeners(map, 'zoom_changed')
	  }

	  createMap() {
	    let mapOptions = {
	      zoom: this.state.zoom,
	      center: this.mapCenter()
	    }
	    return new google.maps.Map(this.refs.mapCanvas, mapOptions)
	  }

	  mapCenter() {
	    return new google.maps.LatLng(
	      this.props.initialCenter.lat,
	      this.props.initialCenter.lng
	    )
	  }
	  handleZoomChange() {
	    this.setState({
	      zoom: this.map.getZoom()
	    })
	  }
};

export default App;