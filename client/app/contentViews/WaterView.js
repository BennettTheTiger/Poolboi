const WaterView = (props) =>
{
    return(
        <div>
            <section>
                <h2>My Water</h2>
                <div className="row"> 
                    <WaterBodyView/>
                    <WaterBodyView/>
                    <WaterBodyView/>
                    <PlusIcon size="col-sm-4"/>
                    
                </div>
            </section>
            <section>
                <h2>Results</h2>
            </section>
        </div>
    );
}


