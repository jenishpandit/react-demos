import React, { useState, useEffect } from 'react';
import { Input, Checkbox, Slider, InputNumber, Button, message, Radio, Tooltip, Progress } from 'antd';
import { CopyOutlined, ExclamationCircleOutlined, RetweetOutlined } from '@ant-design/icons';
import { RadioChangeEvent } from 'antd/lib/radio';

const Password: React.FC = () => {
    const [length, setLength] = useState<number | null>(1);
    const [password, setPassword] = useState<string>('');
    const [passwordStrength, setPasswordStrength] = useState<string>('Weak');
    const [selectedRadio, setSelectedRadio] = useState<string | undefined>('easyToSay');
    const [passwordStrengthColor, setPasswordStrengthColor] = useState<any>('#1890ff'); 


    const radioOptions: { [key: string]: string[] } = {
        easyToSay: ['uppercase', 'lowercase'],
        easyToRead: ['uppercase', 'lowercase'],
        allCharacters: ['uppercase', 'lowercase', 'number', 'symbol'],
    };

    const [checkboxOptions, setCheckboxOptions] = useState<string[]>(radioOptions[selectedRadio as string] || []);

    useEffect(() => {
        generatePassword();
    }, [length, checkboxOptions]);

    const handleLengthChange = (value: number | null) => {
        if (value !== null) {
            setLength(value);
        }
    };

    const handleRadioChange = (e: RadioChangeEvent) => {
        e.preventDefault();  
        const value = e.target.value as string;
        setSelectedRadio(value);
        setCheckboxOptions(radioOptions[value]);
    };

    const handleCheckboxChange = (checkedValues: string[]) => {
        setCheckboxOptions(checkedValues);
    };

    const generatePassword = () => {
        const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numberChars = '0123456789';
        const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

        let char = uppercaseChars;

        if (checkboxOptions.includes('uppercase')) {
            char += uppercaseChars;
        }
        if (checkboxOptions.includes('lowercase')) {
            char += lowercaseChars;
        }
        if (checkboxOptions.includes('number')) {
            char += numberChars;
        }
        if (checkboxOptions.includes('symbol')) {
            char += symbolChars;
        }

        let generatedPassword = '';
        for (let i = 0; i < (length as number); i++) {
            const randomIndex = Math.floor(Math.random() * char.length);
            generatedPassword += char[randomIndex];
        }

        setPassword(generatedPassword);
        PasswordStrength(generatedPassword);
    };

    const PasswordStrength = (generatedPassword: string) => {
        let strength = 'Weak';
        let color = 'blue'; 

        if (generatedPassword.length > 15) {
            strength = 'Medium';
            color = 'orange'; 
        }
       if(generatedPassword.length > 35){
           strength = 'Strong';
           color = 'green';
       }

        setPasswordStrength(strength);
        setPasswordStrengthColor(color);
    };

    const copyPassword = () => {
        navigator.clipboard.writeText(password);
        message.success('Password Copied');
    };

    
    return (
        <div className='background-color: rgb(255 247 237) min-h-screen'>
            <h1 className='text-center justify-center p-4 font-bold text-4xl ' style={{color:'blue '}}>Password Generator App</h1>
            <div className='flex items-center justify-center m-7 p-4 border rounded-lg shadow-md w-1/2' style={{ marginLeft: '350px' }}>
                <Input
                    className='border-none focus:ring-0 '
                    style={{ fontSize: '30px'}}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                        const psss = e.target.value;
                        setPassword(psss);
                        handleLengthChange(psss.length );
                    }}
                />
                <Tooltip title="copy">
                    <CopyOutlined className='text-lg ml-2 cursor-pointer' style={{ fontSize: '30px' }} onClick={copyPassword} />
                </Tooltip>
                <Tooltip title='Generate'>
                    <RetweetOutlined className='text-lg ml-2 cursor-pointer ' style={{ fontSize: '30px' }} onClick={generatePassword} />
                </Tooltip>
                
            </div>
            <div className="mt-4 font-bold" style={{ marginLeft: '400px' }}>
                <p className=''>Password Strength: {passwordStrength}</p>
                <Progress style={{width:'60%'}} percent={(password.length /50 )* 100}  showInfo={false} strokeColor={passwordStrengthColor} />
            </div>
            <div className='flex flex-col items-end m-7 p-4 border rounded-lg shadow-md w-1/2' style={{ marginLeft: '350px'  }}>
                <h1 className="text-2xl font-bold mb-4" style={{ marginRight: '400px' }}>Customize your password</h1>
                <div className="w-full border-t mt-2 mb-2"></div>
                <div className='flex items-center mt-4' style={{ marginRight: '500px' }}>
                    <span className='mr-5'>Password Length:</span>
                    <Slider
                        min={1}
                        max={50}
                        value={length as number}
                        onChange={handleLengthChange}
                        className='w-1/2 font-bold'
                    />
                    <InputNumber
                        min={1}
                        max={50}
                        value={length}
                        onChange={handleLengthChange}
                        className='ml-2 font-bold'
                    />
                </div>
                <div className='mt-4 flex flex-col font-bold ' style={{ marginRight: '200px', marginTop: '-30px' }}>
                    {Object.keys(radioOptions).map((option) => (
                        <div key={option}>
                            <Radio
                                value={option}
                                className="w-6 h-6"
                                onChange={handleRadioChange}
                                checked={selectedRadio === option}
                            />
                            <label style={{ marginRight: '27px' }}>{option}</label>
                            <Tooltip title={
                                option === 'easyToSay'  ? 'Avoid numbers and special characters'
                                    : option === 'allCharacters'
                                        ? 'Include all character combinations'
                                        : 'Include numbers and special characters'
                            }>
                                <ExclamationCircleOutlined style={{ fontSize: '20px' }} />
                            </Tooltip>
                        </div>
                    ))}
                </div>
                <div>
                    <Checkbox.Group
                        options={[
                            { label: 'Uppercase (A-Z)', value: 'uppercase' },
                            { label: 'Lowercase (a-z)', value: 'lowercase' },
                            { label: 'Number (0-9)', value: 'number', disabled: selectedRadio === 'easyToSay' },
                            { label: 'Symbol ($-#)', value: 'symbol', disabled: selectedRadio === 'easyToSay' },
                        ]}
                        onChange={handleCheckboxChange}
                        value={checkboxOptions}
                        className='mb-2 flex flex-col font-bold text-3xl'
                        style={{ marginLeft: '400px', marginTop: '-80px' }}
                    />
                </div>
            </div>
            <div className='flex justify-center mt-2  m-4'>
                <Button type="primary" onClick={generatePassword} style={{ backgroundColor: 'orange', color: 'white' }} className='mr-2'>
                    Generate Password
                </Button>
                <Button type="primary" onClick={copyPassword} style={{ backgroundColor: 'orange', color: 'white' }}>
                    Copy password
                </Button>
            </div>
        </div>
    );
};

export default Password;
