/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/Service.java to edit this template
 */
package com.example.websocket.service;

import com.example.websocket.model.Message;
import com.example.websocket.repository.MessageRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Admin
 */
@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;
    public Message saveMessage(Message message) throws Exception{
        return messageRepository.save(message);
    }
    public List<Message> getAllMessageBySenderAndReciever(Long userId1,Long userId2){
        return messageRepository.findAllMessageBySenderAndReciever(userId1,userId2);
    }
    public List<Message> getListBoxChatByUserId(Long id){
        return messageRepository.findListBoxChatByUserId(id);
    }
}
