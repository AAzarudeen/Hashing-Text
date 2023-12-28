import React, { useEffect, useState } from 'react';
import { MD5,SHA1, SHA384, SHA256, SHA512 } from 'crypto-js';
import './hashing.css';
import { database, user } from '../firebase-config'
import { getFirestore, setDoc, doc, Timestamp, collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
// import Saved from './saved';

export default function HashingForm(probs) {


    const navigate = useNavigate()

    const [algorithms] = useState(['sha1', 'sha256', 'sha384', 'sha512']);
    let [text_input, setTextInput] = useState('');
    let [file_input, setFileInput] = useState('');
    let [algorithm, setAlgorithm] = useState('sha1');
    let [output, setOutput] = useState('');


    const handleTextInput =  (e) => {

        setFileInput(null)

        let value = e.target.value;

        let result = '';

        if (algorithm == 'sha1') {
            result = SHA1(value).toString()
        }else if (algorithm == 'sha256') {
            result = SHA256(value).toString()
        } else if (algorithm == 'sha384') {
            result = SHA384(value).toString()
        } else if (algorithm == 'sha512') {
            result = SHA384(value).toString()
        }

        if (value === '') {
            result = ''
        }

        setOutput(result);

        setTextInput(value);
    }

    const handleFileInput = (e) => {

        setTextInput('')

        const fr = new FileReader();

        fr.onload =  () => {

            let result = '';

            if (algorithm == 'sha1') {
                result = SHA1(fr.result).toString();
            } else if (algorithm == 'sha256') {
                result = SHA256(fr.result).toString();
            } else if (algorithm == 'sha384') {
                result = SHA384(fr.result).toString();
            } else if (algorithm == 'sha512') {
                result = SHA512(fr.result).toString();
            }

            setOutput(result);

            setFileInput(fr.result);
        }

        fr.readAsText(e.target.files[0]);
    }

    const handleAlgorithmChange =  (e) => {

        let value = e.target.value;

        let result = '';

        if (text_input) {

            if (value == 'sha1') {
                result = SHA1(text_input).toString();
            } else if (value == 'sha256') {
                result = SHA256(text_input).toString();
            }
            else if (value == 'sha384') {
                result = SHA384(text_input).toString();
            }
            else if (value == 'sha512') {
                result = SHA512(text_input).toString();
            }

        }

        if (file_input) {

            if (value == 'sha1') {
                result = SHA1(file_input).toString();
            } else if (value == 'sha256') {
                result = SHA256(file_input).toString();
            } else if (value == 'sha384') {
                result = SHA384(file_input).toString();
            } else if (value == 'sha512') {
                result = SHA512(file_input).toString();
            }
        }

        setAlgorithm(value);

        setOutput(result);
    }

    const handleSave = async (e) => {
        await setDoc(doc(database, "data", (new Date().toISOString() + probs.uid)), {
            uid: probs.uid,
            input: text_input,
            hash: output,
            algo: algorithm
        }).then(()=>{
            alert("saved")
        });
    }

    return (
        <div className='hashing-container'>
            <div className='hashing-content'>
                <div className="hashing-form">
                    <h4 className="hashing-form-heading">Input</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="text-input">Text</label>
                            <input type="text" className="form-control" id="text-input" placeholder='Write some text' value={text_input} onChange={handleTextInput} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="file-input">File Input</label>
                            <input type="file" className="form-control" id="file-input" onChange={handleFileInput} />
                        </div>
                    </form>
                </div>

                <div className="hashing-algorithms">
                    <h4 className="hashing-algorithms-heading">Algorithms</h4>
                    <div className="hashing-algorithms-list">
                        {
                            algorithms.map(algo => {
                                return (
                                    <div className="form-check" key={algo}>
                                        <input className="form-check-input" type="radio" name="algorithm" id={algo} value={algo} checked={algorithm === algo} onChange={handleAlgorithmChange} />
                                        <label className="form-check-label" htmlFor={algo}>
                                            {algo}
                                        </label>
                                    </div>
                                )
                            }
                            )}
                    </div>
                </div>

                <div className="hashed-output">
                    <h4 className="hashed-algorithm-heading">Output</h4>
                    <div className="hashed-algorithm-container">
                        <p className="hashed-algorithm-text">
                            {output}
                        </p>
                    </div>
                    <div>
                        <button onClick={handleSave}>
                            Save
                        </button>
                        <button onClick={(e)=>{
                            navigate("/saved",{state:{'uid':probs.uid}})
                        }}>
                            Show Saved
                        </button>
                    </div>
                </div>
                {/* <Saved data={}/> */}
            </div>
        </div>
    );
}