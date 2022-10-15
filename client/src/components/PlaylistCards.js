import { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import EditSongModal from './EditSongModal.js';
import DeleteSongModal from './DeleteSongModal.js';
import { GlobalStoreContext } from '../store'
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function PlaylistCards() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    const [currentSong, setCurrentSong] = useState({title:"", artist:"", youTubeId:""});
    const [songIndex, setSongIndex] = useState(-1);
    const [oldSong, setOldSong] = useState({});
    const [indexDelete, setIndexDelete] = useState(-1);
    const [showDelete, setShowDelete] = useState(false);

    //setSongIndex(null);
    // useEffect(() => {
    //     console.log("hello");
    // }, [songIndex])

    function hideEditSongModal() {
        let modal = document.getElementById("edit-song-modal");
        modal.classList.remove("is-visible");
        
    }

    function hideDeleteSongModal() {
        let modal = document.getElementById("delete-song-modal");
        modal.classList.remove("is-visible");
    }

    return (
        <div id="playlist-cards">
        {
            store.currentList.songs.map((song, index) => (
                <SongCard
                    id={'playlist-song-' + (index)}
                    key={'playlist-song-' + (index)}
                    index={index}
                    song={song}
                    setCurrentSong={setCurrentSong}
                    setOldSong={setOldSong}
                    setSongIndex={setSongIndex}
                    setIndexDelete={setIndexDelete}
                    setShowDelete={setShowDelete}
                />
            ))
        }
            <EditSongModal
                addEditSongTransaction={store.addEditSongTransaction}
                index={songIndex}
                song={currentSong}
                oldSong={oldSong}
                setSongIndex={setSongIndex}
                setCurrentSong={setCurrentSong}
                hide={hideEditSongModal}
            />

            <DeleteSongModal
                addDeleteSongTransaction={store.addDeleteSongTransaction}
                song={currentSong}
                indexDelete={indexDelete}
                setIndexDelete={setIndexDelete}
                showDelete={showDelete}
                setShowDelete={setShowDelete}
                hide={hideDeleteSongModal}
            />
        </div>
    )
}

export default PlaylistCards;