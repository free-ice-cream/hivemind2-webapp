// const the_api_key = require('api_key')
// Template.login.onCreated( function(){

// });
//var api_key = LocalData.findOne();
// console.log("api_key  = "+apiData.findOne());
var apiSlot = apiData.findOne();// a hacky way of storing and retrieving the api key
var apiId=apiSlot._id;
var foo = apiData.findOne({_id: apiId});
var apiKey = foo.apiKey;
//
var urlSlot = apiUurl.findOne();// a hacky way of storing andretrieving the api url
var urlId=urlSlot._id;
var baa = apiUurl.findOne({_id: urlId});
var apiURL = baa.apiURL;
var charlie = "kieth";
console.log(charlie);
// console.log("api apiKey = "+apiKey);
// console.log("api apiUrl = "+apiURL);

Template.login.helpers({
  apiTest: function(){
     //return api_key;
    //return "blah blah";
  },
  auth: function(){
    console.log("auth");
  },
  selectForm: function(){
    let fix = Player.findOne();
    //console.log("fix.playerName= "+fix.playerName);
    if(fix.playerName == "this is a really unlikley name"){
      return Template.createNew;
    }else{
      return Template.destroyOld;
    }
  }




});
// Template.login.events({
//   //event.preventDefault();
//   'submit .playerName':function(event){
//     event.preventDefault();
//     console.log("beep BOOP");
//     var strings=event.target.strings.value;
//     console.log(strings);
//     var fix = Player.findOne();
//     console.log("fix.playerName= "+fix.playerName);
//     if(fix.playerName == "this is a really unlikley name"){
//       console.log("now create a new player");
//
//       Player.update(fix._id, {$set :{playerName: strings}});
//       var playerData =  createNewPlayer(strings);
//       var pn = Player.findOne({playerName: strings});
//       console.log("collections says"+pn.playerName );
//
//     }else{
//       console.log("sorry charlie did you want to kill that player?");
//     }
//
//   //  Router.go("/policies");
//   }
// });

