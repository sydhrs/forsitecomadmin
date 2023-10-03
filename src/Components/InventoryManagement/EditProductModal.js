import {Button, Modal} from "antd";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {updateProductQuantity} from "../../Slices/productsSlice";

const EditProductModal = ({ openModal, setOpenModal, selectedProduct }) => {

    const dispatch = useDispatch();
    const [newQuantity, setNewQuantity] = useState(null);
    const [error, setError] = useState(null)

    useEffect(() => {
        selectedProduct && setNewQuantity(selectedProduct?.quantity)
    }, [selectedProduct]);
    const handleModalCancel = () => {
        setOpenModal(false)
    }
    const handleModalSave = () => {
        if (newQuantity >= 0) {
            dispatch(updateProductQuantity({productId: selectedProduct.id, newQuantity: newQuantity}))
            setOpenModal(false)
        }
    }

    useEffect(() => {
        if(newQuantity < 0)
        {
            setError('Quantity cannot be less than zero')
        } else {
            setError(null)
        }
    }, [newQuantity]);

    return (
        <Modal
            title='Edit Product Quantity'
            open={openModal}
            onCancel={handleModalCancel}
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
            <div className="edit-modal-content">
                <label className='quantity-label'>Quantity</label>
                <input className={`quantity-input ${!error ? 'with-margin' : ''}`}  type="number" value={newQuantity} onChange={(e) => setNewQuantity(e.target.value)} />
                <span className='error-msg'>{error}</span>
            </div>
        </Modal>
    )
}

export default EditProductModal