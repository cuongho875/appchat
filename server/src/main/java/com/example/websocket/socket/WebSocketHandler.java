/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/Component.java to edit this template
 */
package com.example.websocket.socket;

import com.example.websocket.common.Common;
import com.example.websocket.model.Message;
import com.example.websocket.model.User;
import com.example.websocket.service.MessageService;
import com.example.websocket.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

/**
 *
 * @author Admin
 */
@Component
public class WebSocketHandler extends TextWebSocketHandler {

    private Map<Long, WebSocketSession> listUser = new HashMap<>();
    private static final Logger logger = LoggerFactory.getLogger(WebSocketHandler.class.getName());
//    @Autowired
    private UserService userService;
    private MessageService messageService;
    @Autowired
    public WebSocketHandler(UserService userService,MessageService messageService) {
        this.userService = userService;
        this.messageService = messageService;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        logger.info("connect session:" + session);
//        sessions.add(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
//        sessions.remove(session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
//        logger.info(message.getPayload());

        Common common = new ObjectMapper().readValue(message.getPayload(), Common.class);
        if (common.getType().equals(Common.CommonType.CONNECT)) {
            Long userId = common.getUserId();
            Connect(session, userId);
        }
        if (common.getType().equals(Common.CommonType.CHAT)) {
            Message chatMessage = common.getMessage();
            chatMessage.setTimestamp(new Date());
            logger.info(chatMessage.getContent());
            session.sendMessage(new TextMessage(new ObjectMapper().writeValueAsString(chatMessage)));;
            if (listUser.containsKey(chatMessage.getReceiver().getUserId())) {
                listUser.get(chatMessage.getReceiver().getUserId()).sendMessage(new TextMessage(new ObjectMapper().writeValueAsString(chatMessage)));;
            }
//            messageService.saveMessage(chatMessage);
//            for (Map.Entry<String, WebSocketSession> entry : listUser.entrySet()) {
//                if(listUser.containsKey(chatMessage.getReceiver())){
//                    entry.getValue().sendMessage(new TextMessage(new ObjectMapper().writeValueAsString(chatMessage)));
//                }
//            }
        }

    }

    public void Connect(WebSocketSession session, Long userId) throws IOException {
        User user = userService.findById(userId);
        if (user != null) {
            listUser.put(userId, session);
            logger.info(user.getUsername() + " connect");
        }

//        session.sendMessage(new TextMessage("hello" + user.getLastName()));
    }
}
