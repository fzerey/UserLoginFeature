package com.fzerey.ws.user;

import lombok.Data;

@Data
public class VerificationCredentials {
    private String email;
    private String code;
}
