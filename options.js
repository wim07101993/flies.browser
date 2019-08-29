chrome.storage.sync.get('apiAddress', function(data) {
    $("#apiAddress")[0].value = data.apiAddress;
});
chrome.storage.sync.get('webAppAddress', function(data) {
    $("#webAppAddress")[0].value = data.webAppAddress;
});

$("#save").click(function() {
    saveSettings();
});

$('#settingForm').keypress(function (e) {
    if (e.which == 13) {
        e.preventDefault();
        saveSettings();
        return false;
    }
});

function saveSettings() {
    let settings = {
        apiAddress: $("#apiAddress")[0].value,
        webAppAddress: $("#webAppAddress")[0].value
    }
    
    chrome.storage.sync.set(settings, function() {
        console.log(`saved server api and web addresses`);
    });
}