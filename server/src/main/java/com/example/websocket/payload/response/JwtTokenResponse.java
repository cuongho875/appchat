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
public class JwtTokenResponse {
    private String accessToken;
    private String TypeToken = "Bearer";
    public JwtTokenResponse(String accessToken) {
        this.accessToken = accessToken;
    }
    
}
