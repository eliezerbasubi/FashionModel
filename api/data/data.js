export const JSON_TYPE = 'application/json'; 

export const userCredentials = {
    firstname: "Eliezer",
    lastname: "Basubi",
    email: "eliezer.basubi30@gmail.com",
    password: "user1234",
    phoneNumber: "0975889758",
    address: "Bukavu, DRC",
    isAdmin: true
}

export const missingParameter = {
    firstname: "Eliezer",
    lastname: "Basubi",
    email: "eliezer.basubi300@gmail.com",
    passwords: "user1234",
    phoneNumber: "0975889758",
    address: "Bukavu, DRC",
    isAdmin: true
}

export const logData = {
    email: userCredentials.email,
    password: userCredentials.password
}

export const routes = {
    signUp: '/auth/signup',
    signIn: '/auth/signin'
}
