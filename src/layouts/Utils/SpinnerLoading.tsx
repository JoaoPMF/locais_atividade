export const SpinnerLoading = () => {
    return (
        <div className="overlay gradient-bg">
            <div className="overlay-content">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">
                        Loading...
                    </span>
                </div>
            </div>
        </div>
    );
}