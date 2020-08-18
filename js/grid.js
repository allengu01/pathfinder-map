class Grid {
    constructor(initial_width, initial_height, node_width, node_height) {
        this.width = initial_width;
        this.height = initial_height;
        this.node_width = node_width;
        this.node_height = node_height;
        this.rows = Math.floor(this.height/this.node_height);
        this.cols = Math.floor(this.width/this.node_width);
        this.list_of_nodes = [];
        this.mouse_state = 0;
        this.fill_state = 0;
    }

    getStartNode() {
        return this.start_node;
    }

    getNodes() {
        return this.list_of_nodes;
    }

    getDimensions() {
        return [this.rows, this.cols];  
    }

    makeGrid() {
        var gridHTML = "";
        for (let r = 0; r < this.rows; r++) {
            var row_list = [];
            for (let c = 0; c < this.cols; c++) {
                var node = new Node(r, c, "standard");
                row_list.push(node);
            }
            this.list_of_nodes.push(row_list);
        }

        for (let r = 0; r < this.rows; r++) {
            var rowHTML = `<div class="grid-row">` + "\n";
            for (let c = 0; c < this.cols; c++) {
                rowHTML += this.list_of_nodes[r][c].getHTML();
            }
            rowHTML+="</div>";
            gridHTML+=rowHTML;
        }
        //console.log(gridHTML);
        document.querySelector("#main-grid").innerHTML = gridHTML;

        this.start_coord = [Math.floor((this.rows-1)/2), Math.floor(this.cols/6)];
        this.start_node = this.list_of_nodes[this.start_coord[0]][this.start_coord[1]];
        this.start_node.changeType("house");
        this.list_of_nodes[Math.floor((this.rows-1)/2)][Math.floor(this.cols*5/6)].changeType("destination");
    }

    addEventListeners() {
        let grid = this;
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                let current_node = this.list_of_nodes[r][c];
                let current_element = document.getElementById(`${r}-${c}`);
                current_element.addEventListener("mousedown", (event) => {
                    this.mouse_state++;
                    if (current_node.getType() === "standard") this.fill_state = 1;
                    else if (current_node.getType() === "road") this.fill_state = 0;
                    event.preventDefault();
                    grid.setRoads(current_node);
                });

                current_element.addEventListener("mouseover", (event) => {
                    event.preventDefault();
                    if (this.mouse_state == 1) grid.setRoads(current_node);
                });

                current_element.addEventListener("mouseup", (event) => {
                    this.mouse_state--;
                })
            }
        }
    }

    setRoads(node) {
        if (node.getType() === "standard" && this.fill_state == 1) {
            node.changeType("road");
        }
        else if (node.getType() === "road" && this.fill_state == 0) {
            node.changeType("standard");
        }
    }

    resetVisited() {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                this.list_of_nodes[r][c].setUnvisited();
            }
        }
    }

    clear() {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                let node = this.list_of_nodes[r][c];
                if (node.getType() == "road") {
                    node.setUnvisited();
                    node.changeType("standard");
                }
            }
        }    
    }
}


