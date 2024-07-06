import { useState, useEffect } from "react";
import { Text } from 'react-native';


const Timer = (props) => {
    const [recordSeconds, setRecordSeconds] = useState(0);
    const [recordMinutes, setRecordMinutes] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setRecordSeconds(recordSeconds + 1);
            if (recordSeconds === 60) {
              setRecordMinutes(recordMinutes + 1)
              setRecordSeconds(0);
            }
          }, 1000);
        return () => clearInterval(interval);
    }, [recordSeconds])

    return <Text {...props}>{recordMinutes > 9 ? recordMinutes : `0${recordMinutes}`}:{recordSeconds > 9 ? recordSeconds : `0${recordSeconds}`}</Text>
};

export default Timer;
