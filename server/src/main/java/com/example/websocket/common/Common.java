/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.websocket.common;

import com.example.websocket.model.Message;

/**
 *
 * @author Admin
 */
public class Common {
    private CommonType type;
    private Message message;
    private Long userId;
    public enum CommonType{
        CONNECT,
        LOGOUT,
        CHAT,
        CHATROOM,
        SECCESS,
        ERROR
    }

    public CommonType getType() {
        return type;
    }

    public void setType(CommonType type) {
        this.type = type;
    }

    public Message getMessage() {
        return message;
    }

    public void setMessage(Message message) {
        this.message = message;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    
}
