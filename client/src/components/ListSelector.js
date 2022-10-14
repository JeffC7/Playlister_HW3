import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import ListCard from './ListCard.js'
import { GlobalStoreContext } from '../store'
import DeleteListModal from './DeleteListModal.js'

/*
    This React component lists all the playlists in the UI.
    
    @author McKilla Gorilla
*/
const ListSelector = () => {
    // this.state = {
    //     listKeyPairMarkedForDeletion : null,
    //     currentList : null,
    //     editIndex: null,
    //     deleteIndex: null,
    // }

    // function deleteMarkedList() {
    //     this.deleteList(this.state.listKeyPairMarkedForDeletion.key);
    //     this.hideDeleteListModal();
    // }
    
    // // THIS FUNCTION IS FOR HIDING THE MODAL
    // function hideDeleteListModal() {
    //     let modal = document.getElementById("delete-list-modal");
    //     modal.classList.remove("is-visible");
    // }

    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store) {
        listCard = store.idNamePairs.map((pair) => (
            // <>
            //     <DeleteListModal
            //         listKeyPair={this.state.listKeyPairMarkedForDeletion}
            //         hideDeleteListModalCallback={hideDeleteListModal}
            //         deleteListCallback={deleteMarkedList}
            //     />
                <ListCard
                    key={pair._id}
                    idNamePair={pair}
                    selected={false}
                />
            // </>
        ))
    }
    return (
        <div id="playlist-selector">
            <div id="list-selector-list">
            <div id="playlist-selector-heading">
                <input
                    type="button"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                    className="playlister-button"
                    value="+" />
                Your Lists
            </div>                {
                    listCard
                }
            </div>
        </div>)
}

export default ListSelector;