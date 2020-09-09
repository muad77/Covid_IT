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
            id: "Cumulative_number_for_14_days_of_COVID-19_cases_per_100000",
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

        $.getJSON("https://cors-anywhere.herokuapp.com/https://opendata.ecdc.europa.eu/covid19/casedistribution/json", function(resp) {
            //var list = data.json(),       // what method to call? .feature .ts .list..
            let tableData = [];
            let data = resp.records;                                  
            
                 const filteredData = data.filter(item => item.countriesAndTerritories === 'Poland')   
                
            // Iterate over the JSON object
            for (let item of filteredData) {
                tableData.push({
                    dateRep: item["dateRep"],                
                    cases: item["cases"],
                    deaths: item["deaths"],
                    countriesAndTerritories: item["countriesAndTerritories"],                   
                    countryterritoryCode: item["countryterritoryCode"],
                    popData2019: item["popData2019"],
                    continentExp: item["continentExp"],                  
                    Cumulative: item["Cumulative_number_for_14_days_of_COVID-19_cases_per_100000"],                   
                });
            }   
            console.log(data)          
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