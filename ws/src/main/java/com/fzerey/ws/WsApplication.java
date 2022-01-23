package com.fzerey.ws;

import com.fzerey.ws.user.User;
import com.fzerey.ws.user.UserService;
import com.fzerey.ws.user.dto.UserDTO;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class WsApplication {

	public static void main(String[] args) {
		SpringApplication.run(WsApplication.class, args);
	}

	@Bean
	CommandLineRunner createAdmin(UserService userService){
		return (args) -> {

			try{
				UserDTO userDTO = userService.getByUsername("admin");
				System.out.println(userDTO.toString());
			}catch (Exception e){
				User user = new User();
				user.setEmail("admin@fzerey.com");
				user.setUsername("admin");
				user.setPassword("SA");
				user.setEnabled(true);
				user.setFirstName("admin");
				user.setLastName("admin");
				user.setRole("role_admin");
				userService.createAdminUser(user);
			}

		};
	}

}
