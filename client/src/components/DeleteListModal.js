import React, { Component } from 'react';

const DeleteListModal = (props) => {
    
    const { propName, deleteListCallback, hideDeleteListModalCallback } = props;
    let name = "";
    if (propName) {
        name = propName;
    }
    return (
        <div 
            className="modal" 
            id="delete-list-modal" 
            data-animation="slideInOutLeft">
                <div className="modal-root" id='verify-delete-list-root'>
                    <div className="modal-north">
                        Delete playlist?
                    </div>
                    <div className="modal-center">
                        <div className="modal-center-content">
                            Are you sure you wish to permanently delete the {name} playlist?
                        </div>
                    </div>
                    <div className="modal-south">
                        <input type="button" 
                            id="delete-list-confirm-button" 
                            className="modal-button" 
                            onClick={deleteListCallback}
                            value='Confirm' />
                        <input type="button" 
                            id="delete-list-cancel-button" 
                            className="modal-button" 
                            onClick={hideDeleteListModalCallback}
                            value='Cancel' />
                    </div>
                </div>
        </div>
    );   
}
export default DeleteListModal;