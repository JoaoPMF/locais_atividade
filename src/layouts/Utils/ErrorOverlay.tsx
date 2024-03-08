export const ErrorOverlay: React.FC<{ httpError : string}> = (props) => {

    const handleClick = () => {
        window.location.reload();
    }

    return (
        <div className="overlay gradient-bg">
            <div className="overlay-content">
                <h4 className="">Oh não! Parece que o Bonifácio fez das suas...</h4><br/><br/>
                <div className="text-body-light">
                    Erro:<br/>
                    {props.httpError}
                </div>
                <button className="btn btn-primary text-white mt-4 border-button" onClick={handleClick}>Recarregar</button>
            </div>
        </div>
    );
}