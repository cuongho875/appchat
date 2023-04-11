/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/RestController.java to edit this template
 */
package com.example.websocket.controller;

import com.example.websocket.model.Message;
import com.example.websocket.service.MessageService;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author Admin
 */
@RestController
@RequestMapping("/api/message")
public class MessageController {
    @Autowired
    private MessageService messageService;
    
    @PostMapping("/sendMessage")
    public ResponseEntity sendMessage(@RequestBody Message message) throws Exception{
        message.setTimestamp(new Date());
        Message msg = messageService.saveMessage(message);
        return ResponseEntity.ok(msg);
    }
    @GetMapping("/getAllMessage/{id1}/{id2}")
    public ResponseEntity getAllMessage(@PathVariable("id1") Long id1,@PathVariable("id2") Long id2) {
        List<Message> listMessages = messageService.getAllMessageBySenderAndReciever(id1,id2);
        return ResponseEntity.ok(listMessages);
    }
    @GetMapping("/getListBoxChat/{id}")
    public ResponseEntity getListBoxChat(@PathVariable("id") Long id){
        List<Message> listMessages = messageService.getListBoxChatByUserId(id);
        return ResponseEntity.ok(listMessages);
    }
}
