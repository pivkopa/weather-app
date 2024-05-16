import axios from "axios";

export const fetchCities = async (value: string) => {
  try {
    const response = await axios.request({
      method: 'GET',
      url: `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${value}`,
      headers: {
        'X-RapidAPI-Key': '07879ab7b0msh70591667e205d0ap1206e8jsn94f3d69e11bf',
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
      }
    });
    return response?.data?.data;
  } catch (error) {
    console.error(error);
  }
}
