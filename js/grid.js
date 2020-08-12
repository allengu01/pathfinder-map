class Grid {
    constructor(initial_width, initial_height, node_width, node_height) {
        this.width = initial_width;
        this.height = initial_height;
        this.node_width = node_width;
        this.node_height = node_height;
        this.list_of_nodes = [];
    }
    makeGrid() {
        var gridHTML = "";

        for (let r = 0; r < Math.floor(this.height/this.node_height); r++) {
            var rowHTML = `<div class="grid-row">` + "\n";
            for (let c = 0; c < Math.floor(this.width/this.node_width); c++) {
                rowHTML += `<div class="standard-node" id="${r}-${c}"></div>` + "\n";
            }
            rowHTML+="</div>";
            gridHTML+=rowHTML;
        }
        //console.log(gridHTML);
        document.getElementById("main-grid").innerHTML = gridHTML;
    }
}


