


> Written with [StackEdit](https://stackedit.io/).

# 7월 14일 정리

## 웹 개발 방식
@Controller 을 이용해 class가 Controller으로 작동
@GetMapping("url") 을 통해 함수가 url을 따라 들어왔을 때 맞는 컨트롤러로 이동한다.
 1. 정적 컨텐츠
	스프링 컨테이너에 url 관련 controller가 없다면, static 폴더 안에서 url과 맞는 html 파일을 찾아서 return해준다.
 2. MVC와 템플릿 엔진
 스프링 컨테이너에 url에 맞는 controller가 있다면, model을 받아서 controller가 처리해 준 다음, string을 return하면 viewResolver가 templates 안에 url.html 파일을 찾아서 템플릿 엔진을 이용해 처리한 후, 처리된 html을 보내준다.
 3. API
 @ResponseBody annotation이 추가로 있다면, string을 return하면 StringConverter가 작동해서 바로 String을 보내주고, 객체를 return 하면 JsonConverter가 작동해서 객체를 return해준다.

## Test

@는 annotation

Test를 만들 때는 Test 폴더 안에 코드를 만들어서 한다.

@AfterEach
각각의 Test가 끝날 때마다 아래에 있는 함수를 실행시키라는 annotation

@Test
class의 method를 테스트하기 위해 사용되는 annotation

Ctrl + Shift + Test 단축키로 class에서 바로 Test class를 만들 수 있음.

뭔가를 만들어야 할 때 검증할 수 있는 틀을 먼저 만들고 작품을 만드는 것을 
테스트 주도 개발(TDD)라고 한다.

만약 객체가 NULL일 가능성이 있으면 Optional로 한번 감싸서 반환해준다.
.get으로 꺼낼 수 있다. 다만 바로 꺼내는 것을 권장하지 않음
보통 orElseGet을 쓴다.

테스트 함수 이름은 한글로 지어도 상관없다.

given when then 으로 테스트를 쉽게 알아볼 수 있다.
memberService에서 외부에서 member repository를 넣어주는 것을 DI(Dependency Injection)이라고 한다.

##  Service
Service는 보통 비즈니스 의존적으로 method 이름을 짓고,  Repository는 기계적으로 method 이름을 짓는다.
class 이름 위에 @Service를 하면 스프링이 올라올 때 스프링 컨테이너에 클래스를 등록시켜준다.
Repository는 @Repository를 하면 스프링 컨테이너에 클래스를 등록시켜준다.

## Controller
스프링 빈과 의존관계
@controller가 있으면, 스프링컨테이너가 @controller가 붙은 class의 객체를 생성해서 관리한다.
DI(Dependency Injection)는 @Autowired가 선언된 클래스의 생성자가 실행될 때, 매개변수에 스프링 컨테이너에 있는 객체를 넣어준다. 의존성을 부여한다.
스프링이 @Autowired를 통해 의존성을 주입해준다!
스프링을 쓰려면 대부분 스프링 빈으로 등록해서 사용하는 것이 좋다.

1. 컴포넌트 스캔과 자동 의존관계 설정이 위와 같은 방식
@Controller와 @Service @Repository는 안에 @Component가 포함되어있어 스프링 빈으로 자동 등록된다.

2. 자바 코드로 직접 스프링 빈 등록하기
@Configuration과 @Bean을 통해 직접 생성자를 선언해서 스프링 컨테이너에 스프링 빈을 등록시켜준다.

DI에는 필드 주입, setter 주입, 생성자 주입이 있지만, 생성자 주입을 권장한다.

실무에서는 주로 정형화된 컨트롤러, 서비스, 리포지토리 같은 코드는 컴포넌트 스캔을 사용한다. 그리고 정형화되지 않거나, 상황에 따라 구현 클래스를 변경해야 하면 설정을 통해 스프링 빈으로 등록한다.(변경이 일어나면 설정 파일만 바꾸면 됨)

