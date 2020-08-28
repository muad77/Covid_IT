(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "currency",
            alias: "Tajlandia",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "mid",
            alias: "kurs",
            dataType: tableau.dataTypeEnum.int
        },
        ];
        var tableSchema = {
            id: "LUG",
            alias: "NBP",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {

        $.getJSON("http://api.nbp.pl/api/exchangerates/tables/a/today/?format=json", function(resp) {
            //var list = data.json(),       // what method to call? .feature .ts .list..
           
            var data = resp,    
                 tableData = [];
           
        console.log(data) 
            // Iterate over the JSON object
            for (var i = 0; i < data.length; i++) {
                tableData.push({
                    "bat": data[i]["bat"],                
                    "mid": data[i]["mid"],
                    
                });
            }
            
            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "NBP"; // This will be the data source name in Tableau
            tableau.submit();                     // This sends the connector object to Tableau
        });
    });
})();