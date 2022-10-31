package com.a603.hay.db.repository;

import com.a603.hay.db.entity.Comment;
import com.a603.hay.db.entity.Vote;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

  List<Comment> findAllByVote(Vote vote);
}
