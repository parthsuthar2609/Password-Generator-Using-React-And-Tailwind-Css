import { useState } from 'react';
import { useCallback } from 'react';
import './index.css';
import './App.css';
import { useEffect } from 'react';
import { useRef } from 'react';

function App() {
    const [length, setLength] = useState(8);
    const [number, setNumber] = useState(false);
    const [character, setCharacter] = useState(false);
    const [password, setPassword] = useState('');

    const passwordRef = useRef(null);

    const passwordGenerator = useCallback(() => {
        let pass = '';
        let string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

        if (number)
            string += '0123456789';

        if (character)
            string += '!@#$%^&*()_+}{[]?><.';

        for (let index = 0; index < length; index++) {
            let pwd = Math.floor(Math.random() * string.length);
            pass += string.charAt(pwd);
        }
        setPassword(pass);
    }, [length, number, character]);

    useEffect(() => {
        passwordGenerator()
    }, [length, passwordGenerator, number, character])

    const CopyToclip = useCallback(() => {
        passwordRef.current.select();
        window.navigator.clipboard.writeText(password);
    }, [password])

    return (
        <>
            <div className='bg-red-800 w-lg max-w-lg mx-auto shadow-md rounded-lg px-4 my-8 text-red-400 py-6'>
                <div className='flex shadow overflow-hidden max-w-5xl'>
                    <input
                        type='text'
                        value={password}
                        className='outline-none w-full py-1 px-3 rounded-non'
                        style={{ width: '400px' }}
                        placeholder='Password'
                        readOnly
                        ref={passwordRef}
                    />
                    <button onClick={CopyToclip}
                        className='bg-blue-700 px-4 py-1 flex overflow-none outline-non shrink-0 text-green-100 hover:bg-green-700'>
                        Copy
                    </button>
                </div>
                <div className='my-3 flex outline-none '>
                    <div className='c-blue gap-x-1'>
                        <input type='range'
                            min={6}
                            max={100}
                            value={length}
                            className='cursor-pointer text-blue '
                            onChange={(e) => { setLength(e.target.value) }}></input>
                        <label className='text-blue-100 ml-2 text-lg'>Length:{length}</label>
                    </div>
                    <div className='ml-1'>
                        <input type='checkbox'
                            value={length}
                            className='cursor-pointer text-blue ml-5'
                            name='Number'
                            id='numberInput'
                            defaultChecked={number}
                            onChange={() => {
                                setNumber((prev) => !(prev))
                            }}></input>

                        <lable className="pl-2 text-green-400 text-lg ">Number</lable>
                    </div>

                    <div className='ml-1'>
                        <input type='checkbox'
                            value={length}
                            className='cursor-pointer text-blue ml-5'
                            name='Number'
                            id='characterInput'
                            defaultChecked={character}
                            onChange={() => {
                                setCharacter((prev) => !(prev))
                            }}></input>

                        <lable className="pl-2 text-green-400 text-lg ">Character</lable>
                    </div>
                </div>
            </div>
        </>

    );
}

export default App;
