var sliders=0;
var apiSlot = apiData.findOne();
var apiId=apiSlot._id;
var foo = apiData.findOne({_id: apiId});
var apiKey = foo.apiKey;
//
var urlSlot = apiUurl.findOne();
var urlId=urlSlot._id;
var baa = apiUurl.findOne({_id: urlId});
var apiURL = baa.apiURL;
//
var tabId = tableLogin.findOne();
// console.log("tabId= "+tabId);
var tab_id=tabId._id;
var boo = tableLogin.findOne({_id: tab_id});
var tableUuid = boo.tableId;
//
var totFunding=0;
var sliderLevels = new Array();// somewhere to put all the slider ids and values
var sliderIds = new Array();// ok os this is a hack. we're jsut gona store each value in its own array. i know , i know....TODO
var slideStepVal = 10;
//
Template.policies.helpers({
  policy: function(){
    var policies = Policies.find({});
    // for each ()
    console.log("policies -  - ");
    console.log(policies);
    return policies;
    //return Policies.find({}, { sort: { createdAt: -1 } });

  },
  setVals: function(){
    // console.log(" magic id= "+this.id);
    // console.log("magic value = "+this.value);
  //  var foo = this.id;
    sliderLevels.push(0);
    sliderIds.push(this.id);
    // console.log("!!slider level = "+this.id +" value ="+sliderLevels[this.id]);//
    // console.log("sliderLevels.length= "+sliderLevels.length);
    // this.value=0;
  },
  kill: function(){
    Router.go("/login");
  },
  whatGoal: function(){
  var pl=Player.findOne();

    return pl.goal.name;
  },
  whoami: function(){
  var pl=Player.findOne();

    return pl.playerName;
  }


});
Template.pol.helpers({
  sliderNum: function(){
    var locSlider = sliders;
    sliders +=1;
    return "slider"+locSlider;

  },
  maxFund: function(){
    var gd=GameData.findOne();
    var gameData = GameData.findOne({_id: gd._id});
    var maxSpend=gameData.max_spend_per_tick;
    console.log(" ########## maxSpend = "+maxSpend);

    return maxSpend;
  },
  showValue: function(v){

  },
  setFund: function(){
    // console.log("set Fund Called!");

  //  console.log("this.value= "+this.value);
    //console.log("i= "+i);
  },
  slideStep: function(){
    //var slidestep = 30;
    return slideStepVal;
  },
  thisid: function(){
    // console.console.log("this id says ......+");
  },
  setVals: function(){
    // console.log(" magic id= "+this.id);
    // console.log("magic value = "+this.value);
  //  var foo = this.id;
    // sliderLevels.push(0);
    // sliderIds.push(this.id);
    // console.log("!!slider level = "+this.id +" value ="+sliderLevels[this.id]);//
    // console.log("sliderLevels.length= "+sliderLevels.length);
    this.value=0;
  }, zeroStart: function(){
    setVals
  }


  //  var input = document.getElementById("mySlider");
  //  input.value = localStorage.getItem("foo2");
})


function setFunding(pol,fun){

  var pl=Player.findOne();
  // var playerData = Player.findOne({_id: pl._id});// setting this to the 2nt stored id too

  // var playerToken=playerData.token;
  var playerToken=pl.token;
  //var playerToken ={token:playerID};
  // var playerId=playerData.playerId;// alspo reset
  var playerId = pl.playerId2;
  // console.log("fun= +"+fun);
  // console.log("pol= +"+pol);
  var funFloat = parseFloat(fun);
  // var newPlayer={'name': s};
  var funds =[{'amount': funFloat,'from_id': playerId, 'to_id':pol  }];
  console.log("1 funFloat = = "+funFloat);
  console.log("1 pol id = = "+pol);
  // console.log("funds.amount= "+funds.amount);
  // console.log("funds.to= "+funds.to_id);
  console.log("1 playerID var = "+playerId);
  console.log("1 playerToken var = "+playerToken);

////

    setHeader = function(xhr) { xhr.setRequestHeader("X-API-KEY", apiKey);xhr.setRequestHeader("X-USER-KEY", playerToken) };
    $.ajax({
            // url: 'https://free-ice-cream.appspot.com/v1/players/'+playerId+'/funding',
            // url: 'https://hivemind.fic.li/v1/players/'+playerId+'/funding',
            url: apiURL+'players/'+playerId+'/funding',
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(funds),
            success: function(data) {
  			      console.log("Funding data = "+data);


             },

            error: function(error) {  console.log(error); },
            beforeSend: setHeader
          });

}
Template.pol.events({
 'change input[type="range"]': function(e) {
  // console.log(e.target);
  // console.log(e.target.value);
   console.log("e.target.id = "+e.target.id);
   console.log("e.target.value = "+e.target.value);
  // fundTest(e.target.id, e.target.value);
  // console.log("parent.id= "+parent.id);
  console.log("## -> e.target.id= "+e.target.id);
  setFunding(e.target.id, e.target.value);
  // updateFunding(e.target.id, e.target.value);

 }
});
function fundTest (i,v){
  console.log("i= "+i);
  console.log("v= "+v);


}
function updateFunding(tid,tv){
  console.log("###tid =  "+tid);
  console.log("###tv = "+tv);

  // sliderLevels[tid]=tv;

  console.log("sliderLevels[t] = "+sliderLevels[tid]);
  console.log("sliderLevels.length= "+sliderLevels.length);
//TODO
var totFunding1=0;
  for(i=0 ; i < sliderLevels.length; i++) {// set the curr fund value

    if(tid == sliderIds[i]){
      sliderLevels[i]=tv;
    }

  };
  //totFunding1= getTotFunding();
  for(j=0 ; j < sliderLevels.length; j++) {// get tot funding

    totFunding1 += parseFloat(sliderLevels[j]);

  }
  // if(getTotFunding() > getMaxFund()){
  var thisReduc=0;
  while((totFunding1 - thisReduc) >= getMaxFund()){
    console.log("OVERSPEND!!");
    console.log("totFunding1 - thisReduc = "+(totFunding1 - thisReduc));
    thisReduc=lowerLevels(tid);

    console.log("thisReduc=="+thisReduc);


  }

  console.log("totFunding = "+totFunding1);
  getTotFunding();

};
function lowerLevels(exempt){
  var reduction=0;
  for(i=0 ; i < sliderLevels.length; i++) {
    if(sliderIds[i]!= exempt){
      sliderLevels[i]-= slideStepVal;
      reduction+=slideStepVal;
    }
  }
return reduction;

}
function getTotFunding(){
  var tf =0;
  for(i=0 ; i < sliderLevels.length; i++) {// get tot funding

     tf += parseFloat(sliderLevels[i]);
     console.log("getTotFunding tf = "+tf);
    return tf;

  }

}
function getMaxFund(){
  var gd=GameData.findOne();
  var gameData = GameData.findOne({_id: gd._id});
  var maxSpend=gameData.max_spend_per_tick;
  console.log("maxSpend = "+maxSpend);

  return maxSpend;
}



