package a101.phorest.service;

import a101.phorest.domain.*;
import a101.phorest.dto.PostDTO;
import a101.phorest.dto.UserDTO;
import a101.phorest.jwt.TokenProvider;
import a101.phorest.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true) // 기본은 false
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    public final TokenProvider tokenProvider;
    private final UserRepository userRepository;

    private final BookmarkRepository bookmarkRepository;

    private final LikeRepository likeRepository;

    private final MyPageRepository myPageRepository;

    @Transactional
    public Long join(Images images, String category, String content){
        //validateDuplicateMember(post);
        Post post = new Post();
        post.setTime(LocalDateTime.now(ZoneId.of("Asia/Seoul")));
        post.setLikeCount(0);
        post.setCategory(category);
        post.setContent(content);
        if("photogroup".equals(category))
            post.setPhotoGroup((PhotoGroup) images);
        else if("frame".equals(category))
            post.setFrame((Frame) images);
        post.setShared(false);
        postRepository.save(post);
        return post.getId();
    }

    public Optional<PostDTO> findDtoOne(Long mode, Long postId, String username){
        Optional <Post> post = postRepository.findById(postId);
        if(post.isEmpty())
            return Optional.empty();
        List<User> users = userRepository.findPostMyPageUsers(postId);
        List<UserDTO> userDTOS = new ArrayList<>();
        for (User user : users) {
            UserDTO userDto = UserDTO.from(user);
            userDTOS.add(userDto);
        }
        PostDTO postDto = new PostDTO(post.get(), userDTOS);
        postDto.setIsLike(false);
        postDto.setIsBookmark(false);
        postDto.setIsWriter(false);
        if(!username.isEmpty()) {
            if(likeRepository.findByPostIdAndUsername(postId, username).isPresent())
                postDto.setIsLike(true);
            if(bookmarkRepository.findByPostIdAndUsername(postId,username).isPresent())
                postDto.setIsBookmark(true);
            if(myPageRepository.findByPostIdAndUsername(postId, username).isPresent())
                postDto.setIsWriter(true);

        }
        if(!post.get().isShared() && mode == 1L && !postDto.getIsWriter())
            return Optional.empty();
        return Optional.of(postDto);

    }

    public Optional<Post> findOne(Long postId){
        return postRepository.findById(postId);
    }

    public List<PostDTO> findByLikeCount(String category, Long limit, Long offset, Long humancount) {
        List<PostDTO> postDTOS = new ArrayList<>();
        List<Post> posts = new ArrayList<>();
        if(category.equals("photogroup"))
        {
            posts.addAll(postRepository.findPhotogroupByLikeCount("photogroup", limit, offset, humancount));

        }
        else if(category.equals("frame"))
        {
            posts.addAll(postRepository.findFrameByLikeCount("frame", limit, offset));
        }
        for(int i = 0; i < posts.size(); i++) {
            List<User> users = userRepository.findByPostId(posts.get(i).getId());
            List<UserDTO> userDTOS = new ArrayList<>();
            for(int j = 0; j < users.size(); j++)
            {
                UserDTO userDto = UserDTO.from(users.get(j));
                userDTOS.add(userDto);
            }
            PostDTO postDto = new PostDTO(posts.get(i), userDTOS);
            postDTOS.add(postDto);
        }
        return postDTOS;


    }
    public List<PostDTO> findByRecent(String category, Long limit, Long offset, Long humancount) {
        List<PostDTO> postDTOS = new ArrayList<>();
        List<Post> posts = new ArrayList<>();
        if (category.equals("photogroup")) {
            posts.addAll(postRepository.findPhotogroupByRecent("photogroup", limit, offset, humancount));

        } else if (category.equals("frame")) {
            posts.addAll(postRepository.findFrameByRecent("frame", limit, offset));
        }
        for (int i = 0; i < posts.size(); i++) {
            List<User> users = userRepository.findByPostId(posts.get(i).getId());
            List<UserDTO> userDTOS = new ArrayList<>();
            for (int j = 0; j < users.size(); j++) {
                UserDTO userDto = UserDTO.from(users.get(i));
                userDTOS.add(userDto);
            }
            PostDTO postDto = new PostDTO(posts.get(i), userDTOS);
            postDTOS.add(postDto);
        }
        return postDTOS;
    }

    @Transactional
    public Long editPost(Long postId, String username, String content){
        Optional<Post> post = postRepository.findById(postId);
        if(post.isEmpty())
            return 2L;
        Optional<MyPage> myPage = myPageRepository.findByPostIdAndUsername(postId, username);
        if(myPage.isEmpty())
            return 3L;
        post.get().setContent(content);
        return 0L;

    }

    @Transactional
    public Long deletePost(Long postId, String username){
        Optional<Post> post = postRepository.findById(postId);
        if(post.isEmpty())
            return 2L;
        Optional<MyPage> myPage = myPageRepository.findByPostIdAndUsername(postId, username);
        if(myPage.isEmpty())
            return 3L;
        if(post.get().getCategory().equals("photogroup")){
            myPageRepository.deleteById(myPage.get().getId());
            List<MyPage> myPages = myPageRepository.findByPostIdShared(postId);
            if(myPages.size() == 0)
                post.get().setShared(false);
        }
        else if(post.get().getCategory().equals("frame")){
            postRepository.deleteById(postId);
        }
        return 0L;
    }


}
