(function() {
   
    var myConnector = tableau.makeConnector();
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "currency",
            alias: "currency",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "code",
            alias: "code",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "mid",
            alias: "mid",
            dataType: tableau.dataTypeEnum.int
        },
        ];
        var tableSchema = {
            id: "NBP",
            alias: "NBP",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {

        $.getJSON("http://api.nbp.pl/api/exchangerates/tables/a/today/?format=json", function(resp) {
            //var list = data.json(),       // what method to call? .feature .ts .list..
           
            var data = resp[0].rates,  
                 tableData = [];
           
        console.log(data) 
            // Iterate over the JSON object
            for (var i = 0; i < data.lenght; i++) {
                tableData.push({
                    "currency": data[i]["currency"],                
                    "code": data[i]["code"],
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