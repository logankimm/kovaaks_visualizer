import React, { useEffect, useReducer, useState } from 'react'
import { CSVUploader } from './CSVUploader'
import { TestGraph } from './TestGraph';

// import CounterComponent from './test.tsx';


// const asdf = {'test': {
//     test1: 'wefa',
//     test2: 'asdf'}}

type State = {
    [key: string]: any;
};

const reducer = (state: State, action: any): State => {
    switch(action.type) {
        // adding new scenario instance
        case 'add_instance':
            const updatedMap = new Map( [...state[action.scenario_name][action.scenario_date]]);
            updatedMap.set(action.key, action.value);

            // console.log('add instance map check', updatedMap, state[action.scenario_name][action.scenario_date])
            return { ...state,
                [action.scenario_name]: {
                    ...state[action.scenario_name],
                    [action.scenario_date]: updatedMap} }
        case 'check_path':
            // console.log('checking path')
            if (state[action.scenario_name] == undefined || state[action.scenario_name][action.scenario_date] == undefined) {
                return { ...state,
                    [action.scenario_name]: {
                        ...state[action.scenario_name],
                        [action.scenario_date]: new Map()} }
            }
            return state
        case 'date_average':
            // returns the average per date for a scenario
            const updatedState = { ...state }
            for (const name in state) {
                // console.log(`Product: ${name}`)
                let high: number = Number.NEGATIVE_INFINITY;
                let low: number = Number.POSITIVE_INFINITY;

                for (const date in state[name]) {
                    if (date !== 'high' && date !== 'low') {
                        // console.log(`Date: ${date}`);
                        let date_average: number = 0;
                        let count: number = 0;
    
                        const data_map: Map<string, number> = state[name][date];
                            data_map.forEach((value: number, key: string) => {
                                if (key !== "average") {
                                    date_average += value
                                    count++;
            
                                    high = Math.max(high, value)
                                    low = Math.min(low, value)
                                }
                            });
                            // append the average to the scenario
                            date_average = (date_average / count);
                            data_map.set("average", date_average)
                    }
                }
                updatedState[name].high = high;
                updatedState[name].low = low;
            }
            console.log(updatedState)
            return updatedState

        case 'add_map':
            console.log('adding new map/path')
            return { ...state,
                [action.scenario_name]: {
                    ...state[action.scenario_name],
                    [action.scenario_date]: new Map()} }

        case 'change_all':
            return action.value

        default: return state
    }
}

export const Home = () => {
    // updating the maps/creating a hashmap
    // const MapStateComponent = () => {
    //   const [mapState, setMapState] = useState(new Map());
    const [count, setCount] = useState(0);
    const [curr_scenario, set_curr_scenario] = useState("temp_scenario")

    const handleIncrement = () => {
      setCount(count + 1);
    };
  
    const [userData, dispatch] = useReducer(reducer, {})

//     addScenario();
// }, []);


    

    return (
        <div>
            {/* { typeof userData } */}
            {/* <br></br> */}
            {/* { JSON.stringify(userData) } */}
            {/* <CounterComponent /> */}
            {/* <button onClick={handleIncrement}>Increment</button> */}
            <h3>graph data</h3>
            {/* <GraphDisplay /> */}
            <h2>Sorted Dates:</h2>
            {/* <ul>
                {dateObjects.map(dateObject => (
                <li key={dateObject.key}>
                    {`${dateObject.key}: ${dateObject.date.toISOString()}`}
                </li>
                ))}
            </ul> */}
            <TestGraph chart_data={ userData } curr_scenario={ curr_scenario }/>
            <CSVUploader user_data={ userData } set_user_data={ dispatch } curr_scenario={curr_scenario} set_curr_scenario={set_curr_scenario}/>
            {/* <Asdf hmap={userData} page={pageNumber}/> */}
        </div>
    )
}