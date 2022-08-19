# Spring 입문

빌드 하기

```jsx
./gradlew build # 빌드하기
./gradlew clean # 빌드 취소하기
./gradlew clean build # 취소후 다시 빌드
```

문제발생

1. 포트가 이미 사용중일때 : cmd 에서 kill 해주기 [https://dundung.tistory.com/148](https://dundung.tistory.com/148)

```jsx
package hello.hellospring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HelloController {

    @GetMapping("hello") //hello로 들어가면하면 이 메서드를 실행함함
   public String hello(Model model){
        model.addAttribute("data","spririring"); // attribute value 로 바뀜
        return "hello"; //resources/templpates/hello.html 로 리턴. 그 화면으로 렌더링해라
    }

    @GetMapping("hello-mvc")
    public String helloMvc(@RequestParam("name") String name, Model model){ // 웹사이트에서 입력한대로 바뀜
        model.addAttribute("name",name); //웹 사이트에서 String name 변수를 받아서 화면에 보여주기
        return "hello-template";
    }

    @GetMapping("hello-string")
    @ResponseBody //http 바디에 직접 넣어주겠다. -> html 파일이 따로 필요없이 return 값이 걍 그 페이지 자체가 됨
    public String helloString(@RequestParam("name") String name){ // 링크에 ? 로 name 의 키값 입력해주는건 동일
        return "hello "+name; // 이거 그대로가 /hello-string 페이지에 보여짐
    }
}
```