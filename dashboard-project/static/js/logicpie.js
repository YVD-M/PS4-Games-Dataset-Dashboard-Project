d3.csv("../static/data/PS4_GamesSales.csv").then(function (csvdata) {
  //console.log(csvdata);

  // var option = d3.select("#selDataset").property("value");
  // console.log(`option found value ${option}`);
  // option = option.toString()

 // option = "Grand Theft Auto V";
  option = "Red Dead Redemption 2";

  var Action = 0
  var ActionAdventure = 0
  var Adventure = 0
  var Fighting = 0
  var Misc = 0
  var MMO = 0
  var Music = 0
  var Party = 0
  var Platform = 0
  var Puzzel = 0
  var Racing = 0
  var Roleplaying = 0
  var Shooter = 0
  var Simulation = 0
  var Sports = 0
  var Strategy = 0
  var VisualNovel = 0


  for (let i = 0; i < csvdata.length; i++) {
    let row = csvdata[i];

    // ###PIE
    if (row.Game == option) {
      var globalSales = row.Global;
      var optiongenre = row.Genre;
      var age = 2022 - parseInt(row.Year)
      console.log(age)
    }

        var genre = row.Genre;
      
        if (genre === "Action") {
          Action = Action + parseFloat(row.Global);
       
         } else if (genre === "Action-Adventure") {
           ActionAdventure = ActionAdventure + parseFloat(row.Global);

        } else if (genre === "Adventure") {
          Adventure += parseFloat(row.Global);
    
        } else if (genre === "Fighting") {
          Fighting += parseFloat(row.Global);
         
        } else if (genre === "Misc") {
          Misc += parseFloat(row.Global);
        
        } else if (genre === "MMO") {
          MMO += parseFloat(row.Global);
         
        } else if (genre === "Music") {
          Music += parseFloat(row.Global);
         
        } else if (genre === "Party") {
          Party += parseFloat(row.Global);
         
        } else if (genre === "Platform") {
          Platform += parseFloat(row.Global);
         
        } else if (genre === "Puzzel") {
          Puzzel += parseFloat(row.Global);
          
        } else if (genre === "Racing") {
          Racing += parseFloat(row.Global);
         
        } else if (genre === "Role-playing") {
          Roleplaying += parseFloat(row.Global);

        } else if (genre === "Shooter") {
          Shooter += parseFloat(row.Global);
         
        } else if (genre === "Simulation") {
          Simulation += parseFloat(row.Global);
        
        } else if (genre === "Sports") {
          Sports += parseFloat(row.Global);
        } else if (genre === "Strategy") {
          Strategy += parseFloat(row.Global);
        } else if (genre === "Visual-Novel") {
          VisualNovel += parseFloat(row.Global);
        }

  // GAUGE START
  
  var datagauge = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: age,
      title: { text: "Age of this game in years"},
      type: "indicator",
      mode: "gauge+number",
      gauge: { axis: {'range': [1, 9]}}
    }
  ];
  var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
  Plotly.newPlot('gauge', datagauge, layout);
  // GAUGE END
  
        
        
        
        //close csv for and if function line 25/27:
}

var total = (Action+ActionAdventure+Adventure+Fighting+Misc+MMO+Music+Party+Platform+Puzzel+Racing+Roleplaying+Shooter+Simulation+Sports+Strategy+VisualNovel);
var percent = parseInt(globalSales/total*100).toFixed(2);
console.log(`${option} has genre ${genre} with Global sales of ${globalSales}m or ${percent}%`);

var data = [{
  values: [Action, ActionAdventure, Adventure, Fighting, Misc, MMO, Music, Party, Platform,Puzzel,Racing,Roleplaying,Shooter,Simulation,Sports,Strategy,VisualNovel],
  labels: ['Action', 'Action Adventure', 'Adventure','Fighting', 'Misc', 'MMO', 'Music', 'Party', 'Platform','Puzzel','Racing','Role playing','Shooter','Simulation','Sports','Strategy','Visual Novel'],
  type: 'pie'
}];


var layout = {
  title: `GENRES: ${option} (${optiongenre}) $${globalSales}m or ${percent}% of Global Market`,
  height: 600,
  width: 800
};

Plotly.newPlot('pie', data, layout);

});
