# 0715

## @ResponseBody 객체 반환

```java
@GetMapping("hello-string")
    @ResponseBody //http 바디에 직접 넣어주겠다. -> html 파일이 따로 필요없이 return 값이 걍 그 페이지 자체가 됨
    public String helloString(@RequestParam("name") String name){ // 링크에 ? 로 name 의 키값 입력해주는건 동일
        return "hello "+name; // 이거 그대로가 /hello-string 페이지에 보여짐
    }

@GetMapping("hello-api")
    @ResponseBody //viewResolver가 아닌 httpMessageConverter로 동작하고, 객체면 jsonConverter로 동작
    public Hello helloApi(@RequestParam("name") String name){
        Hello hello = new Hello();
        hello.setName(name); //json 방식으로 반환 => "name": "sprindfsd"
        return hello;
    }

    static class Hello{
        private String name;

        //getter setter 자동 생성성
        // java bin 표준 방식
        //property 접근 방식

       public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }
```

@ResponseBody 를 사용하고, 객체를 반환하면 객체가 JSON으로 변환됨

### 실행

[http://localhost:8080/hello-api?name=spring](http://localhost:8080/hello-api?name=spring)

### @ResponseBody 사용 원리

![Untitled](0715%202aeff4b810394230b5bdd92a3dc26ae1/Untitled.png)

- @ResponseBody 를 사용
    
    HTTP의 BODY에 문자 내용을 직접 반환
    viewResolver 대신에 HttpMessageConverter 가 동작
    기본 문자처리: StringHttpMessageConverter
    기본 객체처리: MappingJackson2HttpMessageConverter
    byte 처리 등등 기타 여러 HttpMessageConverter가 기본으로 등록되어 있음
    

> 참고: 클라이언트의 HTTP Accept 해더와 서버의 컨트롤러 반환 타입 정보 둘을 조합해서
HttpMessageConverter 가 선택된다. 더 자세한 내용은 스프링 MVC 강의에서 설명하겠다
> 

# Test 케이스 작성

test 내 MemoryMemberRepositoryTest 클래스 만들고 작성

```java
package hello.hellospring.repository;

import hello.hellospring.domain.Member;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.*;

class MemoryMemberRepositoryTest {
    MemoryMemberRepository repository = new MemoryMemberRepository();

    //Test 할때마다 레포를 깔끔히 지워줘야함
    @AfterEach
    public  void afterEach(){
        repository.clearStore();
    }

    @Test
    public void save(){
        Member member = new Member();
        member.setName("hehesun");

        repository.save(member);

        Member result = repository.findById(member.getId()).get();
        assertThat(member).isEqualTo(result);

    }

    @Test
    public void findByName(){
        //given
        Member member1 = new Member();
        member1.setName("spring1");
        repository.save(member1);

        Member member2 = new Member();
        member2.setName("spring2");
        repository.save(member2);

        //when
        Member result = repository.findByName("spring1").get();
        //then
        assertThat(result).isEqualTo(member1);
    }
    @Test
    public void findAll() {
        //given
        Member member1 = new Member();
        member1.setName("spring1");
        repository.save(member1);

        Member member2 = new Member();
        member2.setName("spring2");
        repository.save(member2);

        //when
        List<Member> result = repository.findAll();
        //then
        assertThat(result.size()).isEqualTo(2);
    }
}
```

main > repository > `MemoryMemberRepository` 에서 clearStore 메서드 추가

```java
public void clearStore(){
        store.clear();
    }
```

# 회원 서비스 개발

```java
package hello.hellospring.service;

import hello.hellospring.domain.Member;
import hello.hellospring.repository.MemberRepository;
import hello.hellospring.repository.MemoryMemberRepository;

import java.util.List;
import java.util.Optional;

public class MemberService {
    private final MemberRepository memberRepository = new MemoryMemberRepository();

    /**
     * 회원가입
     */

    public Long join(Member member){
        validateDuplicateMember(member); //중복 회원 검증
        memberRepository.save(member);
        return member.getId();
    }

    private void validateDuplicateMember(Member member) {
        //동명이인 안됨
        //null 일 가능성이 있으면 optional로 한번 감싸서 진행 => 자동으로 감싸짐
        memberRepository.findByName(member.getName())
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 존재하는 회원입니다.");
                });
    }

    /**
     * 전체 회원 조회
     */
    public List<Member> findMembers() {
        return memberRepository.findAll();
    }
    public Optional<Member> findOne(Long memberId) {
        return memberRepository.findById(memberId);
    }
}
```

# 회원 서비스 테스트

ctrl + shift + t ⇒ test case 자동 작성

### given when then 문법

- given : 주어진 상황
- when : 이걸로 실행되었을때
- then : 이렇게 결과가 나와야함 (검증부)

### 기존에는 회원 서비스가 메모리 회원 리포지토리를 직접 생성하게 했다

```java
public class MemberService {
 private final MemberRepository memberRepository = new MemoryMemberRepository();
}
```

### 회원 리포지토리의 코드가
회원 서비스 코드를 DI 가능하게 변경한다.

```java
public class MemberService {
    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository; //외부에서 넣어주도록 바꾸기
    }
```

### 회원 서비스 테스트

```java
package hello.hellospring.service;

import hello.hellospring.domain.Member;
import hello.hellospring.repository.MemoryMemberRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

class MemberServiceTest {

    MemberService memberService;
    MemoryMemberRepository memberRepository;

    @BeforeEach
    public void beforeEach() {
        //테스트가 독립적으로 실행되야기 때문에 각각 객체 생성
        memberRepository = new MemoryMemberRepository();
        memberService = new MemberService(memberRepository);
    }

    @AfterEach
    public void afterEach() {
        memberRepository.clearStore();
    }

    @Test
    void join() {
        //회원가임

        //Given
        Member member = new Member();
        member.setName("spring");

        //When
        Long saveId = memberService.join(member);

        //Then
        Member findMember = memberService.findOne(saveId).get();
        assertEquals(member.getName(), findMember.getName());
    }

    @Test
    public void 중복_회원_예외() {
        //Given
        Member member1 = new Member();
        member1.setName("spring");

        Member member2 = new Member();
        member2.setName("spring");

        //When
        memberService.join(member1);
        IllegalStateException e = assertThrows(IllegalStateException.class,
                () -> memberService.join(member2));//예외가 발생해야 한다.
        assertThat(e.getMessage()).isEqualTo("이미 존재하는 회원입니다.");
    }

    @Test
    void findMembers() {
    }

    @Test
    void findOne() {
    }
}
```

- @BeforeEach : 각 테스트 실행 전에 호출된다. 테스트가 서로 영향이 없도록 항상 새로운 객체를 생성하고, 의존관계도 새로 맺어준다.