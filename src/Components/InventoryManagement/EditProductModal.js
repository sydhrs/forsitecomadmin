import {Button, Modal} from "antd";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {updateProductQuantity} from "../../Slices/productsSlice";

const EditProductModal = ({ openModal, setOpenModal, selectedProduct }) => {

    const dispatch = useDispatch();
    const [newQuantity, setNewQuantity] = useState(null);

    useEffect(() => {
        selectedProduct && setNewQuantity(selectedProduct?.quantity)
    }, [selectedProduct]);
    const handleModalCancel = () => {
        setOpenModal(false)
    }
    const handleModalSave = () => {
        dispatch(updateProductQuantity({productId: selectedProduct.id, newQuantity: newQuantity}))
        setOpenModal(false)
    }

    return (
        <Modal
            title='Edit Product'
            open={openModal}
            onCancel={handleModalCancel}
            footer={[
                <Button key="cancel" onClick={handleModalCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleModalSave}>
                    Save
                </Button>,
            ]}
        >
            <div className="edit-modal-content">
                <label>Quantity:</label>
                <input type="number" value={newQuantity} onChange={(e) => setNewQuantity(e.target.value)} />
            </div>
        </Modal>
    )
}

export default EditProductModal