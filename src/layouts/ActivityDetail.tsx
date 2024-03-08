import { SectionIcon } from "./SectionIcon";
import AtividadeModel from "../models/AtividadeModel";

export const ActivityDetail: React.FC<{activityDetail: AtividadeModel}> = (props) => {
    return ( 
        <>
            <div className="" style={{width:`300px`, color:`white`}}>
                <p className="m-0" style={{fontSize:`20px`}}>{props.activityDetail.nome}</p>
                <p className="m-0" style={{fontSize:`18px`}}><i>{props.activityDetail.data}</i></p>
                <div className="row">
                    <div className="col">
                        {props.activityDetail.seccao.map((sectionVal) => {
                            return <SectionIcon key={sectionVal} section={sectionVal}/>
                        })}
                    </div>
                    <div className="col-auto">
                        <span style={{fontSize:`18px`}}>
                            {props.activityDetail.noites}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-moon-stars-fill mr-2" viewBox="0 0 16 16" style={{marginLeft:`5px`, marginRight:`10px`}}>
                                <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/>
                                <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"/>
                            </svg>
                            {props.activityDetail.participantes}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-people-fill" viewBox="0 0 16 16" style={{marginLeft:`5px`}}>
                                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                            </svg>
                        </span>
                    </div>
                </div>
            </div>   
        </>
    )
}