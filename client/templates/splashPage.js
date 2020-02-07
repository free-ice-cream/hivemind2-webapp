Template.layout.helpers({
// startButton: function(){
//   console.log("startButton called");
//   Router.go("/input");
// }

});
// function startButton(){
//   console.log("startButton called");
//   Router.go("/input");
// };
Template.layout.events({
    'click .start': function() {
      Router.go("/login");
        //return startButton();
    },
    'click .partners': function() {
      Router.go("/partners");
        //return startButton();
    }
});
