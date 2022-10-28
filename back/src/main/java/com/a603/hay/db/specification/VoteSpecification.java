package com.a603.hay.db.specification;

import com.a603.hay.db.entity.Category;
import com.a603.hay.db.entity.User;
import com.a603.hay.db.entity.Vote;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

public class VoteSpecification {

  public static Specification<Vote> equalUser(User user) {
    return new Specification<Vote>() {
      @Override
      public Predicate toPredicate(Root<Vote> root, CriteriaQuery<?> query,
          CriteriaBuilder criteriaBuilder) {
        return criteriaBuilder.equal(root.get("user"), user);
      }
    };
  }

  public static Specification<Vote> equalCategory(Category category) {
    return new Specification<Vote>() {
      @Override
      public Predicate toPredicate(Root<Vote> root, CriteriaQuery<?> query,
          CriteriaBuilder criteriaBuilder) {
        return criteriaBuilder.equal(root.get("category"), category);
      }
    };
  }

  public static Specification<Vote> equalEnded(boolean done) {
    return new Specification<Vote>() {
      @Override
      public Predicate toPredicate(Root<Vote> root, CriteriaQuery<?> query,
          CriteriaBuilder criteriaBuilder) {
        return criteriaBuilder.equal(root.get("isEnded"), done);
      }
    };
  }

  public static Specification<Vote> likeTitle(String search) {
    return new Specification<Vote>() {
      @Override
      public Predicate toPredicate(Root<Vote> root, CriteriaQuery<?> query,
          CriteriaBuilder criteriaBuilder) {
        return criteriaBuilder.like(root.get("title"), "%" + search + "%");
      }
    };
  }

}
