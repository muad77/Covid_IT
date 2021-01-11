(function() {
   
    var myConnector = tableau.makeConnector();
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
            id: "GBP",
            alias: "GBP",
            dataType: tableau.dataTypeEnum.float
        },{
            id: "base",
            alias: "base",
            dataType: tableau.dataTypeEnum.string
        },{
            id: 'date',
            alias: "date",
            dataType: tableau.dataTypeEnum.date
        },
        ];
        var tableSchema = {
            id: "Waluty",
            alias: "Waluty",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {

        $.getJSON("https://api.exchangeratesapi.io/history?start_at=2010-01-01&end_at=2022-09-01&symbols=PLN,USD,GBP", function(resp) {
            //var list = data.json(),       // what method to call? .feature .ts .list..
          
            let data = resp.rates;           
            let tableData = [];
          
            //const filteredData = data.filter(item => item.code === "USD"); //włączony to: for (let item of filteredData) {
            
            for (let i in data) {
                tableData.push({
                   PLN: resp.rates[i]['PLN'],
                   USD: resp.rates[i]['USD'],
                   GBP: resp.rates[i]['GBP'],                 
                   base: resp['base'], 
                   date: i,       
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
            tableau.connectionName = "Currency"; // This will be the data source name in Tableau
            tableau.submit();                     // This sends the connector object to Tableau
        });
    });
})();