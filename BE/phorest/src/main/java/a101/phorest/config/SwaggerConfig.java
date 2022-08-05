//package a101.phorest.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import springfox.documentation.builders.ApiInfoBuilder;
//import springfox.documentation.builders.PathSelectors;
//import springfox.documentation.builders.RequestHandlerSelectors;
//import springfox.documentation.service.ApiInfo;
//import springfox.documentation.service.Contact;
//import springfox.documentation.spi.DocumentationType;
//import springfox.documentation.spring.web.plugins.Docket;
//import springfox.documentation.swagger2.annotations.EnableSwagger2;
//
//import java.util.ArrayList;
//
//@Configuration
//@EnableSwagger2
//public class SwaggerConfig {
//
//    private static final String API_NAME = "PhoRest API";
//    private static final String API_VERSION = "1.0.0";
//    private static final String API_DESCRIPTION = "PhoRest API 명세서";
//    @Bean
//    public Docket apiV1() {
//        return new Docket(DocumentationType.SWAGGER_2)
//                .groupName("a101")
//                .select()
//                .apis(RequestHandlerSelectors.
//                        basePackage("phorest"))
//                .paths(PathSelectors.ant("/v1/api/**"))
//                .build()
//                .apiInfo(apiInfo());
//    }
//
//    @Bean
//    public Docket apiV2() {
//        return new Docket(DocumentationType.SWAGGER_2)
//                .useDefaultResponseMessages(false)
//                .groupName("a101")
//                .select()
//                .apis(RequestHandlerSelectors.
//                        basePackage("phorest"))
//                .paths(PathSelectors.ant("/v2/api/**"))
//                .build()
//                .apiInfo(apiInfo());
//    }
//
//    private ApiInfo apiInfo() {
//        return new ApiInfoBuilder()
//                .title(API_NAME)
//                .version(API_VERSION)
//                .description(API_DESCRIPTION)
//                .build();
//    }
//}