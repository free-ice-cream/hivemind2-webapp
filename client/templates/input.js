Template.input.onCreated( function(){
  this.currentSystem= new ReactiveVar("metricInput");
});
// var _currentSystem= new ReactiveVar("metricInput");

Template.input.helpers({

  currentSystem: function(){
    return  Template.instance().currentSystem.get();

  },

// formSelector: function(){
//   var updateForms= LocalData.findOne({role: "systemChoice"});
//   console.log(updateForms);
//
//   console.log("system set to "+updateForms.choice);
//   if(updateForms.choice=="metric"){
// console.log(Template.metricInput);
//     return {template : Template[Template.metricInput]};
//   }else if(updateForms.choice=="imperial"){
//     return Template.imperialInput;
//   }else{
//     console.log("choice not set");
//   }
//
//
// }

});
Template.input.events({
'change #system1' : function(event){
event.preventDefault();
//var system =  event.target.system.value;
  console.log("Radio event System 1");
  var updateSystem = LocalData.findOne({role: "systemChoice"});
  LocalData.update( updateSystem._id , {$set: {choice: "metric"}});
  // dynamicFormTempate="metricInput";
  // dynamicDataContext= metricArray;
  // template.currentSystem.set("metricInput");
  Template.instance().currentSystem.set("metricInput");
  // _currentSystem.set("metricInput");
},
'change #system2' : function(event){
event.preventDefault();
//var system =  event.target.system.value;
  console.log("Radio event system2 ");
  var updateSystem = LocalData.findOne({role: "systemChoice"});
  LocalData.update( updateSystem._id , {$set: {choice: "imperial"}});
  // dynamicFormTempate="imperialInput";
  // dynamicDataContext= imperialArray;
  // template.currentSystem.set("imperialInput");
  Template.instance().currentSystem.set("imperialInput");
  // _currentSystem.set("imperialInput");
}
});
Template.generalInput.helpers({
  mainUnitName: function(){
    console.log("this.mainUnitName = "+this.mainUnitName);
    return this.mainUnitName;
  },
  mainUnitId: function(){
    return this.mainUnitId;
  },
  mainUnitPlaceholder: function(){
    return this.mainUnitPlaceholder
  },
  secondUnitName: function(){
    return this.secondUnitName
  },
  secondUnitId: function(){
    return this.secondUnitId
  },
  seconsUnitPlaceholder: function(){
    return this.seconsUnitPlaceholder
  }


});





Template.imperialInput.helpers({


});


Template.metricInput.events({
'submit .metric-input':function(event){
  event.preventDefault();
  var metersInput=event.target.meters.value;
  var centemetersInput=event.target.centemeters.value;
  if(metersInput=="" || metersInput==NaN){
      metersInput=0;
  };
  if(centemetersInput=="" || centemetersInput==NaN){
      centemetersInput=0;
  };

  var meters = parseFloat( metersInput);
  var centemeters = parseFloat(centemetersInput);
  var met = meters + (centemeters/100); // get a value in m
  console.log('Met Height = '+ met);
  if (met != NaN){
    console.log('met =  true');
    var updateMetric = LocalData.findOne({system: "metric"});
    var systemChoice= LocalData.findOne({role: "systemChoice"});
    var unit = "metric";
    //
    LocalData.update( updateMetric._id , {$set: {unit: met}});
    LocalData.update( systemChoice._id , {$set: {choice: unit}});
  //  LocalData.update( updateImperial._id , {$set: {unit: null}});
  };
  Router.go('/draw');
}
});


Template.imperialInput.events({
  'submit .imperial-input':function(event){
    event.preventDefault();
    console.log("event.target.feet.value ="+event.target.feet.value);
    var feetInput=event.target.feet.value;
    var inchesInput=event.target.inches.value;
    if(feetInput=="" || feetInput==NaN){
        feetInput=0;
    };
    if(inchesInput=="" || inchesInput==NaN){
        inchesInput=0;
    }
    var feet = parseFloat(feetInput);
    var inches = parseFloat(inchesInput);
    console.log("feet = "+feet);
    console.log("inches = "+inches);
    //
    var totInches = inches + (feet *12);
    console.log("totInches = "+ totInches);
  //  var imp = ((feet * 12) + inches) * 0.0254; // convert imperial to metric and get a value in m
    var imp = ((feet * 12) + inches); // cadd it all in to inches
    // console.log('Met Height = '+ met);
    console.log('Imp Height = '+ imp);
    if (imp != NaN){
      console.log('imp =  true');
      var updateImperial= LocalData.findOne({system: "imperial"});
      var systemChoice= LocalData.findOne({role: "systemChoice"});
      var unit = "imperial";
      //
      LocalData.update( updateImperial._id , {$set: {unit: imp}});
      LocalData.update( systemChoice._id , {$set: {choice: unit}});
    };
    Router.go('/draw');
  }
});

// js

var metricArray={mainUnitName: "meters", mainUnitId: "mId", mainUnitPlaceholder:"meters",
secondUnitName: "centemeters", mainUnitId: "cmId", mainUnitPlaceholder:"centemeters"};
var imperialArray={mainUnitName: "feet", mainUnitId: "iId", mainUnitPlaceholder:"feet",
secondUnitName: "inches", mainUnitId: "inId", mainUnitPlaceholder:"inches"};
var dynamicDataContext= {};
