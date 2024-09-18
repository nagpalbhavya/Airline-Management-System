package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.reactive.function.client.WebClient;

import com.dao.AirlineDao;
import com.dao.AirportDao;
import com.dao.ScheduleDao;
import com.entity.Airline;
import com.entity.Airport;
import com.model.FeedbackModel;
import com.model.OfferModel;
import com.model.OfferResponseModel;
import com.model.PromotionModel;
import com.model.PromotionResponseModel;
import com.repo.AirlineRepository;

import reactor.core.publisher.Flux;

@Service
public class OwnerService 
{
	@Autowired
	AirlineDao airlineDao;
	
	@Autowired
	AirportDao airportDao;
	
	@Autowired
	ScheduleDao scheduleDao;
	
	 @Lazy
	 @Autowired
	 @Qualifier("webclient")
	 private WebClient.Builder builder;
	 
	 
	 public Airport addAirport(Airport airport)
	    {
	        airportDao.save(airport);
	        return airport;
	    }

	    public String deleteAirport(String airportUniqueCode)
	    {
	        airportDao.deleteByUniqueCode(airportUniqueCode);
	        return "Airport Deleted Successfully";
	    }
	    
	    public List<Airport> getAllAirports()
	    {
	        return airportDao.findAll();
	    }
	    
	    public Airline addAirline(Airline airline)
	    {
	    	return airlineDao.save(airline);	    
	    }

	    public String addOffer(@RequestBody OfferModel offer)
	    {
	    	builder.build()
		           .post()
		           .uri("http://localhost:8081/offers/createoffer")
		           .bodyValue(offer)
		           .retrieve()
	    		   .bodyToMono(OfferModel.class)
	    		   .block();
	    	
	    	return "Offer added";
	    }

	    //disable / enable offer
	    @PutMapping("/updateOfferList/{offerId}/{status}")
	    public String updateOfferList(@PathVariable Long offerId, @PathVariable int status)
	    {
	    	builder.build()
	           .put()
	           .uri("http://localhost:8081/offers/updateOfferListing/{offerId}/{status}",offerId,status)
	           .retrieve()
 		   .bodyToMono(Void.class)
 		   .block();
	    	
	    	return "status updated";
	    	
	    }

	    //get offers applied
	    @GetMapping("/getOffers")
	    public Flux<OfferResponseModel> getOffers()
	    {
			return builder.build()
					.get()
					.uri("http://localhost:8081/offers/list")
					.retrieve()
					.bodyToFlux(OfferResponseModel.class);    	
	    }

	    //add promotional offer
	    @PostMapping("/addPromotion")
	    public String addPromotion(@RequestBody PromotionModel promotion)
	    {
	    	builder.build()
	           .post()
	           .uri("http://localhost:8081/promotions/createpromotion")
	           .bodyValue(promotion)
	           .retrieve()
 		   .bodyToMono(OfferModel.class)
 		   .block();
 	
	    	return "Promotion added";
	    	
	    }

	    @PutMapping("/updatePromotionList/{promotionId}/{status}")
	    public String updatePromotionList(@PathVariable Long promotionId, @PathVariable String status)
	    {
	    	builder.build()
	           .put()
	           .uri("http://localhost:8081/promotions/updatePromotionListing/{promotionId}/{status}",promotionId,status)
	           .retrieve()
		   .bodyToMono(Void.class)
		   .block();
	    	
	    	return "promotion updated";
	    	
	    }

	    @GetMapping("/getPromotions")
	    public Flux<PromotionResponseModel> getPromotion()
	    {
	    	return builder.build()
					.get()
					.uri("http://localhost:8081/promotions/list")
					.retrieve()
					.bodyToFlux(PromotionResponseModel.class);  
	    }

	    //get feedbacks by booking ids
	    @GetMapping("/feedback")
	    public List<FeedbackModel> getFeedbackbyBookingId()
	    {
			return null;
	    	
	    }
}
