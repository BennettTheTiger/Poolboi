const WaterTestView = (props) =>{

    return(
        <table className="table table-striped table-responsive">
            <h3>{props.bodyName}</h3>
            <thead style={{width:'100%'}}>
                <tr>
                <th scope="col-xs-3">Date</th>
                <th scope="col-xs-2">Alkalinity</th>
                <th scope="col-xs-1">cAcid</th>
                <th scope="col-xs-2">Chlorine</th>
                <th scope="col-xs-2">Free Chlorine</th>
                <th scope="col-xs-1">Hardness</th>
                <th scope="col-xs-1">PH</th>
                </tr>
            </thead>
            <tbody style={{width:'100%'}}>
                {
                    props.sample.map(sam =>{
                        console.dir(sam);
                        return(
                        <tr>
                            <td>{readableDate(sam.date)}</td>
                            <td>{sam.alkalinity}</td>
                            <td>{sam.cAcid}</td>
                            <td>{sam.chlorine}</td>
                            <td>{sam.freeChlorine}</td>
                            <td>{sam.hardness}</td>
                            <td>{sam.ph}</td>
                        </tr>
                        );
                    })
                }

            </tbody>
        </table>
    );
}