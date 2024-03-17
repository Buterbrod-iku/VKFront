import style from './nameForm.module.css'
import {useEffect, useState} from "react";
import {useFetching} from "../../utils/hooks/useFetching.ts";
import NameRequest from "../../API/name.ts";

const NameForm = () => {
    const [input, setInput] = useState("")
    const [age, setAge] = useState("")
    const [cache, setCache] = useState("")
    const [check, setCheck] = useState(true)

    const [fetchingFact, isLoading, error] = useFetching(async (name: string) => {
        setAge(await NameRequest(name))
    })

    const getName = (e, res: string) => {
        e.preventDefault()
        if (cache !== res){
            fetchingFact(res)
            setCache(res)
        }
    };

    const validate = (e) => {
        const text = e.target.value
        setInput(text)
        let regex = /\d/g;
        if (!regex.test(text)){
            setCheck(false)
        }
        else {
            setCheck(true)
        }
    }

    useEffect(() => {
        let timer;
        if (input.trim() !== '') {
            timer = setTimeout(() => {
                if (cache !== input){
                    fetchingFact(input)
                    setCache(input)
                }
            }, 3000);
        }

        return () => clearTimeout(timer);
    }, [input, getName]);

    return (
        <form className={style.main}>
            <h2>Второе задание</h2>
            <input className={style.input}
                   type="text"
                   value={input}
                   onChange={(e) => validate(e)}/>

            {
                age.age ?
                    (<p className={style.age}>Возраст - {age.age}</p>)
                    : null
            }

            {
                error ? <p>{error}</p>
                    : null
            }


            <button className={style.button} onClick={(e) => getName(e, input)} disabled={check}>Отправить</button>
        </form>
    );
};

export default NameForm;