package com.forum.backend.service;

import com.forum.backend.exception.CustomException;
import com.forum.backend.model.EmailDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {
    private JavaMailSender javaMailSender;
    @Value("${spring.mail.username}")
    private String sender;


    @Override
    public void sendMail(EmailDetails details) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();

            mailMessage.setFrom(sender);
            mailMessage.setTo(details.getRecipient());
            mailMessage.setText(details.getMessageBody());
            mailMessage.setSubject(details.getSubject());

            javaMailSender.send(mailMessage);
        } catch (Exception e) {
            throw new CustomException("Could not send the email", HttpStatus.BAD_REQUEST);
        }
    }
}
