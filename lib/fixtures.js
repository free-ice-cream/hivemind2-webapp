// if (LocalData.find().count() ===0){
//   LocalData.insert({
//     userData: "tinsel",
//     unit: 0
//
//   });
//
// };
if(Player.find().count() ===0){
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
};
if (GameData.find().count() ===0){
  console.log("Fixtures set");
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
};
//
const api_key ="ea2b40c5-77ef-11e8-b325-0c4de9cfe672";//new server
const api_url = 'https://hivemind2.fic.li/v1/';// new server
const tableID ="cae4616e-82af-11e8-8921-0edb985c5d02";
//
// const api_key= "95e5d50a-5271-4ea0-a6fb-0165bdde92f5";//old server
// const api_url = 'https://free-ice-cream.appspot.com/v1/';// old server

apiData= new Mongo.Collection(null);
apiUurl= new Mongo.Collection(null);
tableData = new Mongo.Collection(null);
tableLogin = new Mongo.Collection(null);
//
//console.log("This js file is real"+ api_key);

if (apiData.find().count() <=1){

  apiData.insert({apiKey: api_key});

};
if (apiUurl.find().count() <=1){

  apiUurl.insert({apiURL: api_url});


};
if (tableLogin.find().count() <=1){

  tableLogin.insert({tableId: tableID});


};
