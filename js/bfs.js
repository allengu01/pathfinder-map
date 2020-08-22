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

function getPath(node, parent) {
    parent_node = parent[node.getRow()][node.getCol()];
    
    if (parent_node.getType() == "house") return new Array(parent_node, node);
    var new_path = getPath(parent_node, parent);
    new_path.push(node);

    return new_path;
}

function showPath(path) {
    let i = 0;
    console.log(path);
    function step() {
        path[i].setPath();
        if (i < path.length - 1) {
            i++;
            setTimeout(function() {
                bfs_animation = requestAnimationFrame(step);
            }, 1000/fps);
        }
        else {
            cancelAnimationFrame(bfs_animation);
        }
    }
    bfs_animation = requestAnimationFrame(step);
}

function bfs(current_nodes, grid, no_path) {
    var bfsStart = window.performance.now();
    var grid_nodes = grid.getNodes();
    var[rows, cols] = grid.getDimensions();
    var current_nodes = new Queue();
    
    var parent = new Array(rows).fill().map(x => new Array(cols).fill());
    var start_node = grid.getStartNode();
    start_node.setVisited();
    parent[start_node.getRow()][start_node.getCol()] = start_node;
    current_nodes.enqueue(start_node);

    var end_node;

    

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
                if (!next.isVisited()) {
                    if (next.getType() === "destination") {
                        parent[r-1][c] = cur;
                        found = true;
                        end_node = next;
                    }                    
                    if (next.getType() !== "standard") {
                        parent[r-1][c] = cur;
                        next_nodes.enqueue(next);
                        next.setVisited();
                    }
                }
            }
            if (r < rows-1) {
                next = grid_nodes[r+1][c];
                if (!next.isVisited()) {
                    if (next.getType() === "destination") {
                        parent[r+1][c] = cur;
                        found = true;
                        end_node = next;
                    }
                    if (next.getType() !== "standard") {
                        parent[r+1][c] = cur;
                        next_nodes.enqueue(next);
                        next.setVisited();
                    }
                }
            }
            if (c > 0) {
                next = grid_nodes[r][c-1];
                if (!next.isVisited()) {
                    if (next.getType() === "destination") {
                        parent[r][c-1] = cur;
                        found = true;
                        end_node = next;
                    }
                    if (next.getType() !== "standard") {
                        parent[r][c-1] = cur;
                        next_nodes.enqueue(next);
                        next.setVisited();
                    }
                }       
            }
            if (c < cols-1) {
                next = grid_nodes[r][c+1];
                if (!next.isVisited()) {
                    if (next.getType() === "destination") {
                        parent[r][c+1] = cur;
                        found = true;
                        end_node = next;
                    }                    
                    if (next.getType() !== "standard") {
                        parent[r][c+1] = cur;
                        next_nodes.enqueue(next);
                        next.setVisited();
                    }
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
            no_path();
        }
        else {
            cancelAnimationFrame(bfs_animation);
            path = getPath(end_node, parent);
            showPath(path);
        }
    }

    bfs_animation = requestAnimationFrame(step);
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
