class Node {
    constructor(node_row, node_col, node_type) {
        this.row = node_row;
        this.col = node_col;
        this.type = node_type;
        this.visited = 0;
    }

    changeType(new_type) {
        this.visited = 0;
        if (new_type === "standard" && this.visited == 1) {
            document.getElementById(`${this.row}-${this.col}`).className = "visited-to-standard " + new_type + "-node";
            this.visited = 0;
        }
        else if (new_type === "standard" && this.visited == 0) {
            document.getElementById(`${this.row}-${this.col}`).className = "unvisited-to-standard " + new_type + "-node";
            this.visited = 0;
        }
        else if (new_type === "road") {
            document.getElementById(`${this.row}-${this.col}`).className = "to-road unvisited " + new_type + "-node";
            this.visited = 0;
        }
        else {
            document.getElementById(`${this.row}-${this.col}`).className = "unvisited " + new_type + "-node";
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

    getHTML() {
        return `<div class="${this.visited == 0 ? "unvisited" : "visited"} ${this.type}-node" id="${this.row}-${this.col}"></div>` + "\n";
    }

    setVisited() {
        this.visited = 1;
        document.getElementById(`${this.row}-${this.col}`).className = "to-visited visited " + this.type+"-node";
    }

    setUnvisited() {
        if (this.visited == 1) document.getElementById(`${this.row}-${this.col}`).className = "to-unvisited unvisited " + this.type+"-node";
        this.visited = 0;
    }

    isVisited() {
        return this.visited;
    }
}