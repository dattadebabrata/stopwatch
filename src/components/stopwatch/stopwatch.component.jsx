import {useState, useEffect} from "react"
import './stopwatch.style.css'

const Timer = () => {
    //Stopwatch states;
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [startTime, setStartTime] = useState(0);
    //Laps states;
    const [lapTime, setLapTime] = useState(0);
    const [startLapTime, setStartLapTime] = useState(0);
    const [lapsList, setLapsList] = useState([]);


    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                const elapsedTime = Date.now() - startTime;
                setTime(elapsedTime);

                const elapsedLapTime = Date.now() - startLapTime;
                setLapTime(elapsedLapTime);
                // console.log("duration", elapsedLapTime)
                // console.log("lap time", lapTime)
                // console.log("startLap time", startLapTime)
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isRunning, startTime, startLapTime]);

    const formatTime = (timeInMilliseconds) => {
        const ms = String(Math.floor(timeInMilliseconds % 1000)).padStart(3, '0').charAt(0);
        const seconds = String(Math.floor((timeInMilliseconds / 1000) % 60)).padStart(2, '0');
        const minutes = String(Math.floor((timeInMilliseconds / 1000 / 60) % 60)).padStart(2, '0');
        const hours = String(Math.floor((timeInMilliseconds / 1000 / 3600) % 24)).padStart(2, '0');
        // return `${hours}:${minutes}:${seconds}:${ms}`;
        return [hours, minutes, seconds, ms];
    };

    const handleStartPause = () => {
        if (isRunning) {
            setIsRunning(false);
            setTime(Date.now() - startTime);
            setLapTime(Date.now() - startLapTime)
        } else {
            setIsRunning(true);
            setStartTime(Date.now() - time);
            setStartLapTime(Date.now() - lapTime);
        }
    };

    const handleLapReset = () => {
        // Running=Lap|not running= Reset;
        setLapTime(0);
        setStartLapTime(Date.now() - 0);
        if (!isRunning) {
            setIsRunning(false);
            setTime(0);
        } else {
            console.log("LAP", formatTime(time)) // elapsed time;
            // console.log("duration inside function", formatTime(Date.now() - startLapTime)) //Duration;
            // console.log(new Date(Date.now()).toLocaleTimeString());
            // console.log(new Date(Date.now()).toLocaleTimeString('en-IN', {
            //     hour: 'numeric',
            //     minute: 'numeric',
            //     hour12: true
            // }));
            //
            // console.log(new Date(Date.now()).toLocaleDateString());

            const newLap = {
                lapTime: formatTime(Date.now() - startLapTime).join(':'),
                elapsedTime: formatTime(time).join(":"),
                date: new Date(Date.now()).toLocaleDateString(),
                time: new Date(Date.now()).toLocaleTimeString('en-IN', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                }),
            };
            setLapsList([...lapsList, newLap]);
        }

    };

    const handleClearLap = () => {
        setLapsList([]);
    }

    useEffect(()=>{
        if(time){
            window.document.title = formatTime(time).slice(0, 3).join(":")+" | Stopwatch";
        }else{
            window.document.title = "Stopwatch";
        }
    },[formatTime(time).slice(0, 3).join(":")]);


    return (
        <div>
            {/*Timer counter*/}
            <h2 className={"stopwatch-timer"}>
                {`${formatTime(time).slice(0, 3).join(":")}`}
                <span className={"stopwatch-miliseconds"}>{formatTime(time).slice(3)}</span>
            </h2>
            <h4 className={"lap-timer"}>
                {`${formatTime(lapTime).slice(0, 3).join(":")}`}
                <span className={"lap-miliseconds"}>{formatTime(lapTime).slice(3)}</span>
            </h4>
            <div className="button-container">
                <button
                    className={`${isRunning ? "pause-button" : time > 0 ? "continue-button" : "start-button"} button`}
                    onClick={handleStartPause}>
                    {isRunning ? 'Pause' : time > 0 ? "Continue" : 'Start'}
                </button>
                {time > 0 && <button className={`${isRunning ? "lap-button" : "reset-button"} button`}
                                     onClick={handleLapReset}>{isRunning ? 'Lap' : 'Reset'}</button>}
            </div>
            {
                lapsList.length > 0 &&
                <div>
                    <h2 className={"stopwatch-data-title"}>StopWatch Data</h2>
                    {/*table*/}
                    <table className={"lap-table"}>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Lap Time</th>
                            <th>Elapsed Time</th>
                            <th>Current Time</th>
                        </tr>
                        </thead>
                        <tbody>
                        {lapsList.map((lap, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{lap.lapTime}</td>
                                <td>{lap.elapsedTime}</td>
                                <td>{`${lap.date} - ${lap.time}`}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {/*Lap table*/}
                    <div className="button-container">
                        <button className={"clear-button button"} onClick={handleClearLap}>Clear Data</button>
                    </div>
                </div>
            }
        </div>
    );
}

export default Timer;