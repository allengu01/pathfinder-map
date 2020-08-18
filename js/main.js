const grid_templates = document.querySelector("#grid-templates");
const standard_node_temp = document.querySelector("#grid-templates .standard-node");
$(grid_templates).show();
const node_rect = standard_node_temp.getBoundingClientRect();
const node_height = node_rect.height-1; // -1 counts for negative margins to avoid double borders
const node_width = node_rect.width-1;
$(grid_templates).hide();

var map_grid, grid_height, grid_width;

function startup() {
    var grid_div = document.querySelector("#main-grid");
    var grid_rect = grid_div.getBoundingClientRect();
    grid_height = grid_rect.height;
    grid_width = grid_rect.width;
    map_grid = new Grid(grid_width, grid_height, node_width, node_height);
    map_grid.makeGrid();
    map_grid.addEventListeners();
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
});

document.getElementById("clear").addEventListener("click", (event) => {
    map_grid.clear();
});

