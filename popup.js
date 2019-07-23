let increaseScore = document.getElementById('increaseScore');
let apiAddress = "localhost:5000"

chrome.storage.sync.get('apiAddress', function(data) {
    apiAddress = data.apiAddress
});

increaseScore.onclick = function(element) {
    console.log("Squashed a fly");
};