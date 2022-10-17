import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import ListCard from './ListCard.js'
import { GlobalStoreContext } from '../store'
import DeleteListModal from './DeleteListModal.js'

/*
    This React component lists all the playlists in the UI.
    
    @author McKilla Gorilla
*/
const ListSelector = () => {
    
    const [name, setName] = useState("");
    const [id, setId] = useState("");

    // Function for showing the modal
    function showDeleteListModal (){
        let modal = document.getElementById("delete-list-modal");
        modal.classList.add("is-visible");
    }

    function deleteMarkedList() {
        store.deleteList(id);
        hideDeleteListModal();
    }
    
    // THIS FUNCTION IS FOR HIDING THE MODAL
    function hideDeleteListModal() {
        let modal = document.getElementById("delete-list-modal");
        modal.classList.remove("is-visible");
    }

    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }

    let canAddList = true;
    let canAddListClass = "playlister-button ";
    let deleteListModal = document.getElementById("delete-list-modal");
    if (deleteListModal && deleteListModal.classList.contains("is-visible")) {
        canAddList = false;
        canAddListClass += "disabled"
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
                    setName={setName}
                    setId={setId}
                    showDeleteListModal={showDeleteListModal}

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
                    disabled={!canAddList}
                    className={canAddListClass}
                    value="+" />
                Your Lists
            </div>                {
                    listCard
                }
            </div>
            <DeleteListModal
                propName={name}
                hideDeleteListModalCallback={hideDeleteListModal}
                deleteListCallback={deleteMarkedList}
            />
        </div>)
}

export default ListSelector;