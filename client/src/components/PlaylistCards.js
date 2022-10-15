import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import EditSongModal from './EditSongModal.js';
import { GlobalStoreContext } from '../store'
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function PlaylistCards() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    const [currentSong, setCurrentSong] = useState({});
    const [songIndex, setSongIndex] = useState(0);

    function hideEditSongModal() {
        let modal = document.getElementById("edit-song-modal");
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
                    setSongIndex={setSongIndex}


                />
            ))
        }
            <EditSongModal
                addEditSongTransaction={store.addEditSongTransaction}
                index={songIndex}
                song={currentSong}
                hide={hideEditSongModal}
            />
        </div>
    )
}

export default PlaylistCards;