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
        html += '<div class="row border border-dark list-item">';
        html += '<div class="col-lg-12 col-md-12 col-sm-12 title">';
        html += '<h4><strong>Event</strong></h4>';
        html += '</div>';
        html += '<div class="col-lg-3 col-md-3 col-sm-3 title"><strong>Activity name</strong></div>';
        html += '<div class="col-lg-9 col-md-9 col-sm-9 content">' + row['activity_name'] + '</div>';
        html += '<div class="col-lg-3 col-md-3 col-sm-3 title"><strong>Location</strong></div>';
        html += '<div class="col-lg-9 col-md-9 col-sm-9 content">' + row['location'] + '</div>';
        html += '<div class="col-lg-3 col-md-3 col-sm-3 title"><strong>Held date</strong></div>';
        html += '<div class="col-lg-9 col-md-9 col-sm-9 content">' + row['held_date'] + '</div>';
        html += '<div class="col-lg-3 col-md-3 col-sm-3 title"><strong>Attending time</strong></div>';
        html += '<div class="col-lg-9 col-md-9 col-sm-9 content">' + row['attending_time'] + '</div>';
        html += '<div class="col-lg-3 col-md-3 col-sm-3 title"><strong>Reporter name</strong></div>';
        html += '<div class="col-lg-6 col-md-6 col-sm-6 content">' + row['reporter_name'] + '</div>';
        html += '<div class="col-lg-3 col-md-3 col-sm-3 title">';
        html += '<div class="btn-group btn-group-sm" role="group"><button class="updatebtn" onclick="getItemById(' + row['id'] + '); document.getElementById(\'id02\').style.display=\'block\'"> Update</button> <button class="deletebtn" onclick="deleteItem(' + row['id'] + ')">Delete</button>';
        html += '</div >';
        html += '</div >';
        html += '</div >';
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