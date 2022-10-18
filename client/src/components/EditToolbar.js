import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    function handleAdd() {
        store.addSongTransaction();
    }

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        history.push("/");
        store.closeCurrentList();
        (store.getTPS()).clearAllTransactions();
    }

    let editModal = document.getElementById("edit-song-modal");
    let deleteModal = document.getElementById("delete-song-modal");
    let deleteListModal = document.getElementById("delete-list-modal");

    let canAddSong = store.currentList !== null 
    let canUndo = (store.getTPS()).hasTransactionToUndo() 
    let canRedo = (store.getTPS()).hasTransactionToRedo() 
    let canClose = store.currentList !== null
    let addSongClass = "playlister-button";
    let undoClass = "playlister-button";
    let redoClass = "playlister-button";
    let closeClass = "playlister-button";

    if ((editModal && editModal.classList.contains("is-visible")) || (deleteModal && deleteModal.classList.contains("is-visible")) || 
         (deleteListModal && deleteListModal.classList.contains("is-visible"))) { 
        canAddSong = false;
        canUndo = false;
        canRedo = false;
        canClose = false;
    }

    if (!canAddSong) addSongClass += " disabled";
    if (!canUndo) undoClass += " disabled";
    if (!canRedo) redoClass += " disabled";
    if (!canClose) closeClass += " disabled";

    return (
        <span id="edit-toolbar">
            <input
                type="button"
                id='add-song-button'
                disabled={!canAddSong}
                value="+"
                className={addSongClass}
                onClick={handleAdd}
            />
            <input
                type="button"
                id='undo-button'
                disabled={!canUndo}
                value="⟲"
                className={undoClass}
                onClick={handleUndo}
            />
            <input
                type="button"
                id='redo-button'
                disabled={!canRedo}
                value="⟳"
                className={redoClass}
                onClick={handleRedo}
            />
            <input
                type="button"
                id='close-button'
                disabled={!canClose}
                value="&#x2715;"
                className={closeClass}
                onClick={handleClose}
            />
        </span>);
}

export default EditToolbar;