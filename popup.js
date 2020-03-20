// ---------------- VARIABLES ----------------

let _apiAddress = "http://localhost:5000";
let _participants = [];
let _participantId = null;

// ---------------- STORAGE SYNC ----------------

chrome.storage.sync.get("apiAddress", function(data) {
  console.log(data.apiAddress);
  _apiAddress = data.apiAddress;
});
chrome.storage.sync.get("webAppAddress", function(data) {
  console.log(data.webAppAddress);
  $("#webAppLink").attr("href", data.webAppAddress);
});
chrome.storage.sync.get("participant", function(data) {
  console.log(data.participant);
  setParticipantId(data.participant);
});

// ---------------- DOM EVENTS ----------------

$("#increaseScore").click(increaseScore);

$("#player").change(() => setParticipantId($("#player option:selected").val()));

$(document).ready(updateParticipants);

// ---------------- FUNCTIONS ----------------

function updateScore() {
  let participant = getParticipant();
  if (participant == null) return;

  $("#score").text(participant.score);
}

function updateParticipants() {
  console.log("fetch participants");
  $.get(`${_apiAddress}/api/participants/${new Date().getFullYear()}`, data => {
    setParticipants(data);
    $("#player")
      .val(getParticipantId())
      .change();
  });
}

function saveParticipant(participantId) {
  chrome.storage.sync.set({ participant: participantId }, function() {});
}

function increaseScore() {
  console.log("Squashed a fly");
  let player = $("#player option:selected").val();
  let url = `${_apiAddress}/api/participants/${new Date().getFullYear()}/${player}/increaseScore?amount=1`;
  console.log(`PUT: ${url}`);
  $.ajax({
    type: "PUT",
    dataType: "json",
    url: url,
    headers: { "X-HTTP-Method-Override": "PUT" },
    data: ""
  }).done(() => updateParticipants());
}

// ---------------- GETTERS/SETTERS ----------------

function getParticipants() {
  return _participants;
}

function setParticipants(participants) {
  _participants = participants;
  $("#player").empty();
  _participants.forEach(participant => {
    $("#player").append(new Option(participant.name, participant.id));
  });
  updateScore();
}

function getApiAddress() {
  return _apiAddress;
}

function getParticipant() {
  let participantId = getParticipantId();
  return getParticipants().filter(x => x.id == participantId)[0];
}

function getParticipantId() {
  return _participantId;
}

function setParticipantId(id) {
  _participantId = id;
  updateScore();
  saveParticipant(_participantId);
}
