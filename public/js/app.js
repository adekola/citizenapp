var app = angular.module('CitizenApp', [])
.controller('rootController', function($scope, $http){
            
            fetchReports();
            
            $scope.showSafety = true;
            $scope.showFacility = true;
            
            $scope.query = {};
            
            //var category_types = {"Safety": ["Theft", "Teasing", "Suspicious Behavior", "Violence", "Other"], "Facility": ["Roads", "Electricity", "Water", "Cleanliness", "Other"]};
            
            $scope.fetchReports = fetchReports;
            $scope.queryReports = queryReports;
            $scope.submit = submit;
            
            function fetchReports(){
                $http.get('/api/reports?limit=5').success(function(data){
                $scope.reports = data;
            });
            }
        
            function queryReports(){
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
            
            
            function submit(){
                
                var rep = $scope.report;
                
                $http.post('/report', rep)
                    .success(function(data){
                    $scope.success = "Your response has been recorded";
                    $scope.report = {};
                    $scope.reports = [];
                    console.log("fetching reports from submit");
                    $scope.$apply(fetchReports());
                    })
                    .failure(function(data){
                   $scope.failure = "Your response could not be recorded";
               });
            }
           
            
            $scope.toggleSafety = function(){
               $scope.showSafety = true;
               $scope.showFacility = false;
               $scope.report.category = "Safety";
            }
            
             $scope.toggleFacility = function(){
                $scope.showSafety = false;
                $scope.showFacility = true;
                $scope.report.category = "Facility";
            }
            
           
    })
    .controller('mapController', function($scope, $http) {
        
        var map; 
        
        var mapOptions = {
            zoom: 10
        };
        
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        
        
            
            if (navigator.geolocation){
                navigator.geolocation.getCurrentPosition(success, handleNoGeolocation(true));
            }
            else
            {    
                //means the user's browser does not support...maybe you can guess from his request IP address
               handleNoGeolocation(false);
            }
            
       
         //called if the user approves of sharing his location
            function success(position){
                //initialize the google maps guy
                
                var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                
                var infoWindow = new google.maps.InfoWindow({
                    map: map, 
                    position: pos, 
                    content: 'Location found using HTML5'
                });
                
                map.setCenter(pos);
                  }
            
            //called if user denies to share location or some other problem makes it impossible to access user's location
            function handleNoGeolocation(flag){
                if(flag)
                    var content = 'Error: The Geolcation service failed';
                else
                    var content = 'Error: your browser doesn\'t support geolocation';
                    
                    
                    var options = {
                        map: map,
                        position: new google.maps.LatLng(60, 105),
                        content: content
                    };
                    
                    var infoWindow = new google.maps.InfoWindow(options);
                    map.setCenter(options.position);
                
            }
 });