const tournamentSort = (matches, callback) => {
  let uaa = {
    name: "Üsküdar Amerikan Lisesi",
    played: 0,
    atılan: 0,
    yenilen: 0,
    logo: "uaa.jpg"
  }
  let robert = {
    name: "Robert Kolej",
    played: 0,
    atılan: 0,
    yenilen: 0,
    logo: "robert.jpg"
  }
  let koc = {
    name: "Koç Lisesi",
    played: 0,
    atılan: 0,
    yenilen: 0,
    logo: "koc.png"
  }
  let marmara = {
    name: "Marmara Koleji",
    played: 0,
    atılan: 0,
    yenilen: 0,
    logo: "marmara.png"
  }
  let galatasaray = {
    name: "Galatasaray Lisesi",
    played: 0,
    atılan: 0,
    yenilen: 0,
    logo: "galatasaray.png"
  }
  let darussafaka = {
    name: "Darüşşafaka Lisesi",
    played: 0,
    atılan: 0,
    yenilen: 0,
    logo: "darussafaka.jpeg"
  }

  let array = [
    uaa,
    robert,
    koc,
    marmara,
    galatasaray,
    darussafaka
  ];

  matches.forEach(match => {
    let skor = match.get("Skor")
    let matchResult;

    if (skor) {
      matchResult = skor.split("-");
    };

    if (match.teamOne.get("Name") == uaa.name) {
      
      uaa.played++;
      uaa.atılan += parseInt(matchResult[0]);
      uaa.yenilen += parseInt(matchResult[1]);


    } else if (match.teamOne.get("Name") == robert.name) {

      robert.played++;
      robert.atılan += parseInt(matchResult[0]);
      robert.yenilen += parseInt(matchResult[1]);

    } else if (match.teamOne.get("Name") == koc.name) {

      koc.played++;
      koc.atılan += parseInt(matchResult[0]);
      koc.yenilen += parseInt(matchResult[1]);

    } else if (match.teamOne.get("Name") == marmara.name) {

      marmara.played++;
      marmara.atılan += parseInt(matchResult[0]);
      marmara.yenilen += parseInt(matchResult[1]);

    } else if (match.teamOne.get("Name") == galatasaray.name) {

      galatasaray.played++;
      galatasaray.atılan += parseInt(matchResult[0]);
      galatasaray.yenilen += parseInt(matchResult[1]);

    } else if (match.teamOne.get("Name") == darussafaka.name) {

      darussafaka.played++;
      darussafaka.atılan += parseInt(matchResult[0]);
      darussafaka.yenilen += parseInt(matchResult[1]);

    }



    if (match.teamTwo.get("Name") == uaa.name) {

      uaa.played++;
      uaa.atılan += parseInt(matchResult[1]);
      uaa.yenilen += parseInt(matchResult[0]);

    } else if (match.teamTwo.get("Name") == robert.name) {

      robert.played++;
      robert.atılan += parseInt(matchResult[1]);
      robert.yenilen += parseInt(matchResult[0]);

    } else if (match.teamTwo.get("Name") == koc.name) {

      koc.played++;
      koc.atılan += parseInt(matchResult[1]);
      koc.yenilen += parseInt(matchResult[0]);

    } else if (match.teamTwo.get("Name") == marmara.name) {

      marmara.played++;
      marmara.atılan += parseInt(matchResult[1]);
      marmara.yenilen += parseInt(matchResult[0]);

    } else if (match.teamTwo.get("Name") == galatasaray.name) {

      galatasaray.played++;
      galatasaray.atılan += parseInt(matchResult[1]);
      galatasaray.yenilen += parseInt(matchResult[0]);

    } else if (match.teamTwo.get("Name") == darussafaka.name) {

      darussafaka.played++;
      darussafaka.atılan += parseInt(matchResult[1]);
      darussafaka.yenilen += parseInt(matchResult[0]);

    }
  });  

  array.forEach(school => {
    if (school.played === 0) {
      school.yenilen = 1000;
    }
  })

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length-1; j++) {
      if (array[j].atılan < array[j+1].atılan) {
        let empty = array[j];
        array[j] = array[j+1];
        array[j+1] = empty;
      } else if (array[j].atılan === array[j+1].atılan) {
        if (array[j].yenilen > array[j+1].yenilen) {
          let empty = array[j];
          array[j] = array[j+1];
          array[j+1] = empty;
        } else if (array[j].yenilen === array[j+1].yenilen) {
          if (array[j].played > array[j+1].played) {
            let empty = array[j];
            array[j] = array[j+1];
            array[j+1] = empty;
          };
        };
      };
    };
  };
  
  callback(undefined, array);
};

module.exports = tournamentSort;
