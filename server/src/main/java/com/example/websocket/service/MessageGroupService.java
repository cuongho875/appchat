/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/Service.java to edit this template
 */
package com.example.websocket.service;

import com.example.websocket.model.MessageGroup;
import com.example.websocket.repository.MessageGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Admin
 */
@Service
public class MessageGroupService {
    @Autowired
    private MessageGroupRepository messageRepository;
    public MessageGroup saveMessage(MessageGroup message) throws Exception{
        return messageRepository.save(message);
    }
}
