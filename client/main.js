import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { HTTP } from 'meteor/http';
var apiSlot = apiData.findOne();
var apiId=apiSlot._id;
var foo = apiData.findOne({_id: apiId});
var apiKey = foo.apiKey;
var apiURL = foo.api;

//TODO  
// var url =  'https://free-ice-cream.appspot.com/v1/players/';
// var api_key = "95e5d50a-5271-4ea0-a6fb-0165bdde92f5";
// var options = {
//   headers: {
//         'Content-Type': 'application/json',
//         "X-API-KEY":"95e5d50a-5271-4ea0-a6fb-0165bdde92f5"
//
//
//       }
//   // player:{
//   //       'Content-Type': 'application/json',
//   //       // 'Accept': 'application/problem+json',
//   //       "name": "bob"
//   //     }
//
//   };
  // var playerOption = {
  //   player:{
  //         'Content-Type': 'application/json',
  //         // 'Accept': 'application/problem+json',
  //         "name": "bob"
  //       }
  //
  // };

// var options = {
//     'headers':{ 'Authorization': 'Bearer 0c724a3b-fg25-f4b0-afe9-q76b74533e21',
//                 'Content-Type': 'application/json'
//               }
// };
// var spork = HTTP.call('POST', url, options , (error, result) => {
//   if (error) {
//         console.log("error",error);
//         //cb && cb(new Meteor.Error(500, 'There was an error processing your request.', error));
//   } else {
//          console.log("result",result);
//          cb && cb(null, result);
//   }
// });
//
// var didactic= HTTP.call('POST', url, playerOption , (error, result) => {
//   if (error) {
//         console.log("error",error);
//         //cb && cb(new Meteor.Error(500, 'There was an error processing your request.', error));
//   } else {
//          console.log("result",result);
//          cb && cb(null, result);
//   }
// });
//TODO this is the working code below

// var newPlayer={'name': 'charlie'};
// 	setHeader = function(xhr) { xhr.setRequestHeader("X-API-KEY", "95e5d50a-5271-4ea0-a6fb-0165bdde92f5"); }
// 	$.ajax({
//           url: 'https://free-ice-cream.appspot.com/v1/players/?player=',
//           type: 'POST',
//           contentType: 'application/json',
//           data: JSON.stringify(newPlayer),
//           //data:{"name": "charlie"},
//           success: function(data) {
// 			      console.log(data);
//             console.log("yets success of sorts");
//           	 //data.forEach(function(player {
//           },
//           //data: JSON.stringify(name),
//           error: function(error) { console.log(error); },
//           beforeSend: setHeader
//         });
