package com.fzerey.ws.user.validator;

import com.fzerey.ws.user.User;
import com.fzerey.ws.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueEmailValidator implements ConstraintValidator<UniqueEmail, String> {

    @Autowired
    UserRepository userRepository;

    @Override
    public boolean isValid(String email, ConstraintValidatorContext constraintValidatorContext) {
        User indb =  userRepository.findByEmail(email);
        if(indb != null){
            return false;
        }
        return true;
    }
}
