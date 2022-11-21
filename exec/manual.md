# 포팅 매뉴얼

## 개발 환경

### 프론트엔드

- Nodejs v16.16.0
- npm v8.14.0
- react v18.2.0

### 백엔드

- JDK 1.8
- SpringBoot v2.7.5
- IntelliJ IDEA
- MySQL v8.0.31

## 빌드 및 배포 가이드

<br>

1. 해당 Gitlab 레포의 master 브랜치를 clone
    ```bash
    git clone https://lab.ssafy.com/s07-final/S07P31A603.git
    ```

### 백엔드 빌드 및 배포 진행
```
    cd /home/ubuntu/S07P31A603/front/
    git pull origin be/develop
    // git stash && git pull origin be/develop && git stash pop
    npm run build
    sudo systemctl restart nginx
```

### 프론트엔드 빌드 및 배포 진행
```
    cd /home/ubuntu/S07P31A603/back/
    ./gradlew --debug build
    cd /home/ubuntu/S07P31A603/back/build/libs/
    sudo kill -9 `ps -ef | grep jar|awk '{print $2}'`
    sudo nohup java -jar hay-0.0.1-SNAPSHOT.jar &
```

## 외부 라이브러리

### kakao map
카카오 맵 서비스 사용을 위해 https://apis.map.kakao.com/ 사이트에서 APP KEY 발급을 눌러 key를 발급받아야합니다.

### kakao login
카카오 소셜 로그인 사용을 위해 플랫폼 등록 및 설정을 해야합니다.
자세한 정보는 https://developers.kakao.com/docs/latest/ko/getting-started/rest-api 문서를 참고합니다.





