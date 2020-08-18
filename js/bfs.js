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

function runBFS(grid, start_node) {
    var [rows, cols] = grid.getDimensions();
    var list_of_nodes = grid.getNodes();
    var current_nodes = new Queue();
    current_nodes.enqueue(start_node);
    var next_nodes;
    var bfs_animation;

    function bfs() {
        //console.log(current_nodes);
        next_nodes = new Queue();
        var found = false;
        while (!current_nodes.isEmpty()) {
            let cur = current_nodes.dequeue();
            if (cur.getType() == "destination") {
                found = true;
                break;
            }
            let r = cur.getRow();
            let c = cur.getCol();
            if (r > 0) {
                next = list_of_nodes[r-1][c];
                if (!next.isVisited() && next.getType() !== "standard") {
                    next.setVisited();
                    next_nodes.enqueue(next);
                }
            }
            if (r < rows-1) {
                next = list_of_nodes[r+1][c];
                if (!next.isVisited() && next.getType() !== "standard") {
                    next.setVisited();
                    next_nodes.enqueue(next);
                }
            }
            if (c > 0) {
                next = list_of_nodes[r][c-1];
                if (!next.isVisited() && next.getType() !== "standard") {
                    next.setVisited();
                    next_nodes.enqueue(next);
                }        
            }
            if (c < cols-1) {
                next = list_of_nodes[r][c+1];
                if (!next.isVisited() && next.getType() !== "standard") {
                    next.setVisited();
                    next_nodes.enqueue(next);
                }       
             }
        }
        if (!found) {
            setTimeout(function() {
                current_nodes = next_nodes;
                bfs_animation = requestAnimationFrame(bfs);
            }, 1000/fps);
        }
        else cancelAnimationFrame(bfs_animation);
    }

    bfs_animation = requestAnimationFrame(bfs);

}

