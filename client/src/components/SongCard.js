import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [isDragging, setIsDragging] = useState(false);
    const [draggedTo, setDraggedTo] = useState(false);
    const { song, index, setCurrentSong, setOldSong, setSongIndex, setIndexDelete, setShowDelete} = props;
    let cardClass = "list-card unselected-list-card";

    const handleDoubleClick = (ondblclick) => {
        ondblclick.preventDefault();
        setCurrentSong(song);
        setOldSong(song);
        setSongIndex(index);
    }

    const onDeleteClick = (event) => {
        setCurrentSong(song);
        setIndexDelete(index);
        setShowDelete(true);
    } 
    
    function handleDragStart(event) {
        event.dataTransfer.setData("song", event.target.id);
        setIsDragging(true);
        // setDraggedTo(draggedTo);
    }
    function handleDragOver(event) {
        event.preventDefault();
        // setIsDragging(isDragging);
        setDraggedTo(true);
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setIsDragging(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.substring(target.id.indexOf("-") + 1);
        let sourceId = event.dataTransfer.getData("song");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        
        setIsDragging(false);
        setDraggedTo(false);

        // ASK THE MODEL TO MOVE THE DATA
        store.moveSongTransaction(parseInt(sourceId), parseInt(targetId));
    }
    return (
        <div
            key={index}
            id={'song-' + index}
            className={cardClass}
            draggable={true}
            onDoubleClick={handleDoubleClick}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <input
                type="button"
                id={"remove-song-" + index}
                className="list-card-button"
                value={"\u2715"}
                onClick={onDeleteClick}
                
            />
        </div>
    );
}

export default SongCard;