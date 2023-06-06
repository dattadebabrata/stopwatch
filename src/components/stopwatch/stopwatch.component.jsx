import {useState, useEffect} from "react"
import './stopwatch.style.css'

const Timer = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [LapData, setLapData] = useState([]);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                const elapsedTime = Date.now() - startTime;
                setTime(elapsedTime);
            }, 10);
        }
        return () => clearInterval(interval);
    }, [isRunning, startTime]);

    const formatTime = (timeInMilliseconds) => {
        const ms = String(Math.floor(timeInMilliseconds % 1000)).padStart(3, '0').charAt(0);
        const seconds = String(Math.floor((timeInMilliseconds / 1000) % 60)).padStart(2, '0');
        const minutes = String(Math.floor((timeInMilliseconds / 1000 / 60) % 60)).padStart(2, '0');
        const hours = String(Math.floor((timeInMilliseconds / 1000 / 3600) % 24)).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}:${ms}`;
    };

    const handleStartPause = () => {
        if (isRunning) {
            setIsRunning(false);
            setTime(Date.now() - startTime);
        } else {
            setIsRunning(true);
            setStartTime(Date.now() - time);
        }
    };

    const handleLapReset = () => {
        if (!isRunning) {
            setIsRunning(false);
            setTime(0);
        } else {
            console.log("LAP")
        }
    };


    return (
        <div>
            <h1>Stopwatch</h1>
            {/*Timer counter*/}
            <h2>{formatTime(time)}</h2>
            <div className="button-container">
                <button onClick={handleStartPause}>{isRunning ? 'Pause' : 'Start'}</button>
                {time > 0 && <button onClick={handleLapReset}>{isRunning ? 'Lap' : 'Reset'}</button>}
            </div>
        </div>
    );
}

export default Timer;