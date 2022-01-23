package com.fzerey.ws.user.validator;

import com.fzerey.ws.user.User;
import com.fzerey.ws.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername, String> {

    @Autowired
    UserRepository userRepository;

    @Override
    public boolean isValid(String username, ConstraintValidatorContext constraintValidatorContext) {
        User indb =  userRepository.findByUsername(username);
        if(indb != null){
            return false;
        }
        return true;
    }
}