//TODO TABLE STUFF
//

function joinTable(){

    var pl=Player.findOne();
    var playerData = Player.findOne({_id: pl._id});
    var playerToken=playerData.token;
    var playerBalance =playerData.balance;
    // var tableId =  "350738e8-7953-11e8-8921-0edb985c5d02";// this is "test 1"
    // var tableId = "9c0e2e10-7dff-11e8-8921-0edb985c5d02";// this is test 3
    // var tableId = "108b742c-7e01-11e8-8921-0edb985c5d02";//test 4
    // var tableId ="722b7f5e-7e03-11e8-8921-0edb985c5d02";//test 5
    // var tableId = "2aa3fa3c-7e06-11e8-8921-0edb985c5d02"// we the curious

    // var tableId = "a401a27a-7e43-11e8-8921-0edb985c5d02";//couch
    // var tableId = "63d33852-7ea8-11e8-8921-0edb985c5d02";//wills 1
    // var tableId ="88fc9ada-7eab-11e8-8921-0edb985c5d02";//wills 3
    //var tableId ="56074e8a-7ec5-11e8-8921-0edb985c5d02";//wills 4
    // var tableId = "378f71e6-7193-11e9-844d-0edb985c5d02";//TODO THIS NEEDS TO BE ENTERED MANUALLY ATM !!! I KNOW!
    var tableId = "8d160f46-e43c-11e9-844d-0edb985c5d02";
    console.log("playerToken = "+playerToken);
    console.log("playerBalance= "+playerBalance);
    var playerId=playerData.playerId;
    console.log("playerID= "+playerId);
    console.log("apiURL+'players/'+playerId+'/table/'+tableId, = "+apiURL+'players/'+playerId+'/table/'+tableUuid,);
    console.log("api_key= "+apiKey);
  //  var tableId ="70ed8dba-7955-11e8-8921-0edb985c5d02";//This is the "datadome" currentluy dead  :)


//

  ////
  ///players/{player_id}/table/{table_id}

      setHeader = function(xhr) { xhr.setRequestHeader("X-API-KEY", apiKey);xhr.setRequestHeader("X-USER-KEY", playerToken) };
      $.ajax({
              //console.log("seq 1");
            //  headers: {"X-USER-KEY":playerID},
              // url: 'https://free-ice-cream.appspot.com/v1/players/'+playerId+'/claim_budget',
              // url: 'https://hivemind.fic.li/v1/players/'+playerId+'/table/'+tableId,
              url: apiURL+'players/'+playerId+'/table/'+tableId,
              type: 'PUT',
              //data: playerID,
              contentType: 'application/json',
               //data: JSON.stringify(playerToken),
              success: function(data) {
    			      console.log("join table data == "+data);
                tableData.insert(data);


               },

              error: function(error) { console.log(error); },
              beforeSend: setHeader
            });

  }

  Template.joinTableBut.events({
    //event.preventDefault();
    'submit .joinScr':function(event){
      event.preventDefault();
      console.log("but press");
      joinTable();
      //console.log("beep BOOP");
      //var strings=event.target.strings.value;
    //  console.log(strings);
      //var fix = Player.findOne();
      // Player.update(fix._id, {$set :{playerName: strings}});
      // var playerData =  createNewPlayer(strings);
      // var pn = Player.findOne({playerName: strings});
      // console.log("collections says"+pn.playerName );


    //  Router.go("/policies");

    }
  });
  function setDetailRange(){
  document.getElementById("detailSlider").value = "0";
}
