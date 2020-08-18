class Node {
    constructor(node_row, node_col, node_type) {
        this.row = node_row;
        this.col = node_col;
        this.type = node_type;
        this.visited = 0;
    }

    changeType(new_type) {
        this.type = new_type;
        this.visited = 0;
        if (new_type === "standard") document.getElementById(`${this.row}-${this.col}`).className = new_type + "-node";
        else document.getElementById(`${this.row}-${this.col}`).className = "unvisited " + new_type + "-node";
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
        document.getElementById(`${this.row}-${this.col}`).className = "visited " + this.type+"-node";
    }

    setUnvisited() {
        this.visited = 0;
        document.getElementById(`${this.row}-${this.col}`).className = "unvisited " + this.type+"-node";

    }

    isVisited() {
        return this.visited;
    }
}