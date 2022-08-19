package a101.phorest.service;

import a101.phorest.domain.Bookmark;
import a101.phorest.domain.Like;
import a101.phorest.domain.Post;
import a101.phorest.domain.User;
import a101.phorest.repository.BookmarkRepository;
import a101.phorest.repository.LikeRepository;
import a101.phorest.repository.PostRepository;
import a101.phorest.repository.UserRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Getter
@Setter
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BookmarkService {
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final BookmarkRepository bookmarkRepository;


    @Transactional
    public Long join(Long postId, String username)
    {
        Bookmark bookmark = new Bookmark();
        User user = userRepository.findByUsername(username);
        Post post = postRepository.findById(postId).get();
        bookmark.setUser(user);
        bookmark.setPost(post);
        bookmarkRepository.save(bookmark);
        return bookmark.getId();
    }

    @Transactional
    public Long remove(Long postId, String username)
    {
        //ike.Unlike();
        Bookmark bookmark = bookmarkRepository.findByPostIdAndUsername(postId, username).get();
        bookmarkRepository.deleteById(bookmark.getId());
        return bookmark.getId();
    }
}
