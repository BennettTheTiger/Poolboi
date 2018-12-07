const WaterTestView = (props) =>{
    return(
        <div>
        <h3 className="tableTitle">{props.bodyName}</h3>
        <a data-toggle="collapse" aria-expanded="false" aria-controls={props.bodyName} data-target={'#' + props.bodyName} role="button">
            <i id={'icon' + props.bodyName} className="eyeCon fas fa-eye-slash" onClick={() => {$('#icon' + props.bodyName).toggleClass('fa-eye-slash fa-eye')}}></i>
        </a>
        <hr/>
        <div className="collapse" id={props.bodyName}>
        <table className="table table-striped" >
            
            <thead style={{width:'100%'}}>
                <tr>
                <th className="col-xs-3">Date</th>
                <th className="col-xs-2">Alkalinity</th>
                <th className="col-xs-1">cAcid</th>
                <th className="col-xs-2">Chlorine</th>
                <th className="col-xs-2">Free Chlorine</th>
                <th className="col-xs-1">Hardness</th>
                <th className="col-xs-1">PH</th>
                </tr>
            </thead>
            <tbody className="tableBody">
            
                {
                    props.sample.map(sam =>{
                        return(
                        <tr>
                            <td className="col-xs-3">{readableDate(sam.date)}</td>
                            <td className="col-xs-2">{sam.alkalinity}</td>
                            <td className="col-xs-1">{sam.cAcid}</td>
                            <td className="col-xs-2">{sam.chlorine}</td>
                            <td className="col-xs-2">{sam.freeChlorine}</td>
                            <td className="col-xs-1">{sam.hardness}</td>
                            <td className="col-xs-1">{sam.ph}</td>
                        </tr>
                        );
                    })
                }
            </tbody>
        </table>
        </div>
        </div>
    );
}