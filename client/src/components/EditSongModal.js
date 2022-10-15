import React, { Component } from 'react';

export default class EditSongModal extends Component {
    constructor(props) {
        super(props);
    }

    handleConfirmClick = () => {
        this.props.addEditSongTransaction(this.props.song, this.props.oldSong, this.props.index);
        this.props.setSongIndex(-1);
    }

    handleCancelClick = () => {
        this.props.hide();
        this.props.setSongIndex(-1);
    }
    

    render() {
        const { artist, title, youTubeId } = this.props.song;
        const setSong = this.props.setCurrentSong;

        let className = "modal";
        //console.log(this.props.index);
        if (this.props.index !== -1) {
            className += " is-visible";
        }
        //console.log(className);
        return (
            <div className={className} id="edit-song-modal" data-animation="slideInOutLeft">
            <div className="modal-root" id='edit-song-root'>
                <div className="modal-north">
                    Edit Song
                </div>                
                <div className="modal-center">
                    <div className="edit-modal-center-content">
                        <div className="edit-modal-center-content-item"> 
                            Title: 
                        </div>

                        <div className="edit-modal-center-content-item">
                            <input type="text" id="edit-song-modal-title-textfield" value={title}
                            onChange={ (event) => 
                                {
                                    //this.setState(prevState => ({...prevState, songName:event.target.value}))
                                    setSong(song => ({...song, title: event.target.value}))
                                }}>
                            </input>
                        </div>
                        
                        <div className="edit-modal-center-content-item"> 
                            Artist:
                        </div>
                        
                        <div className="edit-modal-center-content-item">
                            <input type="text" id="edit-song-modal-artist-textfield" value={artist} 
                            onChange={ (event) => 
                                {
                                    //this.setState(prevState => ({...prevState, songArtist:event.target.value}))
                                    setSong(song => ({...song, artist: event.target.value}))
                                }}>
                            </input> 
                        </div>


                        <div className="edit-modal-center-content-item"> 
                            YouTube Id:
                        </div>

                        <div className="edit-modal-center-content-item"> 
                            <input type="text" id="edit-song-modal-youTubeId-textfield" value={youTubeId} 
                            onChange={ (event) => 
                                {
                                    //this.setState(prevState => ({...prevState, songYouTubeId:event.target.value}))
                                    setSong(song => ({...song, youTubeId: event.target.value}))
                                }}>
                            </input> 
                        </div>
                    </div>
                </div>
                <div className="modal-south">
                    <input type="button" id="edit-song-confirm-button" className="modal-button" value='Confirm' onClick={this.handleConfirmClick}/>
                    <input type="button" id="edit-song-cancel-button" className="modal-button" value='Cancel' onClick={this.handleCancelClick}/>
                </div>
            </div>
        </div>);
    }
}