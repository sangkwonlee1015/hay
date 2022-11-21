package com.a603.hay.db.repository;

import com.a603.hay.db.entity.Comment;
import com.a603.hay.db.entity.Likes;
import com.a603.hay.db.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikesRepository extends JpaRepository<Likes, Long> {

  Optional<Likes> findByUserAndComment(User user, Comment comment);
}
