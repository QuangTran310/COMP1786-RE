let search = document.getElementById('search');

let onSearch = function (event) {
    keyword = search.value.toLowerCase();
    searchData(keyword);
}

search.addEventListener('keyup', onSearch);
$(document).ready(() => {
    initDatabase();
    getAllData();
    $("#addform").submit(function (e) {
        e.preventDefault();
        saveData();
        getAllData();
        return false;
    });
})

let db;
let database = {
    name: "Event",
    version: "1.0",
    description: "Create an SQLite database to store the event details entered into the i-Explore App",
    space: 5 * 1024 * 1024,
    create: "CREATE TABLE IF NOT EXISTS event(id INTEGER PRIMARY KEY AUTOINCREMENT, activity_name character(255), location character(255), held_date character(30), attending_time character(30), reporter_name character(255))",
    select: "SELECT * FROM event",
    selectById: "SELECT * FROM event where id = ?",
    search: "SELECT * FROM event where activity_name like ?",
    delete: "DELETE FROM event where id = ?",
    add: "INSERT INTO event (activity_name, location, held_date, attending_time, reporter_name) VALUES (?,?,?,?,?)",
    update: "UPDATE event SET activity_name = ?, location = ?, held_date = ?, attending_time = ?, reporter_name = ? WHERE id = ?",
    count: "SELECT COUNT(*) from event"
}
let deleteSuccess = "Delete event successfully!";
let serverError = "Server error, please re-try!";
let addSuccess = "Add event successfully!";
function initDatabase() {
    db = openDatabase(
        database.name,
        database.version,
        database.description,
        database.space
    );
    db.transaction(function (tx) {
        tx.executeSql(database.create);
    })
}

function saveData() {
    let activityName = getActivityName();
    let location = getLocation();
    let heldDate = getHeldDate();
    let attendingTime = getAttendingTime();
    let reporterName = getReporterName();
    setModalMessage("Add event successfully!");
    db.transaction(function (tx) {
        tx.executeSql(database.add, [activityName, location, heldDate, attendingTime, reporterName], (transaction, result) => {
            showModal();
        }, (transaction, err) => {
            errorServer();
            console.log(err);
        });
    })
}

function getAllData() {
    db.transaction((tx) => {
        tx.executeSql(database.select, [], (transaction, result) => {
            displayData(result);
        })
    })
}

function searchData(text) {
    db.transaction((tx) => {
        tx.executeSql(database.search, ["%" + text + "%"], (transaction, result) => {
            displayData(result);
        }, (transaction, error) => {
            console.log(error);
        })
    })
}

function displayData(result) {
    let html = "";
    let rows = result.rows;
    for (var i = 0; i < rows.length; i++) {
        var row = rows.item(i)
        html += '<div class="border data">'
        html += '<h4><strong>Event</strong></h4>';
        html += '<div>';
        html += '<label class="data-label"><span class="data-header">Activity name</span><span class="data-content">' + row['activity_name'] + '</span></label>';
        html += '<label class="data-label"><span class="data-header">Location</span><span class="data-content">' + row['location'] + '</span></label>';
        html += '<label class="data-label"><span class="data-header">Held date</span><span class="data-content">' + row['held_date'] + '</span></label>';
        html += '<label class="data-label"><span class="data-header">Attending time</span><span class="data-content">' + row['attending_time'] + '</span></label>';
        html += '<label class="data-label"><span class="data-header">Reporter name</span><span class="data-content">' + row['reporter_name'] + '</span></label>';
        html += '<div class="btn-group" role="group"><button class="updatebtn" onclick="getItemById(' + row['id'] + '); document.getElementById(\'id02\').style.display=\'block\'"> Update</button> <button class="deletebtn" onclick="deleteItem(' + row['id'] + ')">Delete</button></div>';
        html += '</div>';
        html += '</div>';
    }
    $("#content").html(html);
}

function deleteItem(id) {
    setModalMessage("Delete event successfully!");
    db.transaction((tx) => {
        tx.executeSql(database.delete, [id], (transaction, result) => {
            showModal();
            displayData(result);
            getAllData();
        }, (transaction, error) => {
            console.log(error);
        })
    })
}

function getItemById(id) {
    db.transaction((tx) => {
        tx.executeSql(database.selectById, [id], (transaction, result) => {
            convertToInputTextsValue(result);
        }, (transaction, error) => {
            console.log(error);
        })
    })
}

function convertToInputTextsValue(result) {
    let updateId = document.getElementById("update_id");
    let updateActivityName = document.getElementById("update_activity_name");
    let updateLocation = document.getElementById("update_location");
    let updateHeldDate = document.getElementById("update_held_date");
    let updateAttendingTime = document.getElementById("update_attending_time");
    let updateReporterName = document.getElementById("update_reporter_name");
    let rows = result.rows;
    for (var i = 0; i < rows.length; i++) {
        var sqlId = rows.item(i)['id'];
        var sqlActivityName = rows.item(i)['activity_name'];
        var sqlLocation = rows.item(i)['location'];
        var sqlHeldDate = rows.item(i)['held_date'];
        var sqlAttendingTime = rows.item(i)['attending_time'];
        var sqlReporterName = rows.item(i)['reporter_name'];
    }
    updateId.value = sqlId;
    updateActivityName.value = sqlActivityName;
    updateLocation.value = sqlLocation;
    updateHeldDate.value = sqlHeldDate;
    updateAttendingTime.value = sqlAttendingTime;
    updateReporterName.value = sqlReporterName;

}

function updateItem() {
    let activityName = getUpdateActivityName();
    let location = getUpdateLocation();
    let heldDate = getUpdateHeldDate();
    let attendingTime = getUpdateAttendingTime();
    let reporterName = getUpdateReporterName();
    let id = getUpdateId();
    setModalMessage("Update event successfully!");
    // alert("id: " + id + ", activity: " + activityName + ", location: " + location + ", held date: " + heldDate + ", attending time: " + attendingTime + ", reporter: " + reporterName);
    db.transaction((tx) => {
        tx.executeSql(database.update, [activityName, location, heldDate, attendingTime, reporterName, id], (transaction, result) => {
            showModal();
            getAllData();
        }, (transaction, error) => {
            console.log(error);
        })
    })
}

function showModal() {
    var modal = document.getElementById("id03");
    modal.style.display = "block";
}