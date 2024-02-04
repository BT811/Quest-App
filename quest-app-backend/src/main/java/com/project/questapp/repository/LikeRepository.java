package com.project.questapp.repository;

import com.project.questapp.entities.Comment;
import com.project.questapp.entities.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like,Long> {
    List<Like> findByUserIdAndPostId(Long userId, Long postId);

    List<Like> findByUserId(Optional<Long> userId);

    List<Like> findByPostId(Optional<Long> postId);
    @Query(value = "SELECT 'liked' AS action, l.post_id, u.avatar, u.user_name " +
            "FROM p_like l " +
            "LEFT JOIN user u ON u.id = l.user_id " +
            "WHERE l.post_id IN :postIds " +
            "LIMIT 5", nativeQuery = true)
    List<Object> findUserLikesByPostId(@Param("postIds")List<Long> postIds);
}