let link_recorded_times = document.getElementById("link_recorded_times");
let link_new_time = document.getElementById("link_new_time");
let btn_add_new_time = document.getElementById("btn_add_new_time");

link_recorded_times.onclick = function () { show_recorded_times_panel() }
link_new_time.onclick = function () { show_new_time_panel() }
btn_add_new_time.onclick = function () { add_new_time() }

let name_os = "recorded_times_os";
let db;

let request = window.indexedDB.open('time_db', 1);
request.onerror = function () {
    console.log('Database failed to open');
};
request.onsuccess = function () {
    console.log('Database opened succesfully');
    db = request.result;
};
request.onupgradeneeded = function (e) {

    let db = e.target.result;
    let objectStore = db.createObjectStore(name_os, { keyPath: 'id', autoIncrement: true });

    objectStore.createIndex('date', 'date', { unique: false });
    objectStore.createIndex('entering_time', 'entering_time', { unique: false });
    objectStore.createIndex('exit_time', 'exit_time', { unique: false });

    console.log('Database setup complete');
};


function show_recorded_times_panel() {
    let content_detail = document.getElementsByClassName("content_detail");
    content_detail[0].style.display = "flex";
    content_detail[1].style.display = "none";
    show_recorded_times();
}

function show_new_time_panel() {
    let content_detail = document.getElementsByClassName("content_detail");
    content_detail[0].style.display = "none";
    content_detail[1].style.display = "flex";
}

function validate(new_date, new_entering, new_exit) {
    let validat_result = true;
    if (!new_date.value || !new_entering.value || !new_exit.value) {
        validat_result = false;
    }
    if (new_entering.value > new_exit.value) {
        validat_result = false;
    }
    return validat_result
}

function add_new_time() {
    // data_1000();

    let new_date = document.getElementById("txt_date");
    let new_entering = document.getElementById("txt_entering");
    let new_exit = document.getElementById("txt_exit");
    let new_time = { date: new_date.value, enter_time: new_entering.value, exit_time: new_exit.value };


    if (validate(new_date, new_entering, new_exit)) {
        let request = db.transaction([name_os], 'readwrite').objectStore(name_os).add(new_time);
        request.onsuccess = function () {
            new_date.value = '';
            new_entering.value = '';
            new_exit.value = '';
        };
    }
}

function show_recorded_times() {

    let tbody = document.getElementsByClassName("body_table_recorded_times")[0];
    let tr, td;

    tbody.innerHTML = ""

    let objectStore = db.transaction(name_os).objectStore(name_os);

    objectStore.openCursor().onsuccess = function (e) {
        let cursor = e.target.result;
        if (cursor) {
            tr = document.createElement("tr")

            td = document.createElement("td");
            td.innerText = cursor.value.date;
            tr.appendChild(td);

            td = document.createElement("td");
            td.innerText = cursor.value.enter_time;
            tr.appendChild(td);

            td = document.createElement("td");
            td.innerText = cursor.value.exit_time;
            tr.appendChild(td);

            td = document.createElement("td");
            td.innerHTML = "";
            let deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = deleteItem;
            deleteBtn.setAttribute('class', 'btn_delete');
            td.appendChild(deleteBtn);
            tr.appendChild(td);

            tr.setAttribute('id', cursor.value.id);
            tbody.appendChild(tr)

            cursor.continue();
        }
    };

}

function deleteItem(e) {
    let time_id = Number(e.target.parentNode.parentNode.getAttribute('id'));

    let transaction = db.transaction([name_os], 'readwrite');
    let objectStore = transaction.objectStore(name_os);
    let request = objectStore.delete(time_id);

    transaction.oncomplete = function () {
        e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
        console.log('Time ' + time_id + ' deleted.');
    };
}