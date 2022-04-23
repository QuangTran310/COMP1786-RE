let alertError = "Any data invalid. Please re-try!";
let alertSuccess = "All data valid. Save success!";
let activityNameKey = "input[name=add_activity_name]"
let locationKey = "input[name=add_location]";
let heldDateKey = "input[name=add_held_date]";
let attendingTimeKey = "input[name=add_attending_time]";
let reporterNameKey = "input[name=add_reporter_name]";

let updateActivityNameKey = "input[name=update_activity_name]";
let updateLocationKey = "input[name=update_location]";
let updateHeldDateKey = "input[name=update_held_date]";
let updateAttendingTimeKey = "input[name=update_attending_time]";
let updateReporterNameKey = "input[name=update_reporter_name]";
let updateIdKey = "input[name=update_id]";

let modalMessage = document.getElementById("modal_message");
let reportTimeKeyKey = "#reporter_error";

function setModalMessage(text) {
    modalMessage.innerText = text;
}

function getModalMessage() {
    return $(modalMessage).val();
}

function getActivityName() {
    return $(activityNameKey).val();
}

function getLocation() {
    return $(locationKey).val();
}

function getHeldDate() {
    return $(heldDateKey).val();
}

function getAttendingTime() {
    return $(attendingTimeKey).val();
}

function getReporterName() {
    return $(reporterNameKey).val();
}

function getUpdateActivityName() {
    return $(updateActivityNameKey).val();
}

function getUpdateLocation() {
    return $(updateLocationKey).val();
}

function getUpdateHeldDate() {
    return $(updateHeldDateKey).val();
}

function getUpdateAttendingTime() {
    return $(updateAttendingTimeKey).val();
}

function getUpdateReporterName() {
    return $(updateReporterNameKey).val();
}

function getUpdateId() {
    return $(updateIdKey).val();
}