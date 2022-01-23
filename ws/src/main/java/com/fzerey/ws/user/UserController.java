package com.fzerey.ws.user;

import com.fzerey.ws.shared.CurrentUser;
import com.fzerey.ws.shared.GenericResponse;
import com.fzerey.ws.user.dto.Email;
import com.fzerey.ws.user.dto.UserDTO;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;

@RestController
@RequestMapping("/api/1.0/users")
@AllArgsConstructor
public class UserController {


    private UserService userService;


    @PostMapping
    GenericResponse createUser(@Valid @RequestBody User user){
        userService.createUser(user);
        return new GenericResponse("user created");
    }

    @PostMapping("/verify")
    GenericResponse verifyCode(@RequestBody VerificationCredentials credentatials){
        return userService.verifyCode(credentatials);
    }
    @GetMapping("/online")
    Page<UserDTO> getOnlineUsers(@CurrentUser User user, Pageable page){
        return userService.getOnlineUsers(page, user).map(UserDTO::new);
    }
    @PostMapping("/password")
    GenericResponse retrievePassword(@RequestBody Email email){
        userService.retrievePassword(email);
        return new GenericResponse("password sent");
    }
    @GetMapping("/reports")
    GenericResponse getReports(@CurrentUser User user){
        HashMap<String, Integer> counts = userService.getReports(user);
        String str =  "Online users:" + counts.get("online") + "\n"+
                "Not verificated users:" + counts.get("notverify") + "\n"+
                "Registered users:" + counts.get("register");
        return new GenericResponse(str);
    }




}
