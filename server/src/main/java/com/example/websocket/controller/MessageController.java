/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/RestController.java to edit this template
 */
package com.example.websocket.controller;

import com.example.websocket.model.Message;
import com.example.websocket.model.MessageGroup;
import com.example.websocket.service.GroupService;
import com.example.websocket.service.MessageGroupService;
import com.example.websocket.service.MessageService;
import com.example.websocket.service.UserService;
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
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author Admin
 */
@RestController
@RequestMapping("/api/message")
public class MessageController {
    @Autowired
    private MessageService messageService;
    @Autowired
    private MessageGroupService messageGroupService;
    @Autowired
    private UserService userService;
    @Autowired
    private GroupService groupService;
    @PostMapping("/sendMessage")
    public ResponseEntity sendMessage(@RequestParam String content,@RequestParam Long senderId,
            @RequestParam Long receiverId,@RequestParam Message.MessageType type) throws Exception{
        Message message = new Message();
        message.setContent(content);
        message.setSender(userService.findById(senderId));
        message.setReceiver(userService.findById(receiverId));
        message.setType(type);
        message.setTimestamp(new Date());
        Message msg = messageService.saveMessage(message);
        return ResponseEntity.ok(msg);
    }
    @PostMapping("/sendMessageToGroup/{groupId}")
    public ResponseEntity sendMessageToGroup(@RequestParam String content,@RequestParam Long senderId,
            @RequestParam MessageGroup.MessageType type,@PathVariable Long groupId) throws Exception{
        MessageGroup message = new MessageGroup();
        message.setContent(content);
        message.setSender(userService.findById(senderId));
        message.setGroup(groupService.getGroupById(groupId));
        message.setType(type);
        message.setTimestamp(new Date());
        MessageGroup msg = messageGroupService.saveMessage(message);
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
