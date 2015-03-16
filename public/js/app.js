var app = angular.module('CitizenApp', ['ngRoute']);


//do some config blah blah
app.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: 'home.html',
        controller: 'reportingController'
    })
    .when('/reports', {
        templateUrl: 'reports.html',
        controller: 'reportsController'
    })
    .when('/api', {
        templateUrl: 'api.html',
        controller: 'ApiController'
    })
    .when('/about', {
        templateUrl: 'about.html',
        controller: 'FeedbackController'
    })
    .otherwise({
        redirectTo: '/'
    })
}]);


 
app.controller('rootController', ['$scope', function($scope){
                
            $scope.currentView = '';
            
            var content= "";
    
            if (navigator.geolocation){
                navigator.geolocation.getCurrentPosition(success);
            }
            else
            {    
                //means the user's browser does not support...maybe you can guess from his request IP address
              content = "Your browser does not support geolocation";
              $scope.content = content;
            }
            
       
         //called if the user approves of sharing his location
            function success(position){
                
                    $scope.position = {latitude: position.coords.latitude, longitude: position.coords.longitude};
                    console.log("From root");
                    console.log($scope.position);
            }
            
            //called if user denies to share location or some other problem makes it impossible to access user's location
            function handleError(){
                
                content = 'Error: The Geolocation service failed';
               
                $scope.content = content; 
             
            }
}]);

app.controller('reportingController', ['$scope', '$http', function($scope, $http){
          
            $scope.currentView = 'Home';
            
            $scope.fetchReports = function(){
                $http.get('/api/reports?limit=5').success(function(data){
                $scope.reports = data;
            });
            }

            $scope.queryReports = function(){
                //get the keys
                var query_url = '/api/reports?';
                if($scope.query.limit != null){
                     query_url+'limit='+$scope.query.limit;
                }
                else{
                    $http.get('/api/reports?limit=1').success(function(data) {
                    $scope.reports = data;
                });
             }  
                
            }
            
            $scope.submit = function(){
               
                var rep = $scope.report;
                
                rep.location = [$scope.position.latitude, $scope.position.longitude];
                
                $http.post('/report', rep)
                    .success(function(data){
                    $scope.success = "Your response has been recorded";
                    $scope.report = {};
                    })
                    .failure(function(data){
                   $scope.failure = "Your response could not be recorded";
               });
            }
           
           
            
            
            
           
    }]);


app.controller('reportsController', ['$scope', '$http', function($scope, $http) {
    $scope.currentView = 'Reports';
    $scope.selectedCategory = '';
    
    $scope.reportType = ''; 
    var categoryTypes = {'Safety': ['Theft', 'Teasing', 'Suspicious  Behaviour', 'Violence', 'Other'], 'Facility': ['Roads', 'Electricity', 'Water', 'Cleanliness', 'Other']}
       
    $scope.reportTypes = [];  
    
    $scope.toggleCategory = function(category){
              $scope.selectedCategory = category;
              $scope.reportTypes = categoryTypes[category];
            }

    $scope.getReports = function(){
        
    }
        
        var mapOptions = {
            zoom: 14
        };
     
     map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    if (undefined != $scope.position){
        var pos = new google.maps.LatLng($scope.position.latitude, $scope.position.longitude);

    map.setCenter(pos);

    var marker = new google.maps.Marker({
        position: pos,
        map: map,
        draggable: true,
        title: 'You are here!'
    });
    }
    
    google.maps.event.addListener(marker, 'drag_end', updatePosition);
    
    
      google.maps.event.addListener(map, 'center_changed', function() {
        
          map.setCenter(marker.getPosition());
      });
      
    function updatePosition(){
     console.log(marker.getPosition());
     $scope.position = marker.getPosition();
   }
   
}]);
    
app.controller('mapController',['$scope', '$http', function($scope, $http) {
        
        
        var mapOptions = {
            zoom: 14
        };
     
     map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    if (undefined != $scope.position){
        var pos = new google.maps.LatLng($scope.position.latitude, $scope.position.longitude);

    map.setCenter(pos);

    var marker = new google.maps.Marker({
        position: pos,
        map: map,
        draggable: true,
        title: 'You are here!'
    });
         
         console.log("From maps");
         console.log($scope.position);
    }
 }]);
 
 app.controller('FeedbackController',['$scope','$http',function($scope,$http){
     
     $scope.currentView = 'About';
     
     $scope.submit = function(fb){
         
         
         $http.post('/feedback', fb).success(function(data){
                $scope.status = "Successful";
                $scope.reset();
         }).failure(function(data){
             $scope.status = "Failed";
         });
     }
    
    $scope.reset = function(){
        $scope.feedbackform = {};
    }
     
     
 }]);
 
  app.controller('ApiController',['$scope','$http',function($scope,$http){
     
     $scope.currentView = 'Api';
     
    
 }]);
/*
app.service('location', function(){
    var location = this;
    
    //location.position = {'latitude': 0, 'longitude': 0};
    
    return location;
   
}); */