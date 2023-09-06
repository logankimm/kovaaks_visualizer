import React, { useEffect, useState } from 'react'
import Papa from 'papaparse'

// scenario -> tuple/array with key, value

interface UserScenario {
    scenario_average: number;
    scenario_high: number;
    // allowing multiple scenarios to be entered
    [key: string]: any
}

type scenario_data = [string, number]

interface DateScenario{
    daily_average: number;
    scenario_instance?: scenario_data;
}

interface UserPlaylist {
    PlaylistScenarios?: Set<UserScenario>;
}

type CSV_props = {
    user_data: any;
    set_user_data: any;
    curr_scenario:any;
    set_curr_scenario: any;
}

export const CSVUploader = (props: CSV_props) => { 
    // const [data, setData] = useState([]);
    // const [ca, setCA] = useState([]);
    // const [values, setValues] = useState([]);
    const { user_data, set_user_data, curr_scenario, set_curr_scenario } = props

    const [test, setTest] = useState({});
    const [scenarioArray, setScenarioArray] = useState([])
    const [file_count, set_file_count] = useState(0)
    const [curr_file_number, set_curr_file_number] = useState(0)

    // useEffect(() => {
    //     console.log('updated state', user_data)
    // }, [test])

    // console.log('before', curr_file_number)
    // calculate averages, scenario highs and lows after every file has been parsed
    useEffect(() => {
        if (curr_file_number == file_count) {
            console.log('done parsing results', file_count, curr_file_number)
            set_user_data({ type: 'date_average', test: 'aoisjdfpoijwe'})
        }
    }, [curr_file_number])

    const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        let file_objects = event.target.files;
        if (!file_objects) return;

        const file_list = Array.from(file_objects);

        // add max number of files to the current file count
        set_file_count(prev => prev + Object.keys(file_list).length);

        for (let curr_file of file_list) {
            Papa.parse(curr_file, {
                // delimiter: "score:",
                newline: "\n",
                header: true,
                skipEmptyLines: true,
                complete: function(results, file) {
                    try {
                        const score_object: any = results.data[Object.keys(results.data).length - 23]
                        const curr_scenario_score = parseFloat(score_object["Timestamp"])

                        // obtain scenario name, date, and timestamp
                        const file_name_split = file.name.split(" - ")
                        const curr_scenario_name = file_name_split[0]
                        const [curr_date_string, curr_scenario_time] = file_name_split[2].slice(0, -10).split("-")
                                
                        const dateComponents: string[] = curr_date_string.split(".");
                        const year: number = parseInt(dateComponents[0]);
                        const month: number = parseInt(dateComponents[1]) - 1; // Months are zero-based
                        const day: number = parseInt(dateComponents[2]);
                        
                        const curr_scenario_date : Date = new Date(year, month, day);
                        // console.log('formate string', formattedDate.toLocaleDateString())
                        // const curr_scenario_date = `${formattedDate.getMonth() + 1}/${formattedDate.getDate()}/${formattedDate.getFullYear() % 100}`;
                        console.log('type date', typeof curr_scenario_date, curr_scenario_date)

                        set_user_data({ type: 'check_path', scenario_name: curr_scenario_name, scenario_date: curr_scenario_date })
                        set_user_data({ type: 'add_instance', scenario_name: curr_scenario_name, scenario_date: curr_scenario_date, key: curr_scenario_time, value: curr_scenario_score })
                        set_curr_file_number(prev => prev + 1)
                    } catch (error) {
                        console.error(error)
                    }
                }
            })
        };



        // after everything is uploaded - sort by date? - needed to find index and iterate through
        // event.target.files.foreach(
        //     Papa.parse(file, {
        //         header: true,
        //         skipEmptyLines: true,
        //         complete: function() {
        //             console.log('finished loading')
        //         }
        //     })
        // )
            // complete: function(results, files) {
            //     console.log(files)
                // console.log(results[0])
                // console.log(Object.keys(result.data))
                // setTest({name: 'asdf'})
                // const ca = [];
                // const va = [];

                // result.data.map(d => {
                //     ca.push(Object.keys(d));
                //     va.push(Object.values(d))
                // })
                
                // setTest(result);
                // setData(result.data);
                // setCA(ca[0])
                // setValues(va)
            // }
        // })
        // console.log('testing async')
    }
    // length of keynubmers = 127
    // important key = 125
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedKey = event.target.value;
        set_curr_scenario(selectedKey);
    };
    

    return (
        <div>
            <input type='file' name='file' multiple accept='.csv' onChange={handleFile}></input>
            {/* <div>
                {test.data && Object.keys(test.data).map(k => <div>{k}</div>)}
            </div> */}
            
            <h2>Select a Property:</h2>
            <select onChange={handleSelectChange}>
                <option value="">Select a property</option>
                {Object.keys(user_data).map((key) => (
                    <option key={key} value={key}>
                        {key}
                    </option>
                ))}
            </select>
            {curr_scenario && (
                <div>
                <h3>Selected Property: {curr_scenario}</h3>
                <pre>{JSON.stringify(user_data[curr_scenario], null, 2)}</pre>
                </div>
            )}

            <div>
                {/* {Object.keys(user_data)} */}
                {/* {test.name} */}
                {/* {[...user_data.keys()].map(k => (
                    <p key={k}>{user_data.get(k)}</p>
                ))} */}
                <pre>
                    {Object.keys(user_data).map(scenario => <p key={scenario}>{scenario}</p>)}
                    {/* {JSON.stringify(user_data)} */}
                    {/* {test && JSON.stringify(test, null, 2)} */}
                </pre>
            </div>
            <div>
                {/* {Object.keys(user_data)} */}
            </div>
            {/* <br /> */}
            {/* <div><pre>{JSON.stringify(test.data, null, 2) }</pre></div> */}
            {/* <div>
                <prettify>
                    {JSON.stringify(test)}
                </prettify>
            </div> */}
                
            {/* <table>
                <thead>
                    <tr>
                        {ca.map((col, i) => <th key={i}>{col}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {values.map((v, i) => (
                        <tr key={i}>
                            {v.map((value, i) => <td key={i}>{value}</td>)}
                        </tr>
                    ))}
                </tbody>
            </table> */}
        </div>
    )
}