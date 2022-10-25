package com.a603.hay.api.service;

import com.a603.hay.api.dto.CategoryDto.CreateCategoryRequest;
import com.a603.hay.db.entity.Category;
import com.a603.hay.db.repository.CategoryRepository;
import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CategoryService {

  @Autowired
  CategoryRepository categoryRepository;

  @Transactional
  public void createCategory(CreateCategoryRequest createCategoryRequest) {
    Category newCategory = new Category();
    newCategory.setName(createCategoryRequest.getName());
    newCategory.setCreatedAt(LocalDateTime.now());
    newCategory.setUpdatedAt(LocalDateTime.now());
    categoryRepository.save(newCategory);
  }
}
