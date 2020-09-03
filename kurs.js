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
        },{
            id: "effectiveDate",
            alias: "effectiveDate",
            dataType: tableau.dataTypeEnum.date
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

        $.getJSON("https://api.nbp.pl/api/exchangerates/tables/a/today/?format=json", function(resp) {
            //var list = data.json(),       // what method to call? .feature .ts .list..
           
            let tableData = [];
            let data = resp[0].rates;
            
            for (let item of data) {
                tableData.push({
                   currency: item['currency'],
                   code: item['code'],
                   mid: item['mid'],
                   effectiveDate: resp[0]['effectiveDate'],            
              });
            }
            
            console.log(data); 
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