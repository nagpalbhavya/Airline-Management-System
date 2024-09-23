import React, { useEffect } from 'react'
import '../../css/Landing Page/Offers.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOffers } from '../../redux/offerSlice';

const Offers = () => {

  const dispatch=useDispatch();
  const offers=useSelector((state)=>state.offers.offers)
  const offerStatus=useSelector((state)=>state.offers.status)
  const error=useSelector((state)=>state.offers.error)


  useEffect(()=>{
    if(offerStatus==='idle')
    {
      dispatch(fetchOffers())
    }
  })

  return (
    <div>
      {offerStatus === 'loading' && <p>Loading...</p>}
      {offerStatus === 'failed' && <p>{error}</p>}
      {offerStatus==='success'&& offers.length===0?

        <div>There are no offer available at the moment</div>:
        <div className='offer-main'>
          <h3>Exciting offers for you</h3>
          <div className='offers'>
          {offers.map(offer=>(
            <div className='offer-container'>
              <p className='offer-description'>{offer.description}</p>
              <p className='offer-and-code'>Use Code <span className='offer-code'>{offer.offerCode}</span></p>
            </div>
          ))}
          </div>
        </div>
    }
    </div>
  )
}

export default Offers