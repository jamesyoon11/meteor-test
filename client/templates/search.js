var handle = Meteor.subscribe('jobListByZip');
var lastInfoWindow;

Template.search.rendered = function() {

  // Google MAP option  
  var mapOptions = {
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById("map-canvas"),
    mapOptions); 

  // Los Angeles geo location
  var pos = {
     lat: 34.0500,
     lng: -118.2500
  };
  map.setCenter(new google.maps.LatLng(pos.lat, pos.lng));

  Meteor.autorun(function(c) {

    // subscribe is ready 
  	if(handle.ready()){

        var jobList = JobAggregate.find().fetch();

        var job;

        var marker, infowindow;

		for(var i = 0; i < jobList.length; i++){

		    job = jobList[i];

		    //IIF
		    (function(jobItem){

			    marker = new google.maps.Marker({
			      position: new google.maps.LatLng(jobItem.lat, jobItem.lng),
			      icon:'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
			    });
			    marker.setMap(map);   

			    infowindow = new google.maps.InfoWindow({
			    	disableAutoPan: true
			    });  
			    
			    var content = '<h4 class="infoTitle">' + jobItem._id +  '</h4><BR>' +
			                  'Total: ' + jobItem.total + '<BR>' + 
			                  'Average Pay: $' + jobItem.avg_pay.toFixed(2) + '<BR>' + 
			                  '<a class="showJobs" data-zip="' + jobItem._id + '">Click here for detail</a>'; 

			    // Add event listener for clicking a marker in google map              
			    google.maps.event.addListener(marker, 'click', (function(marker) {  
			       return function() {  
			       	   if (lastInfoWindow) lastInfoWindow.close();
			           infowindow.setContent(content);  
			           infowindow.open(map, marker);  
			           lastInfoWindow = infowindow;
			       }  
			     })(marker));

		    })(job);

		}
    }
  
  });

};


Template.search.created = function() {

	// For reactive job list when clicking a zip code
    this.templatedata = new ReactiveDict();

}

Template.search.helpers({
  
    jobs: function() {
    	return Template.instance().templatedata.get('jobList');
    }
});

Template.search.events({

	// click event for 'Click here for detail' anchor tag in the Google map marker 
	'click .showJobs': function(e, template){

		e.preventDefault();
		
		var zip = parseInt(e.target.dataset.zip);

    	var data = Jobs.find({zipcode: zip}).fetch();

    	template.templatedata.set('jobList', data);

    	document.getElementsByClassName('job-table')[0].style.display = 'block';
	}
});

