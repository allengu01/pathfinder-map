const grid_templates = document.querySelector("#grid-templates");
const standard_node_temp = document.querySelector("#grid-templates .standard-node");
$(grid_templates).show();
const node_rect = standard_node_temp.getBoundingClientRect();
const node_height = node_rect.height-1; // -1 counts for negative margins to avoid double borders
const node_width = node_rect.width-1;
$(grid_templates).hide();

var map_grid, grid_height, grid_width;
var notification_number = 0, notification_ids = [];

function startup() {
    var grid_div = document.querySelector("#main-grid");
    var grid_rect = grid_div.getBoundingClientRect();
    grid_height = grid_rect.height;
    grid_width = grid_rect.width;
    map_grid = new Grid(grid_width, grid_height, node_width, node_height);
    map_grid.makeGrid();
    map_grid.addEventListeners();
}

function addNotification(type, text) {
    var notification_container = document.querySelector(".notification-container");
    var notification = document.createElement("div");
    notification.classList.add("notification", `notification-${type}`);
    notification.id = "notification-" + notification_number;
    notification.innerHTML =    `<div>${text}</div>
                                <button class="notification-button">OK</button>`
    notification_container.appendChild(notification);
    $("#notification-" + notification_number).click(function (event) {
        event.preventDefault();
        $(this).remove();
    });
    notification_ids.push(notification_number);
    notification_number++;

    return notification;
}

function clearNotifications() {
    for (let id of notification_ids) {
        $("#notification-" + id).remove();
    }
    notification_ids = [];
}

window.addEventListener('DOMContentLoaded', (event) => {
    startup();
});

window.addEventListener('resize', (event) => {
    startup();
});

document.getElementById("start").addEventListener("click", (event) => {
    runBFS(map_grid, map_grid.getStartNode());
});

document.getElementById("reset").addEventListener("click", (event) => {
    map_grid.resetVisited();
    clearNotifications();
});

document.getElementById("clear").addEventListener("click", (event) => {
    map_grid.clear();
    clearNotifications();
});

