package com.project.questapp.requests;

import com.project.questapp.entities.Post;
import com.project.questapp.entities.User;
import lombok.Data;

@Data
public class LikeCreateRequest {
    Long id;
    Long postId;
    Long userId;
}
