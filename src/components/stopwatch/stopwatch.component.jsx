import {useState, useEffect} from "react";
import './stopwatch.style.css';
import Table from "../table/table.component";
import {formatTime} from "../../utils/timeFormat";
import {setLocalStorage,getLocalStorage,removeLocalStorage} from "../../utils/localStorage";


const Timer = () => {
    //Stopwatch states;
    const [time, setTime] = useState(getLocalStorage("time")||0);
    const [isRunning, setIsRunning] = useState(false);
    const [startTime, setStartTime] = useState(0);
    //Laps states;
    const [lapTime, setLapTime] = useState(getLocalStorage('lapTime')||0);
    const [startLapTime, setStartLapTime] = useState(0);
    const [lapsList, setLapsList] = useState(getLocalStorage('lapLists')||[]);


    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                const elapsedTime = Date.now() - startTime;
                setTime(elapsedTime);
                setLocalStorage('time', elapsedTime);

                const elapsedLapTime = Date.now() - startLapTime;
                setLapTime(elapsedLapTime);
                setLocalStorage('lapTime', elapsedLapTime);
                // console.log("duration", elapsedLapTime)
                // console.log("lap time", lapTime)
                // console.log("startLap time", startLapTime)
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isRunning, startTime, startLapTime]);

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
        removeLocalStorage('lapTime');
        setStartLapTime(Date.now() - 0);
        if (!isRunning) {
            setIsRunning(false);
            setTime(0);
            removeLocalStorage('time');
        } else {
            // console.log("LAP", formatTime(time)) // elapsed time;
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
                lapTime: `${formatTime(Date.now() - startLapTime).slice(0, 3).join(':')}.${formatTime(Date.now() - startLapTime).slice(3)}`,
                elapsedTime: `${formatTime(time).slice(0, 3).join(":")}.${formatTime(time).slice(3)}`,
                date: new Date(Date.now()).toLocaleDateString(),
                time: new Date(Date.now()).toLocaleTimeString('en-IN', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                }),
            };
            setLapsList([...lapsList, newLap]);
            setLocalStorage("lapLists",[...lapsList, newLap]);
        }

    };

    const handleClearLap = () => {
        setLapsList([]);
        removeLocalStorage('lapLists');
    }

    useEffect(() => {
        if (time) {
            window.document.title = formatTime(time).slice(0, 3).join(":") + " | Stopwatch";
        } else {
            window.document.title = "Stopwatch";
        }
    }, [formatTime(time).slice(0, 3).join(":")]);


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
                <button onClick={handleStartPause} className={`${isRunning || time>0?"hidden":""} start-button button`}>Start</button>
                <button onClick={handleStartPause} className={`${isRunning?"":"hidden"} pause-button button`}>Pause</button>
                <button onClick={handleStartPause} className={`${time>0 && !isRunning?"":"hidden"} continue-button button`}>Continue</button>
                <button onClick={handleLapReset} className={`${isRunning?"":"hidden"} lap-button button`}>Lap</button>
                <button onClick={handleLapReset} className={`${time>0 && !isRunning?"":"hidden"} reset-button button`}>Reset</button>
                {/*<button*/}
                {/*    className={`${isRunning ? "pause-button" : time > 0 ? "continue-button" : "start-button"} button`}*/}
                {/*    onClick={handleStartPause}>*/}
                {/*    {isRunning ? 'Pause' : time > 0 ? "Continue" : 'Start'}*/}
                {/*</button>*/}
                {/*{time > 0 && <button className={`${isRunning ? "lap-button" : "reset-button"} button`}*/}
                {/*                     onClick={handleLapReset}>{isRunning ? 'Lap' : 'Reset'}</button>}*/}
            </div>
            {
                lapsList.length > 0 &&
                <div>
                    <h2 className={"stopwatch-data-title"}>StopWatch Data</h2>
                    {/*table*/}
                    <Table lapsList={lapsList}/>
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