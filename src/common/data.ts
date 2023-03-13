export const UsersInfo =
    [
        {
            id: 1,
            userId: "administrator1",
            password: "password",
            email: "administrator1@test.local"
        },
        {
            id: 2,
            userId: "student1",
            password: "password",
            email: "student1@test.local"
        },
        {
            id: 3,
            userId: "professor1",
            password: "password",
            email: "professor1@test.local"
        }
    ];

export const RoutingType = Object.freeze({
    Authentication: 'authentication',
    AnonymousMain: 'anonymous main',
    UserMain: 'user main'
})

export const AuthProcessType = Object.freeze({
    Login: 'login',
    SignUp: 'signup',
    ForgotPassword: 'forgotPassword'
})