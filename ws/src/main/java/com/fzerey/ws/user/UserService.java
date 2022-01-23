package com.fzerey.ws.user;

import com.fzerey.ws.auth.AuthException;
import com.fzerey.ws.auth.Token;
import com.fzerey.ws.auth.TokenRepository;
import com.fzerey.ws.error.NotFoundException;
import com.fzerey.ws.shared.Constants;
import com.fzerey.ws.shared.GenericResponse;
import com.fzerey.ws.user.dto.Email;
import com.fzerey.ws.user.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Random;

@Service
public class UserService {

    private UserRepository userRepository;


    private JavaMailSender mailSender;

    private TokenRepository tokenRepository;


    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(JavaMailSender mailSender, PasswordEncoder passwordEncoder, TokenRepository tokenRepository, UserRepository userRepository) {
        this.mailSender = mailSender;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
    }

    public User sendVerificationCode(User user){
        try {
            Random rnd = new Random();
            int number = rnd.nextInt(999999);
            String verificationCode = String.format("%06d", number);
            user.setVerificationCode(verificationCode);
            UserDTO userDTO = new UserDTO(user);
            sendVerificationEmail(userDTO, verificationCode);
            return user;
        }catch (Exception ex){
            ex.printStackTrace();
            return null;
        }
    }

    public void createUser(User user) {
        user.setRegisterDate(LocalDateTime.now());
        user.setRole("role_user");
        user.setEnabled(false);
        user = sendVerificationCode(user);
        userRepository.save(user);
    }

    public void createAdminUser(User user){
        user.setRole("role_admin");
        user.setEnabled(true);
        userRepository.save(user);
    }


    public GenericResponse verifyCode(VerificationCredentials credentatials){
        String email = credentatials.getEmail();
        String verificationCode = credentatials.getCode();
        User user = userRepository.findByEmail(email);
        if(user == null){
            throw new NotFoundException("Email or code is wrong");
        }
        if(user.getEnabled()){
            return new GenericResponse("User is already activated");
        }
        if(user.getVerificationCode().equals(verificationCode)){
            user.setEnabled(true);
            user.setVerificationDate(LocalDateTime.now());
            userRepository.save(user);
            return new GenericResponse("User activated");
        }
        throw new AuthException("Email or code is wrong");

    }

    private void sendVerificationEmail(UserDTO user, String code) throws MessagingException, UnsupportedEncodingException {
        String toAddress = user.getEmail();
        String fromAddress = Constants.EMAIL;
        String senderName = "Demo App";
        String subject = "Please verify your registration";
        String content = "Your verification code is : [[CODE]]";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[CODE]]", code);

        helper.setText(content, true);

        mailSender.send(message);
    }

    public Page<User> getOnlineUsers(Pageable page, User user) {
        if(!user.getRole().equals("role_admin")){
            throw new AuthException("Admin error");
        }
        List<User> users = userRepository.findAll();
        List<User> onlineUsers = new ArrayList<>();

        for(User usr: users){
            if(usr.getTokens().size() > 0 && usr.getRole().equals("role_user")){
                onlineUsers.add(usr);
            }
        }
        return new PageImpl<User>(onlineUsers, page, onlineUsers.size());
    }


    public void retrievePassword(Email email){
        User user = userRepository.findByEmail(email.getEmail());
        if(user == null){
            throw new NotFoundException("User not found");
        }
        String password = user.getPassword();
        try{
            sendPasswordMail(email.getEmail(), password);
        }catch (Exception ex){
            System.out.println("HATA");
        }
    }

    public void sendPasswordMail(String email, String password) throws MessagingException, UnsupportedEncodingException {
        String toAddress = email;
        String fromAddress = Constants.EMAIL;
        String senderName = "Demo App";
        String subject = "Your password";
        String content = "Your password is : [[PASSWORD]]";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[PASSWORD]]", password);

        helper.setText(content, true);

        mailSender.send(message);
    }

    public UserDTO getByUsername(String username){
        User user = userRepository.findByUsername(username);
        return new UserDTO(user);
    }


    public HashMap<String, Integer> getReports(User user) {
        HashMap<String,Integer> map = new HashMap<>();
        List<User> users = userRepository.findAll();
        map.put("online", 0);
        map.put("notverify", 0);
        map.put("register",0);
        if(user.getRole().equals("role_admin")){
            int count;
            for(User usr : users){
                if(usr.getRole().equals("role_user") && !usr.getEnabled()){
                    LocalDateTime date = usr.getRegisterDate();
                    Duration duration = Duration.between(date, LocalDateTime.now());
                    long seconds = duration.getSeconds();
                    if(seconds > 0) {
                        count = map.get("notverify");
                        map.put("notverify",count+1);
                    }
                }
                if(usr.getRole().equals("role_user") && usr.getTokens().size()>0){
                    count = map.get("online");
                    map.put("online", count+1);
                }
                if(usr.getRole().equals("role_user")){
                    Duration duration = Duration.between(usr.getRegisterDate(), LocalDateTime.now());
                    if(duration.getSeconds() < 86400){
                        count = map.get("register");
                        map.put("register", count+1);
                    }
                }
            }
            return map;
        }
        throw new AuthException("Admin error");
    }
}
