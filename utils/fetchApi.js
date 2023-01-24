import axios from "axios";

export const baseURL = 'https://realty-in-us.p.rapidapi.com'

// POST calls
const postHeaders = {
    'content-type': 'application/json',
    'X-RapidAPI-Key': '03e01011d4msh51e9759e7d6003fp1fe863jsnd8aa8032176e',
    'X-RapidAPI-Host': 'realty-in-us.p.rapidapi.com'
  }

export const fetchApi = async (url, purpose, zipCode, limit = 5, minPrice = 0, maxPrice = 100000000, bedsMin = 0, bathsMin = 0, sort = 'desc', sortBy = 'list_date', areaMin = 0, areaMax = 1000000) => {
    const { data } = await axios.post(
        url, 
        {
            "list_price": {
                "max": maxPrice,
                "min": minPrice
            },
            "beds": {
                // "max": 3,
                "min": bedsMin
            },
            "baths": {
                // "max": 3,
                "min": bathsMin
            },
            "sqft_min": areaMin,
            "sqft_max": areaMax,
            "limit": limit,
            "offset": 0,
            "postal_code": zipCode,
            "status": [
                purpose,
            ],
            "sort": {
                "direction": sort,
                "field": sortBy
            }
        },
        {
            headers: postHeaders
        }
    )
    return data
}

// GET calls
const getHeaders = {
    'X-RapidAPI-Key': '03e01011d4msh51e9759e7d6003fp1fe863jsnd8aa8032176e',
    'X-RapidAPI-Host': 'realty-in-us.p.rapidapi.com'
}

// GET Property Data
export const getPropertyData = async (id) => {
    const { data } = await axios.get(`${baseURL}/properties/v3/detail?property_id=${id}`, 
    {
        headers: getHeaders
    })
    return data
}

// GET Broker Data
export const getBrokerData = async (zip, name) => {
    const { data } = await axios.get(`${baseURL}/agents/list?postal_code=${zip}&name=${name}`, 
    {
        headers: getHeaders
    })
    return data
}