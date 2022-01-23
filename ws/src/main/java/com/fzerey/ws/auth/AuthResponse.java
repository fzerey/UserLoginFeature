package com.fzerey.ws.auth;

import com.fzerey.ws.user.dto.UserDTO;
import lombok.Data;

@Data
public class AuthResponse {

    private String token;

    private UserDTO user;

}
