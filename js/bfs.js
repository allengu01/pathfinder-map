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
fps = 20;
var bfs_animation;

function bfs(current_nodes, grid, callback) {
    var bfsStart = window.performance.now();
    var grid_nodes = grid.getNodes();
    var[rows, cols] = grid.getDimensions();
    var current_nodes = new Queue();
    
    current_nodes.enqueue(grid.getStartNode());

    function step() {
        //var stepStart = window.performance.now();
        var next_nodes = new Queue();
        var found = false;
        //console.log(current_nodes.length());

        while (!current_nodes.isEmpty()) {
            let cur = current_nodes.dequeue();
            let r = cur.getRow();
            let c = cur.getCol();
            if (r > 0) {
                next = grid_nodes[r-1][c];
                if (next.getType() === "destination") found = true;
                if (!next.isVisited() && next.getType() !== "standard") {
                    next_nodes.enqueue(next);
                    next.setVisited();
                }
            }
            if (r < rows-1) {
                next = grid_nodes[r+1][c];
                if (next.getType() === "destination") found = true;
                if (!next.isVisited() && next.getType() !== "standard") {
                    next_nodes.enqueue(next);
                    next.setVisited();
                }
            }
            if (c > 0) {
                next = grid_nodes[r][c-1];
                if (next.getType() === "destination") found = true;
                if (!next.isVisited() && next.getType() !== "standard") {
                    next_nodes.enqueue(next);
                    next.setVisited();
                }        
            }
            if (c < cols-1) {
                next = grid_nodes[r][c+1];
                if (next.getType() === "destination") found = true;
                if (!next.isVisited() && next.getType() !== "standard") {
                    next_nodes.enqueue(next);
                    next.setVisited();
                }       
            }
        }

        //stepEnd = window.performance.now();
        //console.log(stepEnd - stepStart);
        if (!found && !next_nodes.isEmpty()) {
            current_nodes = next_nodes;
            setTimeout(function() {
                bfs_animation = requestAnimationFrame(step);
            }, 1000/fps);
        }
        else if (!found && next_nodes.isEmpty()) {
            cancelAnimationFrame(bfs_animation);
            callback();
        }
        else {
            cancelAnimationFrame(bfs_animation);
        }
    }

    bfs_animation = requestAnimationFrame(step);
    var bfsEnd = window.performance.now();
    console.log("bfs time: " + `${bfsEnd-bfsStart}`);

}

/**
function bfs(nodes, grid) {
    var grid_nodes = grid.getNodes();
    var [rows, cols] = grid.getDimensions();
    var next_nodes = new Queue();
    var found = false;
    setTimeout(function() {
        console.log(nodes);

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
**/
