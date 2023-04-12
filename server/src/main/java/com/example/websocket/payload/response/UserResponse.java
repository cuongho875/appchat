/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.websocket.payload.response;

import lombok.Data;

/**
 *
 * @author Admin
 */
@Data
public class UserResponse {
    private String type;
    private String message;

    public UserResponse(String type, String message) {
        this.type = type;
        this.message = message;
    }
    
}
