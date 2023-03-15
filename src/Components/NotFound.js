import notFound from "../Assets/404.png"
import "../Styles/NotFound.scss"

export default function NotFound(){
    return(
        <div className="not-found">
            <img src={notFound}></img>
            <p>Pagina pe care o cauți nu există.</p>
        </div>
    )
}