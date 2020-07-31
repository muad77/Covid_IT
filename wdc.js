(funkcja () {
    var myConnector = tableau.makeConnector ();
    myConnector.getSchema = function (schemaCallback) {
    var cols = [
    {id: "date", alias: "Date", dataType: tableau.dataTypeEnum.string},
    {id: "wycieczki", alias: "Wycieczki dziennie", dataType: tableau.dataTypeEnum.string},
    {id: "farebox", alias: "Farebox Per Day", dataType: tableau.dataTypeEnum.string},
    {id: "unikalne", alias: "Unikalne medaliony", dataType: tableau.dataTypeEnum.string},
    {id: "uniquedrivers", alias: "Unique Drivers", dataType: tableau.dataTypeEnum.string},
    {id: "medperday", alias: "Medallions Per Day", dataType: tableau.dataTypeEnum.string},
    {id: "avg1", alias: "Średnia liczba dni medalionów w drodze", dataType: tableau.dataTypeEnum.string},
    {id: "avg2", alias: "Śr. liczba godzin dziennie na medalion", dataType: tableau.dataTypeEnum.string},
    {id: "avg3", alias: "Śr. liczba dni kierowców na drodze", dataType: tableau.dataTypeEnum.string},
    {id: "avg4", alias: "Śr. liczba godzin dziennie na kierowcę", dataType: tableau.dataTypeEnum.string},
    {id: "avg5", alias: "Śr. minuty na podróż", dataType: tableau.dataTypeEnum.string},
    {id: "cc", alias: "Procent podróży opłaconych kartą kredytową", dataType: tableau.dataTypeEnum.string}
    ];
    var tableInfo = {
    id: "taxi",
    alias: "Dane podróży TLC",
    kolumny: cols
    };
    schemaCallback ([tableInfo]);
    };
    myConnector.getData = function (table, doneCallback) {
    $ .getJSON ("http://www.nyc.gov/html/tlc/downloads/csv/data_reports_mont hly_indicators_yellow.json", function (odp) {
    var feat = resp;
    tableData = [];
    // Iteruj po obiekcie JSON
    for (var i = 0, len = feat.length; i <len; i ++) {
    tableData.push ({
    "date": feat [i] ["Month"] ["Year"],
    "wycieczki": feat [i] ["Wycieczki dziennie"],
    "farebox": feat [i] ["Farebox dziennie"],
    "unikalne": feat [i] ["Unikalne medaliony"],
    "uniquedrivers": feat [i] ["Unique Drivers"],
    "medperday": feat [i] ["Medallions Per Day"],
    "avg1": feat [i] ["Średnie dni medalionów w drodze"],
    "avg2": feat [i] ["Średnia liczba godzin dziennie na medalion"],
    "avg3": feat [i] ["Śr. liczba dni kierowców na drodze"],
    "avg4": feat [i] ["Średnia liczba godzin dziennie na kierowcę"],
    "avg5": feat [i] ["Śr. minuty na podróż"],
    "cc": feat [i] ["Procent podróży opłaconych kartą kredytową"]
    });
    }
    table.appendRows (tableData);
    doneCallback ();
    });
    };
    tableau.registerConnector (myConnector);
    $ (document) .ready (function () {
    $ ("# submitButton"). click (function () {
    tableau.connectionName = "taxi";
    tableau.submit ();
    });
    });}) ();