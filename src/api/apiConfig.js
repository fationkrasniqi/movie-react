const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: 'b4ae68d8047c93d62045e4e370ac41f1',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;

