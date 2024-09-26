import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPromotion, updatePromotion, fetchPromotions } from '../redux/features/ownerSlice';
import '../App.css';

const AddPromotions = () => {
  const [airlineName, setAirlineName] = useState('');
  const [promotionCode, setPromotionCode] = useState('');
  const [description, setDescription] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [validFrom, setValidFrom] = useState('');
  const [validUntil, setValidUntil] = useState('');
  const [isActive, setIsActive] = useState(1);  // Default value for isActive

  const promotions = useSelector((state) => state.owner.promotions);
  const dispatch = useDispatch();

  // Fetch promotions on component mount
  useEffect(() => {
    dispatch(fetchPromotions());
  }, [dispatch]);

  // Handle adding a new promotion
  const handleAddPromotion = (e) => {
    e.preventDefault();
    const promotionData = {
      airlineName,
      promotionCode,
      description,
      discountPercentage: parseFloat(discountPercentage),
      validFrom,
      validUntil,
      isActive: parseInt(isActive),  // Convert input to integer
    };
    dispatch(addPromotion(promotionData));
    resetForm();  // Reset form after submitting
  };

  // Reset form fields
  const resetForm = () => {
    setAirlineName('');
    setPromotionCode('');
    setDescription('');
    setDiscountPercentage('');
    setValidFrom('');
    setValidUntil('');
    setIsActive(1);
  };

  // Handle updating promotion status (activate/deactivate)
  const handleUpdatePromotion = (promotionId, newStatus) => {
    dispatch(updatePromotion({ promotionId, status: newStatus }));
  };

  return (
    <div className='container'>
      <h2>Add a New Promotion</h2>
      <form onSubmit={handleAddPromotion}>
        <input
          type="text"
          placeholder="Airline Name"
          value={airlineName}
          onChange={(e) => setAirlineName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Promotion Code"
          value={promotionCode}
          onChange={(e) => setPromotionCode(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Discount Percentage"
          value={discountPercentage}
          onChange={(e) => setDiscountPercentage(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          placeholder="Valid From"
          value={validFrom}
          onChange={(e) => setValidFrom(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          placeholder="Valid Until"
          value={validUntil}
          onChange={(e) => setValidUntil(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Is Active (1 for Active, 0 for Inactive)"
          value={isActive}
          onChange={(e) => setIsActive(e.target.value)}
          required
        />
        <button type="submit">Add Promotion</button>
      </form>

      <h2>Available Promotions</h2>
      <ul>
        {promotions.map((promotion) => (
          <li key={promotion.promotionId}>
            <p>
              {promotion.airlineName} - {promotion.promotionCode} - {promotion.description} - {promotion.discountPercentage}% -{' '}
              {promotion.isActive ? 'Active' : 'Inactive'}
            </p>
            <button onClick={() => handleUpdatePromotion(promotion.promotionId, 0)}>Deactivate</button>
            <button onClick={() => handleUpdatePromotion(promotion.promotionId, 1)}>Activate</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddPromotions;
