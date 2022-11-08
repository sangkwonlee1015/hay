package com.a603.hay.config;

import com.a603.hay.db.entity.Vote;
import com.a603.hay.db.repository.VoteRepository;
import java.time.LocalDateTime;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Slf4j
@Configuration
@EnableBatchProcessing
public class BatchConfig {

  @Autowired
  public JobBuilderFactory jobBuilderFactory;

  @Autowired
  public StepBuilderFactory stepBuilderFactory;

  @Autowired
  private VoteRepository voteRepository;

  @Bean
  public Job job() {
    Job job = jobBuilderFactory.get("job")
        .start(step())
        .build();

    return job;
  }

  @Bean
  public Step step() {
    return stepBuilderFactory.get("step")
        .tasklet((contribution, chunkContext) -> {
          log.info("Step!");

          List<Vote> pastVotes = voteRepository.findAllByIsEndedAndEndDateLessThanEqual(false, LocalDateTime.now());
          if (pastVotes.size() > 0 && pastVotes != null) {
            for (Vote vote : pastVotes) {
              vote.setEnded(true);
              voteRepository.save(vote);
            }
          }
          return RepeatStatus.FINISHED;
        }).build();
  }

}
