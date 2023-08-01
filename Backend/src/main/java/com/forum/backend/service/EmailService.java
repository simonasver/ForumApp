package com.forum.backend.service;

import com.forum.backend.model.EmailDetails;

public interface EmailService {
    void sendMail(EmailDetails details);
}
