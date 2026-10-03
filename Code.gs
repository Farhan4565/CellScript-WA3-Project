function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var action = e.parameter.action;

  if (action === "get_next_row") {
    var nextRow = sheet.getLastRow() + 1;
    return ContentService.createTextOutput(nextRow.toString());
  }
  
  if (action === "read") {
    var coord = e.parameter.coord;
    var value = sheet.getRange(coord).getValue();
    return ContentService.createTextOutput(value);
  }
  
  if (action === "read_column") {
    var col = e.parameter.col;
    var lastRow = sheet.getLastRow();
    if (lastRow === 0) return ContentService.createTextOutput(JSON.stringify([]));
    var values = sheet.getRange(col + "1:" + col + lastRow).getValues();
    // Convert all column entries to strings to preserve numeric usernames
    var flatValues = values.map(function(row) { return String(row[0]); });
    return ContentService.createTextOutput(JSON.stringify(flatValues));
  }
}

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  // Single cell write
  if (data.action === "write") {
    sheet.getRange(data.coord).setValue(data.value);
    return ContentService.createTextOutput("Success");
  }

  // Save/Update user profile
  if (data.action === "save_user") {
    var lastRow = Math.max(sheet.getLastRow(), 1);
    // Convert existing sheet usernames to strings
    var usernames = sheet.getRange("A1:A" + lastRow).getValues().flat().map(String);
    // Convert incoming username to string
    var rowIndex = usernames.indexOf(String(data.username)) + 1;

    if (rowIndex > 0) {
      // User exists -> update their row
      sheet.getRange(rowIndex, 1, 1, data.values.length).setValues([data.values]);
    } else {
      // New user -> append a new row at the bottom
      sheet.appendRow(data.values);
    }
    return ContentService.createTextOutput("Success");
  }

  // Sync / Login authentication
  if (data.action === "sync_user") {
    var lastRow = Math.max(sheet.getLastRow(), 1);
    // Convert existing sheet usernames to strings
    var usernames = sheet.getRange("A1:A" + lastRow).getValues().flat().map(String);
    // Convert incoming username to string
    var rowIndex = usernames.indexOf(String(data.username)) + 1;

    if (rowIndex === 0) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: "User does not exist"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var rowValues = sheet.getRange(rowIndex, 1, 1, 19).getValues()[0];
    var storedPassword = rowValues[1];

    // Explicitly compare both password values as strings
    if (String(storedPassword) !== String(data.password)) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: "Incorrect password"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var lvlCmp = rowValues.slice(2, 18).map(function(val) { return Boolean(val); });
    var endingCutscene = Boolean(rowValues[18]);

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      lvl_cmp: lvlCmp,
      ending_cutscene: endingCutscene
    })).setMimeType(ContentService.MimeType.JSON);
  }
}