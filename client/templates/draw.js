Template.draw.onCreated( function(){
  var uT = LocalData.findOne({userData: "tinsel"});
  // return getTinsel() * parseFloat(uT.unit);
  if(uT.unit >= 1){
  this.tinselUse= new ReactiveVar("tinselTrue");
  }else if (uT.unit == 0 || ut.unit ==NaN) {
    this.tinselUse= new ReactiveVar("tinselFalse");
  };
  //
  this.autoPlayModeChange= new ReactiveVar("autoPlayTrue");
});
Template.draw.events({
    'click .restart': function() {
      Router.go("/");
        //return startButton();
    }
});

Template.draw.helpers({
  tinselUseCheck: function(){
    return  Template.instance().tinselUse.get();

  },
  autoPlayCheck: function(){
    if(window.innerWidth <=400 ){
      Template.instance().autoPlayModeChange.set("autoPlayFalse")
    }else {
      Template.instance().autoPlayModeChange.set("autoPlayTrue");
    }

    return Template.instance().autoPlayModeChange.get();


  },
userNumber: function(){
  var locBool = Template.instance().tinselUse.get();
  if(locBool== "tinselTrue"){
  var uT = LocalData.findOne({userData: "tinsel"});
  return uT.unit;
  }else if (locBool== "tinselFalse") {
    return 4;
  }
},
tinselMicroplastics: function(){
  return getTinsel();

},

yourTree: function(){
  return userTinsel();

},
microplasticsInUk: function(){
  // console.log("plasticUK() ="+plasticUK());
  return plasticUK();
},
plasticsInTheOcean: function(){
  // console.log("plasticPerM()= "+plasticPerM());
  return plasticPerM();
},
videoScale: function(){
  var currentView=window.innerWidth;
  var videoWidth;
  var videoHeight;
  if(currentView > 400){
    // console.log("..currentView > 400");
    return "videoSubScale";
    // videoWidth= currentView *0.7;
    // videoHeight = videoWidth/4*3;
    // console.log("videoWidth= "+videoWidth);
  }else if (currentView <=400) {
    // console.log("..currentView <= 400");
    return "videoFullScale";
    // videoWidth=728;
    // videoHeight =532;
  };
},
autoplay:function() {
    var currentView=window.innerWidth;
    if(currentView<= 400){
      console.log("no autoplay");

      return "";

    }else {
      // console.log(" autoplay on");
      return "autoplay='autoplay' ";
    }
}
});
///////here is some bad practice, repeating the above helpers :) /////////

Template.tinselTrue.helpers({
  // tinselUseCheck: function(){
  //   return  Template.instance().tinselUse.get();
  //
  // },
userNumber: function(){

//   var uT = LocalData.findOne({userData: "tinsel"});
//   if(uT.unit >= 1){
//   return uT.unit;
// }else{
//   return 4;
// }
return userTinselStrings();
},
tinselMicroplastics: function(){
  return getTinsel();

},

yourTree: function(){
  return userTinsel();

},
microplasticsInUk: function(){
  // console.log("plasticUK() ="+plasticUK());
  return plasticUK();
},
plasticsInTheOcean: function(){
  // console.log("plasticPerM()= "+plasticPerM());
  return plasticPerM();
},
videoScale: function(){
  var currentView=window.innerWidth;
  var videoWidth;
  var videoHeight;
  if(currentView > 400){
    // console.log("..currentView > 400");
    return "videoSubScale";
    // videoWidth= currentView *0.7;
    // videoHeight = videoWidth/4*3;
    // console.log("videoWidth= "+videoWidth);
  }else if (currentView <=400) {
    // console.log("..currentView <= 400");
    return "videoFullScale";
    // videoWidth=728;
    // videoHeight =532;
  };
}



});
/////and again .....///////

