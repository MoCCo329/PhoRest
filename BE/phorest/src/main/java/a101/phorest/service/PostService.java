package a101.phorest.service;

import a101.phorest.domain.*;
import a101.phorest.dto.PostDto;
import a101.phorest.dto.UserDto;
import a101.phorest.jwt.TokenProvider;
import a101.phorest.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
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
        post.setTime(LocalDateTime.now());
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

    public Optional<PostDto> findDtoOne(Long postId, String username){
        Optional <Post> post = postRepository.findById(postId);
        List<User> users = userRepository.findPostMyPageUsers(postId);
        List<UserDto> userDtos = new ArrayList<>();
        for(int i = 0; i < users.size(); i++)
        {
            UserDto userDto = UserDto.from(users.get(i));
            userDtos.add(userDto);
        }
        if(post.isEmpty())
            return Optional.empty();
        else if(!post.get().isShared())
            return Optional.empty();
        PostDto postDto = new PostDto(post.get(), userDtos);
        postDto.setIsLike(false);
        postDto.setIsBookmark(false);
        if(!username.isEmpty()) {
            if(likeRepository.findByPostIdAndUsername(postId, username).isPresent())
                postDto.setIsLike(true);
            if(bookmarkRepository.findByPostIdAndUsername(postId,username).isPresent())
                postDto.setIsBookmark(true);

        }
        return Optional.of(postDto);

    }

    public Optional<Post> findOne(Long postId){
        return postRepository.findById(postId);
    }

    public List<PostDto> findByLikeCount(String category, Long limit, Long offset, Long humancount) {
        List<PostDto> postDtos = new ArrayList<>();
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
            List<UserDto> userDtos = new ArrayList<>();
            for(int j = 0; j < users.size(); j++)
            {
                UserDto userDto = UserDto.from(users.get(j));
                userDtos.add(userDto);
            }
            PostDto postDto = new PostDto(posts.get(i), userDtos);
            postDtos.add(postDto);
        }
        return postDtos;


    }
    public List<PostDto> findByRecent(String category, Long limit, Long offset, Long humancount) {
        List<PostDto> postDtos = new ArrayList<>();
        List<Post> posts = new ArrayList<>();
        if (category.equals("photogroup")) {
            posts.addAll(postRepository.findPhotogroupByRecent("photogroup", limit, offset, humancount));

        } else if (category.equals("frame")) {
            posts.addAll(postRepository.findFrameByRecent("frame", limit, offset));
        }
        for (int i = 0; i < posts.size(); i++) {
            List<User> users = userRepository.findByPostId(posts.get(i).getId());
            List<UserDto> userDtos = new ArrayList<>();
            for (int j = 0; j < users.size(); j++) {
                UserDto userDto = UserDto.from(users.get(i));
                userDtos.add(userDto);
            }
            PostDto postDto = new PostDto(posts.get(i), userDtos);
            postDtos.add(postDto);
        }
        return postDtos;
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
