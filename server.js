var mongoose = require('mongoose');
var express = require('express');
var multer = require('multer');
// add mongoose query and promise support to express
require('express-mongoose');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var report = require('./models/report.js');
var feedback = require('./models/feedback.js');
var log = require('./models/log.js');


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer());


app.use(cookieParser());

app.use('/', function(req, res, next){
    log.create({ requestIP: req.ip , requestURL: req.originalUrl}, function(err, log){
        if (err) throw err;
        
        next();
    });
    
});
//app.use(express.static(__dirname + '/public'));

app.use('/', express.static(__dirname + '/public'));

app.get('/api/report/:id', function(req, res, next){
        report.findById(req.params.id, function(err, reports){
           if(err) return next(err);
           
           res.status(200).json(reports);
        });
        
    });
    

//Make this private somehow
app.post('/report',  function(req, res, next){
       if(!req.body == null){
           res.status(400).json({'error': 'Bad Request - Missing body'});
       }
       else
       {
           console.log(req.body);
           report.create(req.body, function(err, report){
            if(err) return next(err);
            
            res.status(200).json(report);
        }); 
       }
    });
    
    
app.post('/feedback',  function(req, res, next){
       if(!req.body == null){
           res.status(400).json({'error': 'Bad Request - Missing body'});
       }
       else
       {
           console.log(req.body);
           feedback.create(req.body, function(err, fb){
            if(err) return next(err);
            
            res.status(200).json(fb);
        }); 
       }
    });
    
    
app.get('/api/reports', function(req, res, next){
      var limit = 0;
      if (req.query.limit != null) {
          limit = req.query.limit;
          delete req.query.limit;
      };
      
      report.find(req.query).limit(limit).select('-__v').sort('-created').exec(function(err, reports){
           if(err) return next(err);
           
           if(reports.length == 0){
               res.status(400).json({'error': 'No matching reports'});
           }
           else
           { res.status(200).json(reports); }
        });
    });


app.set('port', process.env.PORT);


mongoose.set('debug', true);

mongoose.connect('mongodb://'+process.env.IP+'/citizenapp');
    
var db =  mongoose.connection;
    
db.on('error', console.error.bind(console, 'connection error'));
    
db.once('open', function(cb){
    
app.listen(app.get('port'), function () {
    console.log('Server up: http://'+ process.env.IP+ ':' + app.get('port'));
   
  });
    
});    


  