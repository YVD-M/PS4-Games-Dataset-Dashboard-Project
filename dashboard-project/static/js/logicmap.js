// Adding tile layer
var streetmap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY,
  }
);

var darkmap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY,
  }
);

var satellitemap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/satellite-v9",
    accessToken: API_KEY,
  }
);

// Define a baseMaps object to hold our base layers
var baseMaps = {
  "Street Map": streetmap,
  "Dark Map": darkmap,
  "Satelite": satellitemap,
};

let games = new L.LayerGroup();

// Create overlay object to hold our overlay layer
var overlayMaps = {
  Games: games,
};

// Creating map object
var myMap = L.map("map", {
  center: [40.7128, -74.0059],
  zoom: 2,
  layers: [satellitemap, games],
});

L.control
  .layers(baseMaps, overlayMaps, {
    collapsed: false,
  })
  .addTo(myMap);

d3.csv("../static/data/PS4_GamesSales.csv").then(function (csvdata) {
  console.log(csvdata);

  // var option = d3.select("#selDataset").property("value");
  // console.log(`option found value ${option}`);
  // option = option.toString()

  option = "Grand Theft Auto V";

  //option = "Red Dead Redemption 2";
  
  for (let i = 0; i < csvdata.length; i++) {
    let row = csvdata[i];
    if (row.Game == option) {
      var globalSales = row.Global;
      console.log(`Global found! ${globalSales}`);

      // Function that will determine the color of a country based on the country/continent it belongs to
      function chooseColor(country, continent) {
        categories = [
          " Lowest",
          " Bottom 20%",
          " Bottom 40%",
          " Top 40%",
          " Top 20%",
          " Highest",
        ];
        legColor = [
          "#0000FF", // blue
          "#008000", // green
          "#7fff00", // chartreuse
          "#FFFF00", // yellow
          "#ff8c00", // darkorange
          "#FF0000", // red
        ];
        switch (country) {
          case "Japan":
            var japanSales = parseFloat(row.Japan);
            if (japanSales === 2.17) {
              return legColor[5];
            } else if (japanSales >= 1.74 && japanSales < 2.17) {
              return legColor[4];
            } else if (japanSales >= 1.3 && japanSales < 1.74) {
              return legColor[3];
            } else if (japanSales >= 0.87 && japanSales < 1.3) {
              return legColor[2];
            } else if (japanSales >= 0.43 && japanSales < 0.87) {
              return legColor[1];
            } else if (japanSales >= 0.0 && japanSales < 0.43) {
              return legColor[0];
            }
        }

        switch (continent) {
          case "North America":
            var naSales = parseFloat(row.NorthAmerica);
            // console.log(naSales);
            if (naSales === 6.18) {
              return legColor[5];
            } else if (naSales >= 4.94 && naSales < 6.18) {
              return legColor[4];
            } else if (naSales >= 3.71 && naSales < 4.94) {
              return legColor[3];
            } else if (naSales >= 2.47 && naSales < 3.71) {
              return legColor[2];
            } else if (naSales >= 1.24 && naSales < 2.47) {
              return legColor[1];
            } else if (naSales >= 0.0 && naSales < 1.24) {
              return legColor[0];
            }

          case "Europe":
            var europeSales = parseFloat(row.Europe);
            //console.log(europeSales);
            if (europeSales === 9.71) {
              return legColor[5];
            } else if (europeSales >= 7.77 && europeSales < 9.71) {
              return legColor[4];
            } else if (europeSales >= 5.83 && europeSales < 7.77) {
              return legColor[3];
            } else if (europeSales >= 3.88 && europeSales < 5.83) {
              return legColor[2];
            } else if (europeSales >= 1.94 && europeSales < 3.88) {
              return legColor[1];
            } else if (europeSales >= 0.0 && europeSales < 1.94) {
              return legColor[0];
            }

          default:
            var restSales = parseFloat(row.RestofWorld);
            //console.log(restSales);
            if (restSales === 3.02) {
              return legColor[5];
            } else if (restSales >= 2.42 && restSales < 3.02) {
              return legColor[4];
            } else if (restSales >= 1.81 && restSales < 2.42) {
              return legColor[3];
            } else if (restSales >= 1.2 && restSales < 1.81) {
              return legColor[2];
            } else if (restSales >= 0.6 && restSales < 1.2) {
              return legColor[1];
            } else if (restSales >= 0.0 && restSales < 0.6) {
              return legColor[0];
            }
        }
      }
      console.log(`Pring at line 172  found value ${option}`);
      // Use this link to get the geojson data.
      var link = "../static/data/countries.geojson";
      // Grabbing our GeoJSON data..
      d3.json(link).then(function (data) {
        // Creating a geoJSON layer with the retrieved data
        L.geoJson(data, {
          // Style each feature (in this case a country)
          style: function (feature) {
            return {
              color: "white",
              // Call the chooseColor function to decide which color to color our country (color based on country)
              fillColor: chooseColor(
                feature.properties.name,
                feature.properties.continent
              ),
              fillOpacity: 0.5,
              weight: 1.5,
            };
          },
          // Called on each feature
          onEachFeature: function (feature, layer) {
            // Set mouse events to change map styling
            layer.on({
              // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
              mouseover: function (event) {
                layer = event.target;
                layer.setStyle({
                  fillOpacity: 0.9,
                });
              },
              // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
              mouseout: function (event) {
                layer = event.target;
                layer.setStyle({
                  fillOpacity: 0.5,
                });
              },
              // When a feature (country) is clicked, it is enlarged to fit the screen
              //fitbounds is boundry property of a leaflet map
              //getbounds boundaries of polygon data from geojson within which event trigger
              click: function (event) {
                myMap.fitBounds(event.target.getBounds());
              },
            });
            // Giving each feature a pop-up with information pertinent to it
            if (feature.properties.continent === "North America") {
              var sales = row.NorthAmerica;
              var perc = parseInt((sales / row.Global) * 100);
              var region = "North America";
            } else if (feature.properties.continent === "Europe") {
              var sales = row[feature.properties.continent];
              var perc = parseInt((sales / row.Global) * 100);
              var region = "Europe";
            } else if (
              feature.properties.continent === "Asia" &&
              feature.properties.name === "Japan"
            ) {
              var sales = row.Japan;
              var perc = parseInt((sales / row.Global) * 100);
              var region = "Japan";
            } else {
              var sales = row.RestofWorld;
              var perc = parseInt((sales / row.Global) * 100);
              var region = "Rest of World";
            }

            layer.bindPopup(
              "<h3>" +
                feature.properties.name +
                " is part of '" +
                region +
                "' region where Sales total $" +
                sales +
                "m  " +
                " That's " +
                perc +
                "% of worldwide " +
                option.toUpperCase() +
                " sales!" +
                "</h3>"
            );
          },
        }).addTo(games);

        //close d3.json then function line 53:
      });
      //close csv for and if function line 25/27:
    }
  }
  //close csv then function line 17:
  // Set up the legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function (map) {
    var div = L.DomUtil.create("div", "legend");

    div.innerHTML += "<h4>Hotest game?</h4>";

    categories = [
      " Top sales",
      " Top 80%-99%",
      " Top 60%-80%",
      " Mid 40%-60%",
      " Bottom 20%-40%",
      " Bottom 0-20%",
    ];
    legColor = [
      "#FF0000",  // red
      "#ff8c00",  // darkorange
      "#FFFF00",  // yellow
      "#7fff00",  // chartreuse
      "#008000",  // green
      "#0000FF",  // blue
     ];

    for (var i = 0; i < categories.length; i++) {
      div.innerHTML += `<i style="background: ${legColor[i]}"></i><span> ${categories[i]}</span><br>`;
    }

    return div;
  };
  // Adding legend to the map
  legend.addTo(myMap);


});
