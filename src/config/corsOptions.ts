const allowedOrigins = [
    'http://localhost:3000',
    'https://www.google.com',
    'https://google.com'
];


export const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
    optionsSucessStatus: 200
}