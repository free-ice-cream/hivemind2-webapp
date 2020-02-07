if (Units.find().count() ===0){
  Units.insert({
  title: "Ocean Volume",
  description: "The total measure of the oceans in m3",
  si: "m3",
  unit: 1332000000000000
  });

  Units.insert({
  title: "tinsel-microplastic",
  description: "The number of peices of 0.01mm size pieces of microplastic that can be made from a strip of tinsel ",
  si: "number",
  unit: 320000000
  });
  Units.insert({
  title: "uk households",
  description: "The number uk housholds",
  si: "number",
  unit: 27100000
  });


};
// if (LocalData.find().count() ===0){
//   LocalData.insert({
//     system: "metric",
//     unit: null
//
//   });
//   LocalData.insert({
//     system: "imperial",
//     unit: null
//
//   });
// }
