class Queue {
    constructor() {
        this.vals = [];
    }
    enqueue(e) {
        this.vals.push(e);
    }
    dequeue() {
        return this.vals.shift();
    }
    isEmpty() {
        return this.vals.length == 0;
    }
    front() {
        if (isEmpty()) return undefined;
        else return this.vals[0];
    }
    length() {
        return this.vals.length;
    }
    show() {
        return this.vals;
    }
}
fps = 30;
function bfs(nodes, grid) {
    var grid_nodes = grid.getNodes();
    var [rows, cols] = grid.getDimensions();
    var next_nodes = new Queue();
    var found = false;

    setTimeout(function() {
        for (let node of nodes.show()) {
            node.setVisited();
        }
        while (!nodes.isEmpty()) {
            let cur = nodes.dequeue();
            if (cur.getType() == "destination") {
                found = true;
            }
            let r = cur.getRow();
            let c = cur.getCol();
            if (r > 0) {
                next = grid_nodes[r-1][c];
                if (!next.isVisited() && next.getType() !== "standard") {
                    next_nodes.enqueue(next);
                }
            }
            if (r < rows-1) {
                next = grid_nodes[r+1][c];
                if (!next.isVisited() && next.getType() !== "standard") {
                    next_nodes.enqueue(next);
                }
            }
            if (c > 0) {
                next = grid_nodes[r][c-1];
                if (!next.isVisited() && next.getType() !== "standard") {
                    next_nodes.enqueue(next);
                }        
            }
            if (c < cols-1) {
                next = grid_nodes[r][c+1];
                if (!next.isVisited() && next.getType() !== "standard") {
                    next_nodes.enqueue(next);
                }       
             }
        }
        if (!found && !next_nodes.isEmpty()) {
            return bfs(next_nodes, grid);
        }
        else if (!found && next_nodes.isEmpty()) {
            addNotification("no-path", "No Path Found");
            return -1
        }
        else {
            return 1;
        }
    }, 1000/fps);
}


function runBFS(grid, start_node) {
    var current_nodes = new Queue();
    current_nodes.enqueue(start_node);

    return bfs(current_nodes, grid);
}

