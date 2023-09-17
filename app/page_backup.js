"use client";
import Image from 'next/image'
import styles from './page.module.css'
import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState, useEffect } from 'react';
import TextPrize from './textPrize.json'

export default function Home2() {
    const [list, setList] = useState([]);
    const [numberValue , setNumberValue] = useState()
    const [disabledInput, setDisabledInput] = useState(true)
    const arr = []
    
    const numberLottery = {
        onePrize : 'XX',
        sideOnePrize : ['XX','XX'], 
        twoPrize : ['XX','XX','XX'],
        lastTwoDigitPrize : ['XX','XX','XX','XX','XX','XX','XX','XX','XX','XX']
    }
    // const numberType = [
    //     {id: 1, type: 'รางวัลที่ 1', number: []},
    //     {id: 2, type: 'รางวัลที่ 2', number: []},
    //     {id: 3, type: 'รางวัลข้างเคียงรางวัลที่ 1', number: []},
    //     {id: 4, type: 'รางวัลเลขท้าย 2 ตัว', number: []},
    //   ];
    
    const randomLottery = () =>{
        //รางวัล 3 ตัว
        for (let i = 0; i < 4; i++) {
            var randNum = Math.floor(Math.random() * (1 - 10) + 10).toString().padStart(3, '0')
            arr.push(randNum)
            setList(arr);
        }
        const sideOnePrizeMin = (Number(arr[0]) - 1).toString().padStart(3, '0');
        const sideOnePrizeMax = (Number(arr[0]) + 1).toString().padStart(3, '0');
        arr.push(sideOnePrizeMin,sideOnePrizeMax)
        setList(arr);

        // รางวัล 2 ตัว
        for (let i = 0; i < 10; i++) {
            var randNum = Math.floor(Math.random() * (1 - 10) + 10).toString().padStart(2, '0')
            arr.push(randNum)
            setList(arr);
        }
        setDisabledInput(false)
    }
    const [checkResult, setCheckResult] = useState(false)
    const [displayResult, setDisplayResult] = useState([])
    const [displayText, setDisplayText] = useState([])
   
    const onNumberValue = (e) =>{
        setNumberValue(e.target.value.replace(/[^0-9-]/g, ''));
    }
    const submitResult = (e) =>{
        e.preventDefault();
        // if (list.includes(numberValue)) {
        //     setCheckResult(true)
        //     setDisplayResult(numberValue)
        //     setDisplayText('ถูกรางวัล');
        //     setNumberValue('')
        // }else{
        //     setCheckResult(false)
        //     setDisplayResult(numberValue)
        //     setDisplayText('เสียใจด้วยคุณไม่ถูกรางวัล');
        //     setNumberValue('')
        // }

        // console.log(numberValue.padStart(3, '0'));
        numberLottery.onePrize = list[0] 
        numberLottery.sideOnePrize = [
            list[4] ,
            list[5]
        ]
        numberLottery.twoPrize = [
            list[1] ,
            list[2],
            list[3]
        ]
        numberLottery.lastTwoDigitPrize = [
            list[6],
            list[7],
            list[8],
            list[9],
            list[10],
            list[11],
            list[12],
            list[13],
            list[14],
            list[15]
        ]

        var lab =["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16"];
        var data = [];

        for(var i=0; i<16; i++)  {
            data[i] = {};              
            data[i].id = lab[i];
            data[i].value = list[i];    
         }
        //  console.log(data);  
        //  data.forEach((element) => console.log(element));

        // console.log(numberType);
        // console.log(numberLottery.lastTwoDigitPrize);
        // console.log(numberValue);
        // numberLottery.onePrize.includes(numberValue.padStart(3, '0')) ||
        // numberLottery.sideOnePrize.includes(numberValue.padStart(3, '0')) ||
        // numberLottery.twoPrize.includes(numberValue.padStart(3, '0')) ||
        // numberLottery.lastTwoDigitPrize.includes(numberValue.padStart(3, '0'))
        // numberLottery.lastTwoDigitPrize.includes(numberValue.padStart(3, '0').replace(/^./, ""));

        // console.log(numberLottery.onePrize);
        // console.log(numberLottery.sideOnePrize);
        // console.log(numberLottery.twoPrize);
        // console.log(numberLottery.lastTwoDigitPrize);
        // console.log('enter :'+numberValue);

        // for (const key in numberLottery) {
        //     if (numberLottery.hasOwnProperty(key)) {
        //       console.log(`${key}: ${numberLottery[key]}`);
        //     //   console.log(`${numberLottery[key]}`);
        //     }
        //   }
        const arrId = []
        const arrText = []
        const arrResult = []
        console.log(numberValue.length);
        if (numberValue.length === 3) {
            arrResult.push(numberValue)
            arrResult.push(numberValue.slice(1,3));
        }else{
            arrResult.push(numberValue)
        }
        console.log(numberLottery.lastTwoDigitPrize);
        if (list.includes(numberValue) === false){
            setCheckResult(false)
            setDisplayText('เสียใจด้วยคุณไม่ถูกรางวัล');
        }
        data.find(function (element) {
            if (numberValue.length === 3) {
                if (element.value.includes(arrResult[0].padStart(3, '0'))){
                    arrId.push(Number(element.id))
                    // console.log(arrId);
                    setCheckResult(true)
                }
            }
            if (numberValue.length === 3) {
                if (numberLottery.lastTwoDigitPrize.includes(arrResult[1])){
                    arrId.push(Number(7))
                    setCheckResult(true)
                }
            }
        });
        numberLottery.lastTwoDigitPrize.find(function (element) {
            if (numberValue.length === 2) {
                if (element.includes(arrResult[0].padStart(2, '0'))){
                    arrId.push(Number(7))
                    setCheckResult(true)
                }
            }
        });
       
        
        for (let index = 0; index < arrId.length; index++) {
            const element = arrId[index];
            if (element in TextPrize) {
                const userData = TextPrize[element];
                arrText.push(userData.text)
                // console.log(arrText);
                let arrTextNew = [];
                arrText.forEach(element => {
                    if (!arrTextNew.includes(element)) {
                        arrTextNew.push(element);
                    }
                });
                // console.log(arrTextNew);
                setDisplayText(arrTextNew)
            } 
        }
        // if (arrId in TextPrize) {
        //     const userData = TextPrize[arrId];
        //     console.log(userData.text);
        // } 

        // if (data[0].value.includes(numberValue) && 
        // (data[1].value.includes(numberValue) || 
        // data[2].value.includes(numberValue) || 
        // data[3].value.includes(numberValue))) 
        // {
        //     setCheckResult(true)
        //     setDisplayText('ถูกรางวัลที่ 1 และรางวัลที่ 2');
        // }
        // else if (data[0].value.includes(numberValue)) {
        //     setCheckResult(true)
        //     setDisplayText('ถูกรางวัลที่ 1');
        // }
        // else if (numberLottery.sideOnePrize.includes(numberValue) && 
        //     numberLottery.twoPrize.includes(numberValue)) {
        //     setCheckResult(true)
        //     setDisplayText('ถูกรางวัลข้างเคียงรางวัลที่ 1 และรางวัลที่ 2');
        // }
        // else if (numberLottery.onePrize.includes(numberValue) && 
        //     numberLottery.lastTwoDigitPrize.includes(numberValue)) {
        //     setCheckResult(true)
        //     setDisplayText('ถูกรางวัลที่ 1 และรางวัลเลขท้าย 2 ตัว');
        // }
        // else if (numberLottery.sideOnePrize.includes(numberValue)) {
        //     setCheckResult(true)
        //     setDisplayText('ถูกรางวัลข้างเคียงรางวัลที่ 1');
        // }
        // else if (numberLottery.lastTwoDigitPrize.includes(numberValue) ) {
        //     setCheckResult(true)
        //     setDisplayText('ถูกรางวัลเลขท้าย 2 ตัว');
        // }
        // else if (numberLottery.twoPrize.includes(numberValue)) {
        //     setCheckResult(true)
        //     setDisplayText('ถูกรางวัลที่ 2');
        // }
        // else{   
        //     setCheckResult(false)
        //     setDisplayText('เสียใจด้วยคุณไม่ถูกรางวัล');
        // }
        
        // if (numberLottery.onePrize.includes(numberValue) && 
        //     numberLottery.twoPrize.includes(numberValue)) {
        //     setCheckResult(true)
        //     setDisplayText('ถูกรางวัลที่ 1 และรางวัลที่ 2');
        // }
        // else if (numberLottery.onePrize.includes(numberValue)) {
        //     setCheckResult(true)
        //     setDisplayText('ถูกรางวัลที่ 1');
        // }
        // else if (numberLottery.sideOnePrize.includes(numberValue) && 
        //     numberLottery.twoPrize.includes(numberValue)) {
        //     setCheckResult(true)
        //     setDisplayText('ถูกรางวัลข้างเคียงรางวัลที่ 1 และรางวัลที่ 2');
        // }
        // else if (numberLottery.onePrize.includes(numberValue) && 
        //     numberLottery.lastTwoDigitPrize.includes(numberValue)) {
        //     setCheckResult(true)
        //     setDisplayText('ถูกรางวัลที่ 1 และรางวัลเลขท้าย 2 ตัว');
        // }
        // else if (numberLottery.sideOnePrize.includes(numberValue)) {
        //     setCheckResult(true)
        //     setDisplayText('ถูกรางวัลข้างเคียงรางวัลที่ 1');
        // }
        // else if (numberLottery.lastTwoDigitPrize.includes(numberValue) ) {
        //     setCheckResult(true)
        //     setDisplayText('ถูกรางวัลเลขท้าย 2 ตัว');
        // }
        // else if (numberLottery.twoPrize.includes(numberValue)) {
        //     setCheckResult(true)
        //     setDisplayText('ถูกรางวัลที่ 2');
        // }
        // else{   
        //     setCheckResult(false)
        //     setDisplayText('เสียใจด้วยคุณไม่ถูกรางวัล');
        // }
        setDisplayResult(numberValue)
        setNumberValue('')

        // console.log(numberLottery.twoPrize);
        // switch (numberValue) {
        //     case numberLottery.twoPrize
        //     :
        //         setCheckResult(true)
        //         setDisplayResult(numberValue)
        //         setDisplayText('ถูกรางวัลที่ 1 ');
        //         setNumberValue('')
        //         break;
        //     // case value:
                
        //     //     break;
        //     // case value:
                
        //     //     break;
        
        //     default:
        //         setCheckResult(false)
        //         setDisplayResult(numberValue)
        //         setDisplayText('เสียใจด้วยคุณไม่ถูกรางวัล');
        //         setNumberValue('')
        //         break;
        // }
       
    }
    
    useEffect(() =>{
        // console.log(list);
        // numberLottery.onePrize = list[0];
        // console.log(numberLottery);
    },[])

   
    // useEffect(() =>{
    //     // You can take this value from user
    //     const n = 8
        
    //     // Initial empty array
    //     const arr = [];
    //     const arr2 = [];
        
    //     // Null check
    //     if (n == 0) {
    //         console.log(null)
    //     }
        
    //     do {
    //         // Generating random number
    //         const randomNumber = Math
    //             .floor(Math.random() * 10) + 1
        
    //         // Pushing into the array only
    //         // if the array does not contain it
    //         if (!arr.includes(randomNumber)) {
    //             arr.push(randomNumber);
    //             if (!arr2.includes(arr[0] - 1)) {
    //                 arr2.push(randomNumber, arr[0] - 1)
    //             }
    //         }
    //     }
    //     while (arr.length < n);
    //     console.log(arr)
    //     console.log(arr2)
        
    //     // Printing the array elements
    // },[])

    
    
    return (
        <div className='indexPage'>
            <Container>
                <div className='zoneBtnRandom'>
                    <p>ผลการออกรางวัลล็อตเตอร์รี่</p>
                    <Button className='btnRandom' onClick={randomLottery}>ดำเนินการสุ่มรางวัล</Button>
                </div>
                <div className='zoneLottery'>
                    <div className='onePrize'>
                        <div className='headerName'>
                            รางวัลที่ 1
                        </div>
                        <div className='resultPrize'>
                            {list.length == 0 ? 'XXX' : list[0]}
                        </div>
                    </div>
                    <div className='sideOnePrize'>
                        <div className='headerName'>
                            รางวัลข้างเคียงรางวัลที่ 1
                        </div>
                        <div className='resultPrize'>
                            <span>{list.length == 0 ? 'XXX' : list[4]}</span>
                            <hr />
                            <span>{list.length == 0 ? 'XXX' : list[5]}</span>
                        </div>
                    </div>
                    <div className='twoPrize'>
                        <div className='headerName'>
                            รางวัลที่ 2
                        </div>
                        <div className='resultPrize'>
                            <span>{list.length == 0 ? 'XXX' : list[1]}</span>
                            <hr />
                            <span>{list.length == 0 ? 'XXX' : list[2]}</span>
                            <hr />
                            <span>{list.length == 0 ? 'XXX' : list[3]}</span>
                        </div>
                    </div>
                </div>
                <div className='zoneLottery'>
                    <div className='lastTwoDigitPrize'>
                        <div className='headerName'>
                            รางวัลเลขท้าย 2 ตัว
                        </div>
                        <div className='resultPrize'>
                            <span>{list.length == 0 ? 'XX' : list[6]}</span>
                            <hr />
                            <span>{list.length == 0 ? 'XX' : list[7]}</span>
                            <hr />
                            <span>{list.length == 0 ? 'XX' : list[8]}</span>
                            <hr />
                            <span>{list.length == 0 ? 'XX' : list[9]}</span>
                            <hr />
                            <span>{list.length == 0 ? 'XX' : list[10]}</span>
                            <hr />
                            <span>{list.length == 0 ? 'XX' : list[11]}</span>
                            <hr />
                            <span>{list.length == 0 ? 'XX' : list[12]}</span>
                            <hr />
                            <span>{list.length == 0 ? 'XX' : list[13]}</span>
                            <hr />
                            <span>{list.length == 0 ? 'XX' : list[14]}</span>
                            <hr />
                            <span>{list.length == 0 ? 'XX' : list[15]}</span>
                        </div>
                    </div>
                </div>
                <div className='zoneResult'>
                    <div className='headerName'>
                        ตรวจรางวัลล็อตตอร์รี่ 
                    </div>
                    <div className='boxFormInput'>
                        <form onSubmit={submitResult}>
                            <InputGroup size="lg">
                                <InputGroup.Text id="inputGroup-sizing-lg">เลขล็อตเตอร์รี่ :</InputGroup.Text>
                                <Form.Control
                                value={numberValue}
                                name='number'
                                type='tel'
                                // pattern="[0-9]{10}"
                                minLength={2}
                                maxLength={3}
                                onChange={onNumberValue}
                                placeholder="กรอกเลขล็อตเตอร์รี่"
                                disabled={disabledInput}
                                required
                                />
                                <Button type="submit" variant="outline-secondary" id="button-addon1" disabled={disabledInput}>
                                    ตรวจรางวัล
                                </Button>
                            </InputGroup>
                        </form>
                    </div>
                    {checkResult === true ?
                        <div className='bg_correct'>
                            <p>ผลการตรวจสลากหมายเลข</p>
                            <span className='textResult'> {displayResult}</span>
                            <p className='textSub'>{displayText}</p>
                        </div>
                    :
                        <div className='bg_incorrect'>
                            <p>ผลการตรวจสลากหมายเลข</p>
                            <span className='textResult'> {displayResult}</span>
                            <p className='textSub'>{displayText}</p>
                        </div>
                    }   
                </div>
            </Container>
        </div>
    )
}
