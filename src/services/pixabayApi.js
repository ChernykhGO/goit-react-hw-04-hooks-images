function fetchApi(inputText = "rain", page = 1) {
  return fetch(
    `https://pixabay.com/api/?key=22345544-d7e856a59bd0b8410f42b3802&q=${inputText}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`Не найдено изображения с названием ${inputText}`)
    );
  });
}

const pixabayApi = { fetchApi };

export default pixabayApi;
