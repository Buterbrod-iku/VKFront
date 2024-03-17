import axios from "axios";

export default async function NameRequest(name: string){
    const response = await axios.get(`https://api.agify.io/?name=${name}`)

    return response.data
}