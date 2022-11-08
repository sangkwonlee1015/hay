package com.a603.hay.db.repository;

import com.a603.hay.db.entity.Location;
import com.a603.hay.db.entity.User;
import com.a603.hay.db.entity.VoteLog;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {

  List<Location> findAllByUser(User user);

  Location findByUserAndSeq(User user, int seq);

  Location findByIdAndUser(Long id, User user);
}
