export const AUTH_FORM_ERRORS_KEYS = {
    REQUIRED: 'required',
    PASSWORD_MIN_LENGTH: 'passwordMinLength',
    INCORRECT_EMAIL: 'incorrectEmail',
    PASSWORDS_DOESNT_MATCH: 'passwordsDoesntMatch',
};

export const authFormErrorMessagesDict = {
    pl: {
        required: 'Pole jest wymagane',
        passwordMinLength: 'Hasło musi mieć przynajmniej 6 znaków',
        incorrectEmail: 'Adres e-mail jest nieprawidłowy',
        passwordsDoesntMatch: 'Hasła się nie zgadzają',
    },
    en: {
        required: 'Field is required',
        passwordMinLength: 'The password must have at least 6 characters',
        addressMaxLength: 'The page address can have a maximum of 32 characters',
        incorrectEmail: 'Email address is invalid',
        passwordsDoesntMatch: 'Passwords do not match',
    },
};
