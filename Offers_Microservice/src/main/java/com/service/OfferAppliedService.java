package com.service;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.OfferAppliedDao;
import com.entity.OfferApplied;

import java.util.List;
import java.util.Optional;

@Service
public class OfferAppliedService {

    @Autowired
    private OfferAppliedDao offerAppliedDAO;

    public List<OfferApplied> getAllOfferApplied() {
        return offerAppliedDAO.findAll();
    }

    public Optional<OfferApplied> getOfferAppliedById(Long id) {
        return offerAppliedDAO.findById(id);
    }

    public OfferApplied saveOfferApplied(OfferApplied offerApplied) {
        return offerAppliedDAO.save(offerApplied);
    }

    public void deleteOfferApplied(Long id) {
        offerAppliedDAO.deleteById(id);
    }
}
