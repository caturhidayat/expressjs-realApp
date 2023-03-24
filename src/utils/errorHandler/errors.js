export default {
    CORS_ORIGIN: "cors/origin",


    // Auth Error
    WRONG_USER: "auth/wrongUserPassword",
    NAME_EMPTY: `"name" is not allowed to be empty`,
    NAME_MIN: `"name" length must be at least 5 characters long`,
    EMAIL_EMPTY: `"email" is not allowed to be empty`,
    PASSWORD_EMPTY: `"password" is not allowed to be empty`,
    PASSWORD_MIN: `"password" length must be at least 5 characters long`,
    
    
    // Prisma Error / auth
    PRISMA_UNIQUE_EMAIL: "prisma/uniqueEmail",
    PRISMA_DUPLICATE_EMAIL:
        "\n" +
        "Invalid `prisma.user.create()` invocation:\n" +
        "\n" +
        "\n" +
        "Unique constraint failed on the fields: (`email`)",
};
