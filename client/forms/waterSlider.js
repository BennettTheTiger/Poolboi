const WaterSlider = (props) => {

        return(
            <div className="form-group" >
                    <label for="waterName">{props.title}:{props.default}</label>
                    <input type="range" 
                        min={props.min} 
                        max={props.max} 
                        step={props.step}  
                        className="form-control" 
                        onChange={props.updateParent} 
                        defaultValue={props.default}
                        name={props.dataId}
                    />
            </div>
        );
}