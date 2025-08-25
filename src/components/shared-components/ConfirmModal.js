import { Button, Modal } from 'antd'
import React from 'react'
// import Alert from '../../../assets/images/Alert.png'
import Alert from "../../assets/images/Alert.png"

function ConfirmModal({ deleteConfirmationModal, setDeleteConfirmationModal, handleYesConfirmation, msg }) {
    const handleCancelConfirmation = () => {
        setDeleteConfirmationModal(false)
    }

    return (
        <Modal
            // title={<div className='d-flex align-items-center'><span className='d-block ml-2' > User Account Status </span></div>}
            visible={deleteConfirmationModal}
            onCancel={() => setDeleteConfirmationModal(false)}
            footer={false}
        >
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <img style={{ width: '60px' }} src={Alert} alt={'...'} />
                <h4 style={{ fontWeight: '300', width: '250px' }} className='text-center'>{msg}</h4>
            </div>
            <div className='d-flex justify-content-center mt-3'>
                <Button className='' onClick={() => handleCancelConfirmation()}>
                    No
                </Button>
                <Button className='bg-primary text-white ml-2' onClick={handleYesConfirmation}>
                    Yes
                </Button>
            </div>

        </Modal>
    )
}

export default ConfirmModal