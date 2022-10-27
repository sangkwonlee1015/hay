package com.a603.hay.db.repository;

import com.a603.hay.db.entity.User;
import com.a603.hay.db.entity.Vote;
import com.a603.hay.db.entity.VoteItem;
import com.a603.hay.db.entity.VoteLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteLogRepository extends JpaRepository<VoteLog, Long> {

  int countByUserAndVote(User user, Vote vote);

  int countByVoteItem(VoteItem voteItem);

  int countByVote(Vote vote);
}
