chrome.storage.sync.get('apiAddress', function(data) {
    $("#apiAddress")[0].value = data.apiAddress;
});

$("#save").click(function() {
    let ip = $("#apiAddress")[0].value;

    chrome.storage.sync.set({apiAddress: ip}, function() {
        console.log(`saved server ip address to ${ip}`);
    });
});