/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.websocket.payload.response;

import com.example.websocket.model.User;
import lombok.Data;

/**
 *
 * @author Admin
 */
@Data
public class SignInResponse {
    private User user;
    private String message;

    public SignInResponse(User user, String message) {
        this.user = user;
        this.message = message;
    }
    
}
