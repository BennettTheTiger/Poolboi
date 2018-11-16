
const MainView = (props) =>
{
    console.dir(props);
    let uvWarning; //Warn the user if the UV index is above 5
    if(props.weather.currently.uvIndex > 5) uvWarning =  'Better wear some sunscreen!' 
    return(
        <div>
            <p>The current temperature is {props.weather.currently.temperature}</p>
            <p>Feels like {props.weather.currently.apparentTemperature}</p>
            <p>The current UV index is {props.weather.currently.uvIndex}. {uvWarning}</p>
        </div>
    );
}




