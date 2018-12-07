const WaterSlider = (props) => {

        return(
            <div className="form-group" >
                    <label for="waterName" className="sliderTitle">{props.title}:{props.default}</label>
                    <input type="range" 
                        min={props.min} 
                        max={props.max} 
                        step={props.step}  
                        className="form-control" 
                        onChange={props.updateParent} 
                        defaultValue={props.default}
                        name={props.dataId}
                        style={{background:props.gradient,'-webkit-appearance':'none',height:'25px',outline:'none'}}
                    />
            </div>
        );
}