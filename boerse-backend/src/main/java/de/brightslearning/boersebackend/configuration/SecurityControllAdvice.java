//package de.brightslearning.boersebackend.configuration;
//
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.web.bind.annotation.ControllerAdvice;
//import org.springframework.web.bind.annotation.ModelAttribute;
//
//@ControllerAdvice
//public class SecurityControllerAdvice {
//
//    private final UserRepository userRepository;
//
//    @Autowired
//    public SecurityControllerAdvice(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }
//
//    @ModelAttribute("sessionUser")
//    public User sessionUser(@AuthenticationPrincipal UserDetails userDetails) {
//        if (userDetails != null) {
//            return userRepository.findByUsername(userDetails.getUsername()).orElse(null);
//        }
//        return null;
//    }
//}
