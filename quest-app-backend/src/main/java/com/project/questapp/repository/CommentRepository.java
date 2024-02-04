package com.project.questapp.repository;

import com.project.questapp.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment,Long> {
    List<Comment> findByUserIdAndPostId(Long userId, Long postId);

    List<Comment> findByUserId(Optional<Long> userId);

    List<Comment> findByPostId(Optional<Long> postId);
    @Query(value = "SELECT 'commented on' AS action, c.post_id, u.avatar, u.user_name " +
            "FROM comment c " +
            "LEFT JOIN user u ON u.id = c.user_id " +
            "WHERE c.post_id IN :postIds " +
            "LIMIT 5", nativeQuery = true)
    List<Object> findUserCommentsByPostId(@Param("postIds")List<Long> postIds);
}
