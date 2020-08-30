(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "dateRep",
            alias: "Data",
            dataType: tableau.dataTypeEnum.date
        },{
            id: "cases",
            alias: "Ogółem hospitalizowani",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "deaths",
            alias: "Zgony",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "countriesAndTerritories",
            alias: "Nazwa kraju",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "countryterritoryCode",
            alias: "Kraj",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "popData2019",
            alias: "popData2019",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "continentExp",
            alias: "kontynent",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "Cumulative",
            alias: "Na 1000",
            dataType: tableau.dataTypeEnum.int
        },
        ];
        var tableSchema = {
            id: "LUG",
            alias: "CovidLUG",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {

        $.getJSON("https://opendata.ecdc.europa.eu/covid19/casedistribution/json/", function(resp) {
            //var list = data.json(),       // what method to call? .feature .ts .list..
            
            var data = resp.records,        
                 tableData = [];
               
        console.log(data) 
            // Iterate over the JSON object
            for (var i = 0; i < data.length; i++) {
                tableData.push({
                    "dateRep": data[i]["dateRep"],                
                    "cases": data[i]["cases"],
                    "deaths": data[i]["deaths"],
                    "countriesAndTerritories": data[i]["countriesAndTerritories"],                   
                    "countryterritoryCode": data[i]["countryterritoryCode"],
                    "popData2019": data[i]["popData2019"],
                    "continentExp": data[i]["continentExp"],                  
                    "Cumulative": data[i],
                });
            }
            var newArray = [].filter(function (el) {
                return el.countriesAndTerritories = Poland;
                      
              });
            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "CovidLUG"; // This will be the data source name in Tableau
            tableau.submit();                     // This sends the connector object to Tableau
        });
    });
})();