class Node {
    constructor(node_row, node_col, node_type) {
        this.row = node_row;
        this.col = node_col;
        this.type = node_type;
        this.visited = 0;
        this.element;
    }

    changeType(new_type) {
        this.visited = 0;
        if (new_type === "standard" && this.visited == 1) {
            this.element.className = "visited-to-standard " + new_type + "-node";
            this.visited = 0;
        }
        else if (new_type === "standard" && this.visited == 0) {
            this.element.className = "unvisited-to-standard " + new_type + "-node";
            this.visited = 0;
        }
        else if (new_type === "road") {
            this.element.className = "to-road unvisited " + new_type + "-node";
            this.visited = 0;
        }
        else {
            this.element.className = "unvisited " + new_type + "-node";
            this.visited = 0;
        }
        this.type = new_type;
    }

    getType() {
        return this.type;
    }

    getRow() {
        return this.row;
    }

    getCol() {
        return this.col;
    }

    setElement() {
        this.element = document.getElementById(`${this.row}-${this.col}`);
        return this.element;
    }

    getHTML() {
        return `<div class="${this.visited == 0 ? "unvisited" : "visited"} ${this.type}-node" id="${this.row}-${this.col}"></div>` + "\n";
    }

    setVisited() {
        this.visited = 1;
        this.element.className = "to-visited visited " + this.type+"-node";
    }

    setUnvisited() {
        if (this.visited == 1) this.element.className = "to-unvisited unvisited " + this.type+"-node";
        this.visited = 0;
    }

    isVisited() {
        return this.visited;
    }
}