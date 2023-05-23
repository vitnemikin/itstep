export class Data {
    head = [];
    data = [];
    view = null;
    #tbody = null;

    constructor () {
        let thead = document.createElement('thead');
        let tr = document.createElement('tr'); 

        let myOnHeadClick = this.onHeadClick.bind(this);
        tr.onclick = myOnHeadClick;

        tr.jsObject = this;
        thead.append(tr);

        this.view = document.createElement('table');
        this.view.classList.add('super-table');
        this.view.append(thead);

        for (let i in arguments) {
            this.head[i] = arguments[i];
            let th = document.createElement('th');
            th.textContent = String(this.head[i]);
            tr.append(th);
        }

        this.#tbody = document.createElement('tbody');
        this.view.append(this.#tbody);  
    }

    onHeadClick (ev) {
        let currentIndex = ev.target.cellIndex;
        this.sortBy(currentIndex);
    }

    addRow (list) {
        let newRow = [];
        let tr = document.createElement('tr');

        for (let i in this.head) {
            newRow.push(list[i]);
            let td = document.createElement('td');
            td.textContent = String(list[i]);
            tr.append(td);
        }
        
        this.data.push(newRow);
        this.#tbody.append(tr);

        return true;
    }

    sync () {
        // this.#tbody синхронизируем с this.data...

        let trows = this.#tbody.childNodes;

        for (let r in this.data) {
            let currentRow = trows[r];

            for (let c in this.data[r]) {
                currentRow.cells[c].textContent = String(this.data[r][c]);
            }
        }
    }

    sortBy (column) {
        this.data.sort ( (a, b) => {
            return a[column] > b[column] ? 1 : -1;
        });

        this.sync();
    }
} 