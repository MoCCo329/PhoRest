package a101.phorest.service;

import a101.phorest.domain.Role;
import a101.phorest.domain.User;
import a101.phorest.dto.UserDTO;
import a101.phorest.repository.UserRepository;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Service;
import springfox.documentation.spring.web.json.Json;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class KakaoService {

//    private final UserRepository userRepository;

    //private final String redirect_uri = "http://localhost:8399/api/user/kakao";
    private final String redirect_uri = "https://phorest.site/api/user/kakao";

    public List<String> getToken(String code) throws IOException {
        //인가코드로 토큰 받기
        String host = "https://i7a101.p.ssafy.io/api/user/kakao";

        String uri = redirect_uri;

        List<String> tokens = new ArrayList<>();
        try {
            URL url = new URL(host);
            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setRequestMethod("POST");
            urlConnection.setDoOutput(true);

            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(urlConnection.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id=4656da19556d6f608f3a297dd7c7b994");
            sb.append("&redirect_uri=" + uri);
            sb.append("&code=" + code);

            bw.write(sb.toString());
            bw.flush();

            int responseCode = urlConnection.getResponseCode();
            System.out.println("responseCode = " + responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
            String line = "";
            String result = "";
            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("result = " + result);

            // json parsing
            JSONParser parser = new JSONParser();
            JSONObject elem = (JSONObject) parser.parse(result);

            String access_token = elem.get("access_token").toString();
            String refresh_token = elem.get("refresh_token").toString();
            System.out.println("refresh_token = " + refresh_token);
            System.out.println("access_token = " + access_token);

            tokens.add(access_token);
            tokens.add(refresh_token);


            br.close();
            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (org.json.simple.parser.ParseException e) {
            e.printStackTrace();
        }

        return tokens;
    }

    public Map<String, String> getUserInfo(String access_token) throws IOException {
        // 사용자 정보 가져오기
        String host = "https://kapi.kakao.com/v2/user/me";
        Map<String, String> result = new HashMap<>();
        try {
            URL url = new URL(host);

            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            urlConnection.setRequestProperty("Authorization", "Bearer " + access_token);
            urlConnection.setRequestMethod("GET");

            int responseCode = urlConnection.getResponseCode();
            System.out.println("responseCode = " + responseCode);


            BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
            String line = "";
            String res = "";
            while((line=br.readLine())!=null)
            {
                res+=line;
            }

            System.out.println("res = " + res);


            JSONParser parser = new JSONParser();
            JSONObject obj = (JSONObject) parser.parse(res);
            String id = obj.get("id").toString();

            JSONObject properties = (JSONObject) obj.get("properties");
            String nickname = properties.get("nickname").toString();
            String profile_image = properties.get("profile_image").toString();

            result.put("id", id);
            result.put("nickname", nickname);
            result.put("profile_image", profile_image);
            //result.put("phone_number", phone_number);
            //result.put("age_range", age_range);

            br.close();


        } catch (IOException | org.json.simple.parser.ParseException e) {
            e.printStackTrace();
        }

        return result;
    }

    public String getAgreementInfo(String access_token)
    {
        //  동의 내역 확인하기
        String result = "";
        String host = "https://kapi.kakao.com/v2/user/scopes";
        try{
            URL url = new URL(host);
            HttpURLConnection urlConnection = (HttpURLConnection)url.openConnection();
            urlConnection.setRequestMethod("GET");
            urlConnection.setRequestProperty("Authorization", "Bearer "+access_token);

            BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
            String line = "";
            while((line=br.readLine())!=null)
            {
                result+=line;
            }

            int responseCode = urlConnection.getResponseCode();
            System.out.println("responseCode = " + responseCode);

            // result is json format
            br.close();

        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (ProtocolException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return result;
    }


}