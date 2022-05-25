// Global variables
var ps4data 
var myChart;
var backgroundColor =[
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)'
]

// 1st function to load the page and build the bar graph
function loadPage(sample){
  d3.json("/api/v1.0/all").then((importedData) => {
    ps4data = importedData.data
  var samples = importedData.data;
  var resultArray = samples.filter(sampleObj => sampleObj.Game == sample)[0]
  // getting x and y values ready
  var xaxis = []
  var yaxis = []
  Object.entries(resultArray).forEach(([key, value]) =>{
    if (key == "Europe"){
      xaxis.push(key)
      yaxis.push(value)
    }
    if (key == "Japan"){
      xaxis.push(key)
      yaxis.push(value)
    }
    if (key == "NorthAmerica"){
      xaxis.push(key)
      yaxis.push(value)
    }
    if (key == "RestofWorld"){
      xaxis.push(key)
      yaxis.push(value)
    }
  }) 
// using chart.js to plot the data
  var ctx = document.getElementById('myChart').getContext('2d');
  myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: xaxis,
          datasets: [{
              label: 'PS4 Game sales in different regions of the world',
              data: yaxis,
              backgroundColor: backgroundColor,
              borderWidth: 0
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  })
};

// initialising the page
function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/api/v1.0/names").then((gamename) => {
    var names = gamename.data

    names.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
  });
}

// Linking the selected game name and give the general infomation about this game
function demoinfo (game){
  document.getElementById("game-info").innerHTML = "";
  var infotable = d3.select("#game-info")
  var tableinfo = ps4data.filter(sample => sample.Game == game)[0]
  console.log(tableinfo)
  Object.entries(tableinfo).forEach(([key, value]) => {
    if(key === "Game"|| key === "Year"|| key === "Genre"|| key === "Publisher") {
      infotable.append("p").text(`${key}: ${value}`)
    }
})
}


// option changed and what will happen next
function optionChanged(id){
  // loadPage(id)
  demoinfo(id)
  //updating the chart.js
  var resultArray = ps4data.filter(sampleObj => sampleObj.Game == id)[0]
  var yaxis = []
  Object.entries(resultArray).forEach(([key, value]) =>{
    if (key == "Europe"){
      yaxis.push(value)
    }
    if (key == "Japan"){
      yaxis.push(value)
    }
    if (key == "NorthAmerica"){
      yaxis.push(value)
    }
    if (key == "RestofWorld"){
      yaxis.push(value)
    }
  }) 
  myChart.data.datasets= [{
  label: "PS4 Game sales in different regions of the world",
  backgroundColor: backgroundColor,
  borderWidth: 0,
  data: yaxis
}]
myChart.update()}

init();
loadPage("FIFA 18");