import style from './App.module.css'
import RequestsForInput from "./components/requestsForInput/requestsForInput.tsx";
import NameForm from "./components/nameForm/nameForm.tsx";

function App() {

    return (
        <main className={style.main}>
            <RequestsForInput />
            <hr/>
            <NameForm />
        </main>
    )
}

export default App
