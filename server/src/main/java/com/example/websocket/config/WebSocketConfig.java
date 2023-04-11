/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/Configuration.java to edit this template
 */
package com.example.websocket.config;

import com.example.websocket.service.MessageService;
import com.example.websocket.service.UserService;
import com.example.websocket.socket.WebSocketHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

/**
 *
 * @author Admin
 */
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer{
    @Autowired
    UserService userService;
    @Autowired
    MessageService messageService;
    public WebSocketHandler webSocketHandler() {
        return new WebSocketHandler(userService,messageService);
    }
        @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(webSocketHandler(), "/chat")
                .setAllowedOriginPatterns("*")
                .withSockJS();
        registry.addHandler(webSocketHandler(), "/chat")
                .setAllowedOriginPatterns("*");
    }
    
}
