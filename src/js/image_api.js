import axios from "axios"
import Notiflix from "notiflix";
export { getImages }



async function getImages(input, page = 1) {


    const options = {
        key: '41061573-024b7cbeabeac3d17174d6333',
        q: String(input),
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: page,
        per_page: '40'
    }

    const params = new URLSearchParams(options)

    const res = await axios.get(`https://pixabay.com/api/?${params}`)
    Notiflix.Loading.hourglass(`Ми знайшли ${res.data.totalHits} результатів`);
    return res.data
}
