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
          id: 'Eurostat_data',
          alias: 'Eurostat',
          columns: cols,
      };
  
      schemaCallback([tableSchema]);
    };
  
    // Download the data
    myConnector.getData = function (table, doneCallback) {
       
      //Gross domestic product, current prices  
      JSONstat('https://cors-anywhere.herokuapp.com/' + 'http://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/teina010?na_item=B1GQ&precision=1&unit=MIO_EUR_SCA&s_adj=SCA').then(function(resp) {
        let data = resp.toTable({ type: 'array' });
        let columns = data.shift();
        let indexes = {};
        let tableData = [];
  
        // Store the index for each column so later they are not added to the wrong columns
        for (let c in columns) {
          indexes[columns[c]] = c;
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
        
      });
      
      //Current account balance - 3 year average  
      JSONstat('https://cors-anywhere.herokuapp.com/' + 'http://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/tipsbp10?precision=1&unit=PC_GDP_3Y&partner=WRL_REST&stk_flow=BAL&s_adj=NSA&bop_item=CA').then(function(resp) {
        let data = resp.toTable({ type: 'array' });
        let columns = data.shift();
        let indexes = {};
        let tableData = [];
  
        for (let c in columns) {
          indexes[columns[c]] = c;
        }
  
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
        
      });
      
      //	Building permits - quarterly data
      JSONstat('https://cors-anywhere.herokuapp.com/' + 'http://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/sts_cobp_q?precision=1&unit=PCH_SM&s_adj=NSA&indic_bt=PNUM&nace_r2=F_CC11_X_CC113').then(function(resp) {
        let data = resp.toTable({ type: 'array' });
        let columns = data.shift();
        let indexes = {};
        let tableData = [];
  
        for (let c in columns) {
          indexes[columns[c]] = c;
        }
  
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
        
      });
     
      //	Production in construction"
      JSONstat('https://cors-anywhere.herokuapp.com/' + 'http://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/teiis500?precision=1&unit=PCH_M12_CA&unit=PCH_M1_SCA&indic_bt=PROD&nace_r2=F').then(function (resp){
        let data = resp.toTable({ type: 'array' });
        let columns = data.shift();
        let indexes = {};
        let tableData = [];

        for (let c in columns) {
          indexes[columns[c]] = c;
        }

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
        
      });

      
      //	houses prices
      JSONstat('https://cors-anywhere.herokuapp.com/' + 'http://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/teicp270?indic=TOTAL&precision=1&unit=PCH_Q4_NSA').then(function(resp) {
        let data = resp.toTable({ type: 'array' });
        let columns = data.shift();
        let indexes = {};
        let tableData = [];

        for (let c in columns) {
          indexes[columns[c]] = c;
        }

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
        
      });

      
      //	Gross domestic product, volumes (zmiana % kdk)
      JSONstat('https://cors-anywhere.herokuapp.com/' + 'http://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/teina011?na_item=B1GQ&precision=1&unit=PCH_Q4_SCA').then(function(resp) {
        let data = resp.toTable({ type: 'array' });
        let columns = data.shift();
        let indexes = {};
        let tableData = [];
  
        for (let c in columns) {
          indexes[columns[c]] = c;
        }
  
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
       //doneCallback();
      });


      doneCallback();
    };
  
    tableau.registerConnector(myConnector);
  
    // Create event listeners for when the user submits the form
    $(document).ready(function () {
      $('#submitButton').click(function () {
        tableau.connectionName = 'Eurostat'; // This will be the data source name in Tableau
        tableau.submit(); // This sends the connector object to Tableau
      });
    });
  })();