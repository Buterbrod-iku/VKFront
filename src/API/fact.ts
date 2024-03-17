import axios from "axios";

export default async function FactRequest(){
    const response = await axios.get("https://catfact.ninja/fact")

    return response.data
}