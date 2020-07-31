(function() {
    // Create the connector object

    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "data",
            alias:"Data",
            dataType: tableau.dataTypeEnum.date
        }, {
            id: "stato",
            alias: "Stan",
            dataType: tableau.dataTypeEnum.string
        }, {
           id: "ricoverati_con_sintomi",
           alias: "Zarażeni",
           dataType: tableau.dataTypeEnum.int
        },
        {
            id: "terapia_intensiva",
            alias:"Intensywna terapia",
            dataType: tableau.dataTypeEnum.int
        },
        {
           id: "totale_ospedalizzati",
           alias:"Ogółem hospitalizowani",
          dataType: tableau.dataTypeEnum.int
      },
    {
          id: "isolamento_domiciliare",
          alias:"Izolacja domowa",
          dataType: tableau.dataTypeEnum.int
    },
    {
           id: "totale_positivi",
           alias:"Ogółem zarażeni",
           dataType: tableau.dataTypeEnum.int
  },
  {
          id: "variazione_totale_positivi",
           alias:"Całkowita zmiana",
          dataType: tableau.dataTypeEnum.int
},
{
         id: "nuovi_positivi",
         alias:"Nowi",
          dataType: tableau.dataTypeEnum.int
},
{
          id: "dimessi_guariti",
          alias:"Wyzdrowieni",
          dataType: tableau.dataTypeEnum.int
}, {
          id: "deceduti",
          alias:"Zgony",
         dataType: tableau.dataTypeEnum.int
},
 {
         id: "totale_casi",
          alias:"Ilość całkowita",
          dataType: tableau.dataTypeEnum.int
}, {
          id: "tamponi",
          alias:"Testowani",
          dataType: tableau.dataTypeEnum.int
}];
        var tableSchema = {
            id: "OpenPuglia",
            alias: "OpenPuglia API data of Coronavirus",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {

        $.getJSON("https://openpuglia.org/api/?q=getsummarydatacovid-19&mode=ts&lang=it", function(data) {
            //var list = data.json(),       // what method to call? .feature .ts .list..
            var  tableData = [];
          console.log(data)
            // Iterate over the JSON object
            for (var i = 0; i < data.length; i++) {
                tableData.push({
                    "data":data[i]["data"],  // metti in data la response al campo "data"
                    "stato":data[i]["stato"],
                    "ricoverati_con_sintomi":data[i]["ricoverati con sintomi"],
                    "terapia_intensiva":data[i]["terapia intensiva"],
                    "totale_ospedalizzati":data[i]["totale ospedalizzati"],
                    "isolamento_domiciliare":data[i]["isolamento domiciliare"],
                    "totale_positivi":data[i]["totale positivi"],
                    "variazione_totale_positivi":data[i]["variazione totale positivi"],
                    "nuovi_positivi":data[i]["nuovi positivi"],
                    "dimessi_guariti":data[i]["dimessi guariti"],
                    "deceduti":data[i]["deceduti"],
                    "totale_casi":data[i]["totale casi"],
                    "tamponi":data[i]["tamponi"]
                });
            }
   console.log(tableData)
            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "OpenPuglia"; // This will be the data source name in Tableau
            tableau.submit();                     // This sends the connector object to Tableau
        });
    });
})();
