package de.brightslearning.boersebackend.configuration;

public class SecurityConstants {
    public static final long JWT_EXPIRATION = 900_0000;

    public static final String  JWT_SECRET = System.getenv("JWT_SECRET");
}
