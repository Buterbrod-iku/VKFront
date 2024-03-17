import style from './requestsForInput.module.css'
import FactRequest from "../../API/fact.ts";
import {useCallback, useEffect, useRef, useState} from "react";
import {useFetching} from "../../utils/hooks/useFetching.ts";

const RequestsForInput = () => {
    const [fact, setFact] = useState({})

    const [fetchingFact, isLoading, error] = useFetching(async () => {
        setFact(await FactRequest())
    })

    const inputRef = useRef(null);
    const getFact = useCallback(() => {
        fetchingFact()
        inputRef.current.focus();
    }, []);

    useEffect(() => {
        // Moving cursor to the end
        inputRef.current.selectionStart = inputRef.current.value.split(" ")[0].length;
        inputRef.current.selectionEnd = inputRef.current.value.split(" ")[0].length;
    }, [fact]);

    return (
        <div className={style.main}>
            <h2>Первое задание</h2>
            <input className={style.input}
                   ref={inputRef}
                   type="text"
                   value={error ? "Ошибка сервера" : fact.fact}
                   onChange={(e) => setFact(e.target.value)}
            />

            <button className={style.button} onClick={getFact}>Получить факт</button>
        </div>
    );
};

export default RequestsForInput;