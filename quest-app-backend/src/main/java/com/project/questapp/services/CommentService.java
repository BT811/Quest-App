package com.project.questapp.services;

import com.project.questapp.entities.Comment;
import com.project.questapp.entities.Post;
import com.project.questapp.entities.User;
import com.project.questapp.repository.CommentRepository;
import com.project.questapp.requests.CommentCreateRequest;
import com.project.questapp.requests.CommentUpdateRequest;
import com.project.questapp.responses.CommentResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommentService {

    private CommentRepository commentRepository;
    private  UserService userService;
    private PostService postService;

    public CommentService(CommentRepository commentRepository, UserService userService, PostService postService) {
        this.commentRepository = commentRepository;
        this.userService = userService;
        this.postService = postService;
    }

    public List<CommentResponse> getAllComments(Optional<Long> userId, Optional<Long> postId) {
        List<Comment> comments ;
        if(userId.isPresent() && postId.isPresent()){
            comments = commentRepository.findByUserIdAndPostId(userId.get(),postId.get());
        }else if (userId.isPresent()){
            comments = commentRepository.findByUserId(userId);
        } else if (postId.isPresent()) {
            comments = commentRepository.findByPostId(postId);
        }else{
            comments = commentRepository.findAll();
        }
        return comments.stream().map(c -> new CommentResponse(c)).collect(Collectors.toList());
    }


    public Comment getOneCommentById(Long postId) {
        return commentRepository.findById(postId).orElse(null);
    }

    public Comment createOneComment(CommentCreateRequest request) {
        User user = userService.getOneUserById(request.getUserId());
        Post post = postService.getOnePostById(request.getPostId());
        if(user != null && post != null){
            Comment toSave = new Comment();
            toSave.setId(request.getId());
            toSave.setPost(post);
            toSave.setUser(user);
            toSave.setText(request.getText());
            toSave.setCreateDate(new Date());
            return commentRepository.save(toSave);
        }else return null;
    }

    public Comment updateOneComment(Long commentId, CommentUpdateRequest request) {
        Optional<Comment> comment = commentRepository.findById(commentId);
        if (comment.isPresent()){
            Comment commentToUpdate = comment.get();
            commentToUpdate.setText(request.getText());
            return commentRepository.save(commentToUpdate);
        }else return null;
    }

    public void deleteOneComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }
}
