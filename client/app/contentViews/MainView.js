
const MainView = (props) =>
{
    console.dir(props);
    return(
        <div>
            <p>The current temperature is {props.weather.currently.temperature}</p>
            <p>Feels like {props.weather.currently.apparentTemperature}</p>
        </div>
    );
}




