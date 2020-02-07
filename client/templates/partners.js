Template.partners.helpers({
// startButton: function(){
//   console.log("startButton called");
//   Router.go("/input");
// }

});
// function startButton(){
//   console.log("startButton called");
//   Router.go("/input");
// };
Template.partners.events({
    'click .start': function() {
      Router.go("/login");
        //return startButton();
    },
    'click .partners': function() {
      Router.go("/partners");
        //return startButton();
    }
});
