package a101.phorest;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class S3Uploader {
    private final AmazonS3Client amazonS3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;


    public String uploadFiles(MultipartFile multipartFile, String dirName) throws IOException {
        File uploadFile = convert(multipartFile)  // 파일 변환할 수 없으면 에러
                .orElseThrow(() -> new IllegalArgumentException("error: 잘못된 확장자, 경로이거나 경로에 같은 이름의 파일이 있습니다."));
        return upload(uploadFile, dirName);
    }

    public String upload(File uploadFile, String filePath) {
        String fileName = filePath + "/" + uploadFile.getName();   // S3에 저장된 파일 이름
        String uploadImageUrl = putS3(uploadFile, fileName); // s3로 업로드
        removeNewFile(uploadFile);
        return uploadImageUrl;
    }

    public void deleteFile(String URL){
        String decodeResult = null;
        String fileName = URL.replace("https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/", "");
        try{
            decodeResult = URLDecoder.decode(fileName, "UTF-8");
        }catch(UnsupportedEncodingException e)
        {
            return;
        }
        System.out.println(decodeResult);
        DeleteObjectRequest request = new DeleteObjectRequest(bucket, decodeResult);
        amazonS3Client.deleteObject(request);
    }

    // S3로 업로드
    private String putS3(File uploadFile, String fileName) {
        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(CannedAccessControlList.PublicRead));
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    // 로컬에 저장된 이미지 지우기
    private void removeNewFile(File targetFile) {
        if (targetFile.delete()) {
            System.out.println("File delete success");
            return;
        }
        System.out.println("File delete fail");
    }

    // 로컬에 파일 업로드 하기
    private Optional<File> convert(MultipartFile file) throws IOException {
        UUID uuid = UUID.randomUUID();
        File convertFile = new File(System.getProperty("user.dir") + "/imagefiles/" + uuid + "_" + file.getOriginalFilename());
        final String[] PERMISSION_FILE_EXT_ARR = {"JFIF", "GIF", "JPEG", "JPG", "PNG", "BMP", "MP4", "FSET", "ISET", "FSET3"};
        boolean flag = false;
        String ext = FilenameUtils.getExtension(convertFile.getName()).toUpperCase();
        for(String allowedExt : PERMISSION_FILE_EXT_ARR){
            if(allowedExt.equals(ext)) {
                flag = true;
                break;
            }
        }
        if(!flag)
            return Optional.empty();
        if (convertFile.createNewFile()) { // 바로 위에서 지정한 경로에 File이 생성됨 (경로가 잘못되었다면 생성 불가능)
            try (FileOutputStream fos = new FileOutputStream(convertFile)) { // FileOutputStream 데이터를 파일에 바이트 스트림으로 저장하기 위함
                fos.write(file.getBytes());
                System.out.println("File write done");
            }
            return Optional.of(convertFile);
        }
        return Optional.empty();
    }
}
