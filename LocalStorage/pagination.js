let link_recorded_times = document.getElementById("link_recorded_times");
let link_new_time = document.getElementById("link_new_time");
let btn_add_new_time = document.getElementById("btn_add_new_time");

link_recorded_times.onclick = function() { show_recorded_times_panel() }
link_new_time.onclick = function() { show_new_time_panel() }
btn_add_new_time.onclick = function() { add_new_time() }

let name_os = "recorded_times_os";
let number_pagination = 10;
let db;

let request = window.indexedDB.open('time_db', 1);
request.onerror = function() {
    console.log('Database failed to open');
};
request.onsuccess = function() {
    console.log('Database opened succesfully');
    db = request.result;
};
request.onupgradeneeded = function(e) {

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


function add_new_time() {

    let new_date = document.getElementById("txt_date");
    let new_entering = document.getElementById("txt_entering");
    let new_exit = document.getElementById("txt_exit");
    let new_time = { date: new_date.value, enter_time: new_entering.value, exit_time: new_exit.value };


    if (new_date.value && new_entering.value && new_exit.value) {
        let request = db.transaction([name_os], 'readwrite').objectStore(name_os).add(new_time);
        request.onsuccess = function() {
            new_date.value = '';
            new_entering.value = '';
            new_exit.value = '';
        };
    }


}

function show_recorded_times() {

    let table, thead, tbody, tr, th, td;
    let column_name = ['Date', 'Entering Time', 'Exit Time', 'Delete'];
    let num_records = 1;
    let num_table = 0;
    let recorded_times_list_panel = document.getElementsByClassName('recorded_times_list_panel')[0];
    let pagination_numbers = document.getElementsByClassName('pagination_numbers')[0];


    let objectStore = db.transaction(name_os).objectStore(name_os);

    objectStore.openCursor().onsuccess = function(e) {
        let cursor = e.target.result;
        if (cursor) {
            if (num_records > (num_table) * number_pagination) {
                table = document.createElement('table');
                table.setAttribute('class', 'table_recorded_times');
                table.setAttribute('id', 'table' + String(num_table + 1));

                thead = document.createElement('thead');
                tr = document.createElement("tr")

                for (let i = 0; i < column_name.length; i++) {
                    th = document.createElement("th");
                    th.innerText = column_name[i];
                    tr.appendChild(th);
                }
                thead.appendChild(tr);
                table.appendChild(thead);

                tbody = document.createElement('tbody');
                tbody.setAttribute('class', 'body_table_recorded_times');
                num_table++;
            }
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
            if (num_records == (num_table) * number_pagination) {
                table.appendChild(tbody);
                recorded_times_list_panel.appendChild(table);

                let link = document.createElement('a');
                link.innerText = String(num_table);
                link.onclick = change_page;
                link.setAttribute('id', 'page' + String(num_table));
                pagination_numbers.appendChild(link);
            }
            num_records++;
            cursor.continue();
        } else {
            if (num_records - 1 < number_pagination) {
                table.appendChild(tbody);
                recorded_times_list_panel.appendChild(table);

            } else {
                for (let i = 0; i < count_pages; i++) {
                    document.getElementById("table" + String(i)).style.display = 'none';
                }
                document.getElementById("table" + String(i)).style.display = flex;
            }
        }

    };

}

function change_page() {
    let page_number = Number(e.target.getAttribute('id'));
    let count_pages = e.target.parentNode.children.length;
    for (let i = 0; i < count_pages; i++) {
        document.getElementById("table" + String(i)).style.display = 'none';
    }
    document.getElementById("table" + String(i)).style.display = flex;
}

function deleteItem(e) {
    let time_id = Number(e.target.parentNode.parentNode.getAttribute('id'));

    let transaction = db.transaction([name_os], 'readwrite');
    let objectStore = transaction.objectStore(name_os);
    let request = objectStore.delete(time_id);

    transaction.oncomplete = function() {
        e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
        console.log('Time ' + time_id + ' deleted.');
    };
}






function data_1000() {
    let new_date = '';
    let new_entering = '';
    let new_exit = '';

    let str_date = '2022-08-';
    let str_time = '00:';
    for (let j = 10; j < 20; j++) {
        new_date = str_date + String(j);
        for (let i = 10; i < 59; i++) {
            new_entering = str_time + String(i);
            new_exit = str_time + String(i + 1);
            let new_time = { date: new_date, enter_time: new_entering, exit_time: new_exit };
            let request = db.transaction([name_os], 'readwrite').objectStore(name_os).add(new_time);
        }
        str_time = '01:';
        for (let i = 10; i < 59; i++) {
            new_entering = str_time + String(i);
            new_exit = str_time + String(i + 1);
            let new_time = { date: new_date, enter_time: new_entering, exit_time: new_exit };
            let request = db.transaction([name_os], 'readwrite').objectStore(name_os).add(new_time);
        }
    }
}