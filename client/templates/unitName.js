Template.unitName.helpers({


});
Template.unitName.events({
  'submit .unitName':function(event){
  event.preventDefault();
  console.log("beep BOOP");
  var strings=event.target.strings.value;
  var updateName = LocalData.findOne({userData: "tinsel"});
  //
  LocalData.update( updateName._id , {$set: {unit: strings}});
  Router.go("/draw");



  }



});
