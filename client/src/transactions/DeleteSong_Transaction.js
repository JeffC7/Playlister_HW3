import jsTPS_Transaction from "../common/jsTPS.js"

export default class DeleteSong_Transaction extends jsTPS_Transaction {
    constructor(store, song, index) {
        super();
        this.store = store;
        this.song = song;
        this.index = index;
    }

    doTransaction() {
        console.log("do" + this.index);
        this.store.deleteSong(this.index);
    }
    
    undoTransaction() {
        console.log("undo" + this.index);
        this.store.addDeleteSong(this.index, this.song);
    }
}