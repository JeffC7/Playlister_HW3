import React, { Component } from 'react';

export default class DeleteSongModal extends Component {
    constructor(props) {
        super(props);
    }

    handleConfirmClick = () => {
        this.props.addDeleteSongTransaction(this.props.song, this.props.indexDelete);
        this.props.setShowDelete(false);
    }

    handleCancelClick = () => {
        this.props.hide();
        this.props.setShowDelete(false);
    }

    render() {
        const { title } = this.props.song;
        let className = "modal";
        // console.log(this.props.index);
        if (this.props.showDelete) {
            className += " is-visible";
        }
        
        return (
            <div class={className} id="delete-song-modal" data-animation="slideInOutLeft">
            <div class="modal-root" id='verify-delete-song-root'>
                <div class="modal-north">
                    Remove Song?
                </div>                
                <div class="modal-center">
                    <div class="modal-center-content">
                        Are you sure you wish to permanently delete the {title} from the playlist?
                    </div>
                </div>
                <div class="modal-south">
                    <input type="button" id="delete-song-confirm-button" class="modal-button" value='Confirm' onClick={this.handleConfirmClick}/>
                    <input type="button" id="delete-song-cancel-button" class="modal-button" value='Cancel' onClick={this.handleCancelClick}/>
                </div>
            </div>
        </div>
        );
    }
}