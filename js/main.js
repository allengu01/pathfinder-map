const grid_templates = document.querySelector("#grid-templates");
const standard_node = document.querySelector("#template-standard-node")
$(grid_templates).show();
const node_rect = standard_node.getBoundingClientRect();
console.log(node_rect);
const node_height = node_rect.height-1; // -1 counts for negative margins to avoid double borders
const node_width = node_rect.width-1;
$(grid_templates).hide();


function startup() {
    var grid_div = document.querySelector("#main-grid");
    var grid_rect = grid_div.getBoundingClientRect();
    var grid_height = grid_rect.height;
    var grid_width = grid_rect.width;
    var map_grid = new Grid(grid_width, grid_height, node_width, node_height);
    map_grid.makeGrid();
}

window.addEventListener('DOMContentLoaded', (event) => {
    startup();
});

window.addEventListener('resize', (event) => {
    startup();
});