function createNewPlayer(s){
//console.log("api_key  = "+api_key);
var newPlayer={'name': s};
	 setHeader = function(xhr) { xhr.setRequestHeader("X-API-KEY", apiKey); }
//setHeader = function(xhr) { xhr.setRequestHeader("X-API-KEY", "ea2b40c5-77ef-11e8-b325-0c4de9cfe672"); }

	$.ajax({
          // url: 'https://free-ice-cream.appspot.com/v1/players/?player=',
          // url: 'https://hivemind.fic.li/v1/players/?player=',
          url: apiURL+'players/?player=',
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(newPlayer),
          success: function(data) {
			      console.log(data);
            // console.log("yets success of sorts");
             var player= Player.findOne();
             // console.log("player.balance= "+player.balance);
             // console.log("data.balance= "+data.balance);
             // console.log("player._id= "+player._id);
             Player.update(player._id, {$set :{balance: data.balance}});
             Player.update(player._id, {$set :{unclaimedBudget: data.unclaied_budget}});
             Player.update(player._id, {$set : {goal: data.Goal}});
             console.log("player  token= "+data.token);
             Player.update(player._id, {$set : {token: data.token}});
             Player.update(player._id, {$set : {playerId: data.id}});
             Player.update(player._id, {$set : {playerId2: data.id}});
             // console.log("~~from POST data: playerId= "+data.id);
             for(var i=0; i<data.policies.length;i++) {
               Policies.insert( data.policies[i] )
             }
             getGameData();
              // claimBudget();
             Router.go("/policies");

           },

          error: function(error) { console.log(error); },
          beforeSend: setHeader
        });

};
function getGameData(){
  var getId=GameData.findOne();
  console.log("getGameData()  getId._id= "+getId._id);
  setHeader = function(xhr) { xhr.setRequestHeader("X-API-KEY",apiKey); };
  $.ajax({
          // url: 'https://free-ice-cream.appspot.com/v1/game',
          // url: 'https://hivemind.fic.li/v1/game',
          url: apiURL+'game',
          type: 'GET',
          //contentType: 'application/json',
          // data: JSON.stringify(newPlayer),
          success: function(data) {
			      console.log(data);
            console.log("data.budget_per_cycle= "+data.budget_per_cycle );
             GameData.update(getId._id, {$set: {budget_per_cycle: data.budget_per_cycle}});
             GameData.update(getId._id, {$set: {max_spend_per_tick: data.max_spend_per_tick}});
             console.log("GameData updated");
            console.log(GameData.find({}));
            claimBudget();// calling from mere to try an densure we have gamedata before trying to use it
             //
             // game_year:0,
             // game_year_start:"",
             //
             // next_game_year:0,
             // next_game_year_start:null,
             // total_active_players_inflow:0,
             // total_players_inflow:0,
             // version:""

             // for(var i=0; i<data.policies.length;i++) {
             //   Policies.insert( data.policies[i] )
             // }


           },

          error: function(error) { console.log(error); },
          beforeSend: setHeader
        });

};
function claimBudget(){
  //SJ 18/09/18
  // Looks lik ethis is all wrong
  // swapping out to see if i can make this function work without sending the {_id:  xxx.playerId } object
  var pl=Player.findOne();
  // var playerData = Player.findOne({_id: pl.id});
  // var playerData = Player.findOne({_id: pl.playerId});
  // console.log("~ playerData = "+playerData);
  // var playerToken=playerData.token; // comment ed this out

  var playerToken=pl.token;
  // console.log("~ playerToken = "+playerToken);
  //var playerToken ={token:playerID};
  // var playerId=playerData.id; // Commented thei sout
    // var playerId=pl._id;
    var playerId=pl.playerId2;


  console.log("~ playerID var = "+playerId);
  console.log("~ playerToken var = "+playerToken);
////

    setHeader = function(xhr) { xhr.setRequestHeader("X-API-KEY", apiKey);xhr.setRequestHeader("X-USER-KEY", playerToken) };
    $.ajax({
            //console.log("seq 1");
          //  headers: {"X-USER-KEY":playerID},
            // url: 'https://free-ice-cream.appspot.com/v1/players/'+playerId+'/claim_budget',
            // url: 'https://hivemind.fic.li/v1/players/'+playerId+'/claim_budget',
            url:apiURL+'players/'+playerId+'/claim_budget',
            type: 'PUT',
            //data: playerID,
            contentType: 'application/json',
             //data: JSON.stringify(playerToken),
            success: function(data) {
  			      console.log("budget Claimed! data == "+data);


             },

            error: function(error) {  console.log("seq 2"); console.log(error); },
            beforeSend: setHeader
          });

}
Template.createNew.helpers({

});
Template.destroyOld.helpers({
  whoami: function(){
    
    let pn = Player.findOne({playerName: strings});
    console.log("collections says"+pn.playerName );
    return pn.playerName;
  }

});
Template.createNew.events({
  //event.preventDefault();
  'submit .playerName':function(event){
    event.preventDefault();
    console.log("beep BOOP");
    var strings=event.target.strings.value;
    console.log(strings);
    var fix = Player.findOne();
    console.log("fix.playerName= "+fix.playerName);
    if(fix.playerName == "this is a really unlikley name"){
      console.log("now create a new player");
      Player.update(fix._id, {$set :{playerName: strings}});
      var playerData =  createNewPlayer(strings);
      var pn = Player.findOne({playerName: strings});
      console.log("collections says"+pn.playerName );
    }else{
      console.log("sorry charlie did you want to kill that player?");
    }
  }
  //


});

Template.destroyOld.events({
  //event.preventDefault();
  'submit .playerName':function(event){
    event.preventDefault();
    Player.remove({});
    GameData.remove({});
    Policies.remove({});
    // console.log("Player.length = ",Player.find().count());

    Player.insert({
      playerName: "this is a really unlikley name",
      goal: {},
      policies:{},
      table: "",
      token: "",
      unclaimedBudget: 0,
      balance: 0,
      playerId:""

    });
    //
    GameData.insert({
      budget_per_cycle: 0,
      game_year:0,
      game_year_start:"",
      max_spend_per_tick:0,
      next_game_year:0,
      next_game_year_start:null,
      total_active_players_inflow:0,
      total_players_inflow:0,
      version:""
    })

    // console.log("Player.length = ",Player.find().count());
    console.log("blammo");


}
// ,
// 'submit .keepPlayer':function(event){
//   event.preventDefault();
//
//   //Router.go('/policies');
// }

});
