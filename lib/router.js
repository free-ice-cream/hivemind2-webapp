Router.configure({
  layoutTemplate:'layout'
});
Router.route('/', {name: 'splashPage'});
// Router.route('/unitname', {name: 'unitName'});
// Router.route('/input', {name: 'input'});
// Router.route('/draw', {name: 'draw'});
Router.route('/login', {name: 'login'});

var check = Player.findOne();
// console.log("fix.playerName= "+fix.playerName);

// if(check.playerName == "this is a really unlikley name"){
//   Router.route('/login', {name: 'login'});
//   console.log("player name verified");
// }else{
//   console.log("player already exists");
//   Router.go('/policies');
//
// }

Router.route('/policies', {name: 'policies'});
Router.route('/partners',{name:'partners'});

//
Router.onAfterAction(function() {
  // console.log("router afterAction");
    var self = this;
    // always start by resetting scroll to top of the page
    $(window).scrollTop(0);
    // if there is a hash in the URL, handle it
    if (this.params.hash) {
        // now this is important : Deps.afterFlush ensures that iron-router rendering
        // process has finished inserting the current route template into DOM so we
        // can manipulate it via jQuery, if you skip this part the HTML element you
        // want to scroll to might not yet be present in the DOM (this is probably
        // why your code fails in the first place)
        Tracker.afterFlush(function() {

            if (typeof $("#" + self.params.hash).offset() != "undefined"){
                var scrollTop = $("#" + self.params.hash).offset().top;

                $("html,body").animate({
                    scrollTop: scrollTop
                });

            }

        });
    }
});
