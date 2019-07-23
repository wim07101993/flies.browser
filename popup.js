let increaseScore = document.getElementById('increaseScore');
let apiAddress = "http://localhost:5000"

chrome.storage.sync.get('apiAddress', function(data) {
    console.log(data.apiAddress);
    apiAddress = data.apiAddress;
});

increaseScore.onclick = function(element) {
    console.log("Squashed a fly");
    let player = $("#player")[0].value;
    let url = `${apiAddress}/api/participants/${player}/increaseScore?amount=1`;
    console.log(url);
    $.ajax({
        type: 'PUT',
        dataType: 'json',
        url: url,
        headers: {"X-HTTP-Method-Override": "PUT"},
        data: ''
    });
};