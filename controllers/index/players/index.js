const playerRequest = require('./../../../utils/airtableRequests/playerRequest');
let arrayPlayers = [];
const Player = require('../../../models/player/Player');

module.exports = (req, res, next) => {
  arrayPlayers = [];
  playerRequest(req.base, arrayPlayers, (err, players) => {
    if (err) return console.log(err); 
  //   players.forEach(player => {
  //     let newPlayerData = {
  //       name: player.get("Name"),
  //       date: player.get("Notes"),
  //       gender: player.get("Attachments"),
  //       team: player.school.get("Name"),
  //       gol: player.get("Gol"),
  //       asist: player.get("Asist"),
  //       pozisyon: player.get("Pozisyon"),
  //       position: player.get("Position"),
  //       positionGerman: player.get("Position"),
  //       ayak: player.get("Ayak"),
  //       profile: player.get("Kullanıcı Resmi") || undefined
  //     };
  
  //     const newPlayer = new Player(newPlayerData);
  //     newPlayer.save(err =>  {
  //       if (err) return console.log(err);
  //     });
  //   });
    res.render("index/players/players", {
      page: "index/players/players",
      title: "Oyuncular",
      includes: { 
        external: ["fontawesome", "js", "js-header"]
      },
      players
    });
  });
}