Template.tinselFalse.helpers({
  // tinselUseCheck: function(){
  //   return  Template.instance().tinselUse.get();
  //
  // },
userNumber: function(){
//   var uT = LocalData.findOne({userData: "tinsel"});
//   if(uT.unit >= 1){
//   return uT.unit;
// }else{
//   return 4;
// }
return userTinselStrings();
},
tinselMicroplastics: function(){
  return getTinsel();

},

yourTree: function(){
  return userTinsel();

},
microplasticsInUk: function(){
  // console.log("plasticUK() ="+plasticUK());
  return plasticUK();
},
plasticsInTheOcean: function(){
  // console.log("plasticPerM()= "+plasticPerM());
  return plasticPerM();
},
videoScale: function(){
  var currentView=window.innerWidth;
  var videoWidth;
  var videoHeight;
  if(currentView > 400){
    // console.log("..currentView > 400");
    return "videoSubScale";
    // videoWidth= currentView *0.7;
    // videoHeight = videoWidth/4*3;
    // console.log("videoWidth= "+videoWidth);
  }else if (currentView <=400) {
    // console.log("..currentView <= 400");
    return "videoFullScale";
    // videoWidth=728;
    // videoHeight =532;
  };
}



});


////


////////// NON HELPER FUNCTIONS
// function metInputKM(){
//   var cM = LocalData.findOne({system: "metric"});// the numbers input
//   return cM.unit/1000;
// };
function getSea(){
  //RETURNS THE VOLUME OF THE OCEAN IN m3
    var oV = Units.findOne({title: "Ocean Volume"});
    // console.log("getSea() returns: "+oV.unit);
    return oV.unit;

};

function getTinsel(){
  //RETURNS THE NUMBER OF  PIECES OF MICROPLASTIC 1 STRING OF TINSEL COULD BREAK DOW INTO
    var tM = Units.findOne({title: "tinsel-microplastic"});
    return tM.unit;

};
function userTinselStrings(){
  // RETURNS THE NUMBER OF STRINGS INPUT OR 4 IF NO STRINGS ARE INPUT
  //this shoudl be the only place we check this
  var uT = LocalData.findOne({userData: "tinsel"});
  if(uT.unit >=1){
    return uT.unit ;
  }else {
    return 4;// /the use case for people who do not use tinsel
  }
};
function userTinsel(){
  //RETURNS THE TOT NUMBER OF MICROPLASITC BITS IN THE USERS SET OF TINSEL STRINGS

  return getTinsel() * userTinselStrings();
}
function tinselUK(){
  //RETURNS THE NUMBER OS STRINGS OF TINSEL IN THE UK USING HTE USER AS A BASE RATE
  var hUK = Units.findOne({title: "uk households"});
  return (hUK.unit *.9)*userTinselStrings();
}
function plasticUK(){
  // RETURNS THE NUMBER OF BITS OF MICRO PLLASTIC PRODUCED BY THE WHOLE OF THE UK IF WE USE THE USER AS A BASELINE
    // var hUK = Units.findOne({title: "uk households"});
    // // console.log("hUK.unit = "+hUK.unit );
    // return (hUK.unit *.9)*userTinsel();
    // console.log("plasticUK() returns: "+tinselUK() * getTinsel());
    return tinselUK() * getTinsel();
}
function plasticPerM(){
  // RETURNS THE NUMBER OF MICROPLASTIC PARTS AS GENERATED BY THE UK IN A YEAR STARTING FROM TEH USERS BASE RATE  PER m3 OF THE OCEAN
  //
  return (plasticUK()/ getSea()  ).toFixed(2);
}


// function inputKM(){//either input type cpnverted to meric. tmp until we handle imp measurements properly
//   var cS = LocalData.findOne({role: "systemChoice"});// the numbers input
//   var cM = LocalData.findOne({system: "metric"});// the numbers input
//   var cI = LocalData.findOne({system: "imperial"});// the numbers input
//   if(cS.choice=="metric"){
//     return cM.unit/1000;
//
//   }else if (cS.choice=="imperial") {
//     return (cI.unit*0.0254) /1000;
//   }
//
//
//   // return cM.unit/1000;
// };
// function convertImpToMet(){
//   //bla bla
// };
// function earthBase(){
// var lU = Units.findOne({title: "LU"});// moon orbit
// var eD = Units.findOne({title: "ED"});// earth diameter
// //
// var eDBase = eD.unit/lU.unit;//create the base ratio unit
// return eDBase;
// //
// };
// function moonBase(){
//   var lU = Units.findOne({title: "LU"});// moon orbit
//   var mD = Units.findOne({title: "MD"});// moon diameter
//   //
//   var mDBase = mD.unit/lU.unit;//
//   return mDBase;
// };
// function convertKMtoCM(km){
//   return km * 100000;
//
// };
