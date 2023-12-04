import axios from "axios"
import Notiflix from "notiflix";
export { getImages }


function getImages(input, page) {
    Notiflix.Block.pulse('body', 'Loading...');

    const options = {
        key: '41061573-024b7cbeabeac3d17174d6333',
        q: String(input),
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: 1,
        per_page: '40'
    }


    const params = new URLSearchParams(options)

    return axios.get(`https://pixabay.com/api/?${params}`)
        .then(response => {
            Notiflix.Block.remove('body');
            return response.data.hits
        })
        .catch(error => console.log(Notiflix.Report.failure("CONNECTION ERROR", String(error), "OK")))
}
