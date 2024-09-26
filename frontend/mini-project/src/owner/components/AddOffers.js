import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOffer, updateOffer, fetchOffers } from '../redux/features/ownerSlice';
import '../App.css';

const AddOffers = () => {
  const [offerCode, setOfferCode] = useState('');
  const [description, setDescription] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [validFrom, setValidFrom] = useState('');
  const [validUntil, setValidUntil] = useState('');
  const [isActive, setIsActive] = useState(1);  // New state for isActive field

  const offers = useSelector((state) => state.owner.offers);
  const dispatch = useDispatch();

  // Fetch offers on component mount
  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  // Handle adding a new offer
  const handleAddOffer = (e) => {
    e.preventDefault();
    const offerData = {
      offerCode,
      description,
      discountPercentage: parseFloat(discountPercentage),
      validFrom,
      validUntil,
      isActive: parseInt(isActive), // Convert input to integer
    };
    dispatch(addOffer(offerData));
    resetForm(); // Optional: Reset form after submitting
  };

  // Reset form fields
  const resetForm = () => {
    setOfferCode('');
    setDescription('');
    setDiscountPercentage('');
    setValidFrom('');
    setValidUntil('');
    setIsActive(1);
  };

  // Handle updating offer status (activate/deactivate)
  const handleUpdateOffer = (offerId, newStatus) => {
    dispatch(updateOffer({ offerId, status: newStatus }));
  };

  return (
    <div className='container'>
      <h2>Add a New Offer</h2>
      <form onSubmit={handleAddOffer}>
        <input
          type="text"
          placeholder="Offer Code"
          value={offerCode}
          onChange={(e) => setOfferCode(e.target.value)}
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
        <button type="submit">Add Offer</button>
      </form>

      <h2>Available Offers</h2>
      <ul>
        {offers.map((offer) => (
          <li key={offer.offerId}> {/* Add unique key here */}
            <p>
              {offer.offerCode} - {offer.description} - {offer.discountPercentage}% -{' '}
              {offer.isActive ? 'Active' : 'Inactive'}
            </p>
            <button onClick={() => handleUpdateOffer(offer.offerId, 0)}>Deactivate</button>
            <button onClick={() => handleUpdateOffer(offer.offerId, 1)}>Activate</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddOffers;

