(function () {
    var myConnector = tableau.makeConnector();
    myConnector.getSchema = function (schemaCallback) {
      var cols = [
        {
          id: 'value',
          alias: 'value',
          dataType: tableau.dataTypeEnum.float,
        },
        {
          id: 'time',
          alias: 'Time',
          dataType: tableau.dataTypeEnum.string,
        },
        {
          id: 'geo',
          alias: 'Kraj',
          dataType: tableau.dataTypeEnum.string,
        },
        {
          id: 'updated',
          alias: 'Aktualizacja',
          dataType: tableau.dataTypeEnum.date,
          },
        {
          id: 'label',
          alias: 'Nazwa',
          dataType: tableau.dataTypeEnum.string,
        },
        {
            id: 'unit',
            alias: 'Jaki okres',
            dataType: tableau.dataTypeEnum.string,
          },
      ];
      var tableSchema = {
        id: 'Eurostat',
        alias: '02_CPI',
        columns: cols,
      };
  
      schemaCallback([tableSchema]);
    };
  
    // Download the data
    myConnector.getData = function (table, doneCallback) {
      let url = 'http://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/teicp000?precision=1&unit=PCH_M12&coicop=CP00';
  
      JSONstat('https://api.codetabs.com/v1/proxy?quest=' + url).then(function (resp) {
        let data = resp.toTable({ type: 'array' });
        let columns = data.shift();
        let indexes = {};
        let tableData = [];
  
        // Store the index for each column so later they are not added to the wrong columns
        for (let c in columns) {
          indexes[columns[c]] = +c;
        }
  
        // Get the right value from each row (an array of values) based on the column index
        for (let row of data) {
          tableData.push({
            value: row[indexes.Value],
            time: row[indexes.time],
            geo: row[indexes.geo],
            updated: resp.updated,
            label: resp['label'],
            unit: row[indexes.unit],
          });
        }
  
        table.appendRows(tableData);
        doneCallback();
      });
    };
  
    tableau.registerConnector(myConnector);
  
    // Create event listeners for when the user submits the form
    $(document).ready(function () {
      $('#submitButton').click(function () {
        tableau.connectionName = '02_CPI'; // This will be the data source name in Tableau
        tableau.submit(); // This sends the connector object to Tableau
      });
    });
  })();