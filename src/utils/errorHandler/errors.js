export default {
    CORS_ORIGIN: "cors/origin",
    WRONG_USER: "auth/wrongUserPassword",
    // WRONG_USER: "user is not defined",
    NAME_EMPTY: `"name" is not allowed to be empty`,
    EMAIL_EMPTY: `"email" is not allowed to be empty`,
    PASSWORD_EMPTY: `"password" is not allowed to be empty`,
    PRISMA_UNIQUE_EMAIL: "prisma/uniqueEmail",
    
    
    // Prisma Error
    DUPLICATE_EMAIL:
        "\n" +
        "Invalid `prisma.user.create()` invocation:\n" +
        "\n" +
        "\n" +
        "Unique constraint failed on the fields: (`email`)",
};
