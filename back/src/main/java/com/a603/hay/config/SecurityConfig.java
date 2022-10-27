package com.a603.hay.config;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

import com.a603.hay.common.util.AuthEntryPointJwt;
import com.a603.hay.common.util.CustomAuthorizationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  private static final String[] Exclude_Paths =
      {"/api/user/login/**", "/api/user/join/**"};

  private final AuthEntryPointJwt unauthorizedHandler;

  @Override
  protected void configure(HttpSecurity http) throws Exception {

    http.cors().and().csrf().disable()
        .sessionManagement().sessionCreationPolicy(STATELESS)
        .and()
        .authorizeRequests().antMatchers(Exclude_Paths).permitAll()
        .anyRequest().authenticated()
        .and()
        .exceptionHandling().authenticationEntryPoint(unauthorizedHandler)
        .and()
        .addFilterBefore(new CustomAuthorizationFilter(),
            UsernamePasswordAuthenticationFilter.class);
  }
}