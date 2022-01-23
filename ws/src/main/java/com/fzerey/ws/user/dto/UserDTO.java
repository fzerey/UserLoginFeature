package com.fzerey.ws.user.dto;

import com.fzerey.ws.user.User;
import lombok.Data;

@Data
public class UserDTO {
    private String username;

    private String firstName;

    private String lastName;

    private String email;

    private String role;

    public UserDTO(User user){
        this.setUsername(user.getUsername());
        this.setFirstName(user.getFirstName());
        this.setLastName(user.getLastName());
        this.setEmail(user.getEmail());
        this.setRole(user.getRole());
    }

}
