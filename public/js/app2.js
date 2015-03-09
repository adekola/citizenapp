var app = angular.module('CitizenApp', ['uiGmapgoogle-maps'])
.controller('rootController', function($scope, $http){
            
            var model = this;
            
            //$scope.feedback = '';
            model.reports = [];
            
            model.showSafety = true;
            model.showFacility = true;
            
            model.category = '';
            
            model.query = {};
            
            //var category_types = {"Safety": ["Theft", "Teasing", "Suspicious Behavior", "Violence", "Other"], "Facility": ["Roads", "Electricity", "Water", "Cleanliness", "Other"]};
            
           
            
            model.fetchReports = function(){
                $http.get('/api/reports?limit=5').success(function(data){
                model.reports = data;
            });
            }
        
            model.queryReports = function(){
                //get the keys
                var query_url = '/api/reports?';
                if(model.query.limit != null){
                     query_url+'limit='+model.query.limit;
                }
                else{
                    $http.get('/api/reports?limit=1').success(function(data) {
                    model.reports = data;
                });
             }  
                
            }
            
            
            model.submit= function(){
                
                var rep = model.report;
                
                $http.post('/report', rep)
                    .success(function(data){
                    model.success = "Your response has been recorded";
                    model.report = {};
                    model.fetchReports();
                    })
                    .failure(function(data){
                   model.failure = "Your response could not be recorded";
               });
            }
           
            model.fetchReports();
            model.toggleSafety = function(){
               model.showSafety = true;
               model.showFacility = false;
               model.report.category = "Safety";
            }
            
             model.toggleFacility = function(){
                model.showSafety = false;
                model.showFacility = true;
                model.report.category = "Facility";
            }
            
           
    })
    .controller('mapController', function($scope, $http) {
      var model = this;
      
      model.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
 });