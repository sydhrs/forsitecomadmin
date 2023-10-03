import {Alert, Button, Modal} from "antd";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {updateProductQuantity} from "../../Slices/productsSlice";

const EditProductModal = ({ openModal, setOpenModal, selectedProduct }) => {

    const dispatch = useDispatch();
    const [newQuantity, setNewQuantity] = useState(null);
    const [error, setError] = useState(null)
    const [showInventoryAlert, setShowInventoryAlert] = useState(false);

    useEffect(() => {
        selectedProduct && setNewQuantity(selectedProduct?.quantity)
    }, [selectedProduct]);

    useEffect(() => {
        selectedProduct && setNewQuantity(selectedProduct?.quantity);
        setShowInventoryAlert(selectedProduct?.quantity < 5);
    }, [selectedProduct]);

    useEffect(() => {
        if(newQuantity < 0)
        {
            setError('Quantity cannot be less than zero')
        } else {
            setError(null)
        }
    }, [newQuantity]);
    const handleModalCancel = () => {
        setOpenModal(false)
    }
    const handleModalSave = () => {
        if (newQuantity >= 0) {
            dispatch(updateProductQuantity({productId: selectedProduct.id, newQuantity: newQuantity}))
            setOpenModal(false)
        }
    }


    return (
        <Modal
            title='Edit Product Quantity'
            open={openModal}
            onCancel={handleModalCancel}
            centered={true}
            footer={[
                <div className='button-container'>
                    <Button className='cancel-btn' key="cancel" onClick={handleModalCancel}>
                        Cancel
                    </Button>
                    <Button className='save-btn' key="submit" type="primary" onClick={handleModalSave}>
                        Save
                    </Button>
                </div>

            ]}
        >
            {showInventoryAlert && (
                <Alert className='custom-alert' message="Low Inventory Alert" description="Inventory is less than 5. Please restock soon." type="warning" showIcon />
            )}
            <div className="edit-modal-content">
                <label className='quantity-label'>Quantity</label>
                <input className={`quantity-input ${!error ? 'with-margin' : ''}`}  type="number" value={newQuantity} onChange={(e) => setNewQuantity(e.target.value)} />
                <span className='error-msg'>{error}</span>
            </div>
        </Modal>
    )
}

export default EditProductModal