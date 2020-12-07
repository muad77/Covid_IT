(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "PLN",
            alias: "PLN",
            dataType: tableau.dataTypeEnum.float
        },{
            id: "USD",
            alias: "USD",
            dataType: tableau.dataTypeEnum.float
        },{
            id: "base",
            alias: "base",
            dataType: tableau.dataTypeEnum.string
        },
        ];
        var tableSchema = {
            id: "waluty2",
            alias: "waluty2",
            columns: cols
        };
        
        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {

        $.getJSON("https://api.exchangeratesapi.io/history?start_at=2020-11-01&end_at=2029-09-01&symbols=PLN,USD,GBP", function(resp) {
            //var list = data.json(),       // what method to call? .feature .ts .list..
            var data = resp.rates; 
                       tableData = [];                                 
           
                 //const filteredData = data.filter(item => item.countriesAndTerritories === 'Italy'|| item.countriesAndTerritories === 'Poland')  // aby działał zamias data w for(let... filteretData)
                
            // Iterate over the JSON object
            //for (let item of data) {
                for (var i = 0; i < data.length; i++) {  
                tableData.push({
                    "PLN": data.resp[i][i]["PLN"], 
                     USD: data[i][1]["USD"],                
                     base: base["base"],
                                                    
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
            tableau.connectionName = "waluty2"; // This will be the data source name in Tableau
            tableau.submit();                     // This sends the connector object to Tableau
        });
    });
})();