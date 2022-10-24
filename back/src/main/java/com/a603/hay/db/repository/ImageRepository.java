package com.a603.hay.db.repository;

import com.a603.hay.db.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {

}
