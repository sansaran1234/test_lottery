"use client";
import Image from 'next/image'
import styles from './page.module.css'
import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState, useEffect } from 'react';
import TextPrize from './textPrize.json'

export default function Home() {
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
    
    const randomLottery = () =>{
        //รางวัล 3 ตัว
        for (let i = 0; i < 4; i++) {
            var randNum = Math.floor(Math.random() * (1 - 1000) + 1000).toString().padStart(3, '0')
            arr.push(randNum)
            setList(arr);
        }
        const sideOnePrizeMin = (Number(arr[0]) - 1).toString().padStart(3, '0');
        const sideOnePrizeMax = (Number(arr[0]) + 1).toString().padStart(3, '0');
        arr.push(sideOnePrizeMin,sideOnePrizeMax)
        setList(arr);

        // รางวัล 2 ตัว
        for (let i = 0; i < 10; i++) {
            var randNum = Math.floor(Math.random() * (1 - 100) + 100).toString().padStart(2, '0')
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
        
        const arrId = []
        const arrText = []
        const arrResult = []
        if (numberValue.length === 3) {
            arrResult.push(numberValue)
            arrResult.push(numberValue.slice(1,3));
        }else{
            arrResult.push(numberValue)
        }
        if (list.includes(numberValue) === false){
            setCheckResult(false)
            setDisplayText('เสียใจด้วยคุณไม่ถูกรางวัล');
        }
        data.find(function (element) {
            if (numberValue.length === 3) {
                if (element.value.includes(arrResult[0].padStart(3, '0'))){
                    arrId.push(Number(element.id))
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
                let arrTextNew = [];
                arrText.forEach(element => {
                    if (!arrTextNew.includes(element)) {
                        arrTextNew.push(element);
                    }
                });
                setDisplayText(arrTextNew)
            } 
        }
        setDisplayResult(numberValue)
        setNumberValue('')
    }
    
    
    return (
        <div className='indexPage'>
            <Container>
                <div className='zoneBtnRandom'>
                    <p>ผลการออกรางวัลล็อตเตอร์รี่</p>
                    <Button className='btnRandom' onClick={randomLottery}>ดำเนินการสุ่มรางวัล</Button>
                </div>
                <div className='zoneLottery'>
                    <Row className='w-100 m-auto'>
                        <Col lg={3} md={6}>        
                            <div className='onePrize'>
                                <div className='headerName'>
                                    รางวัลที่ 1
                                </div>
                                <div className='resultPrize'>
                                    {list.length == 0 ? 'XXX' : list[0]}
                                </div>
                            </div>
                        </Col>
                        <Col lg={4} md={6}>
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
                        </Col>
                            
                        <Col lg={5} md={12}>
                            <div className='twoPrize'>
                                <div className='headerName'>
                                    รางวัลที่ 2
                                </div>
                                <div className='resultPrize'>
                                    <span>{list.length == 0 ? 'XXX' : list[1]}</span>
                                    <hr />
                                    <span>{list.length == 0 ? 'XXX' : list[2]}</span>
                                    <hr / >
                                    <span>{list.length == 0 ? 'XXX' : list[3]}</span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className='zoneLottery mt-3'>
                    <Row className='w-100 m-auto'>
                        <Col lg={12} md={12}>
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
                        </Col>
                    </Row>
                </div>
                <Row className='w-100 m-auto'>
                    <Col lg={12}>
                        <div className='zoneResult mt-3 px-0'>
                            <div className='headerName'>
                                ตรวจรางวัลล็อตเตอร์รี่ 
                            </div>
                            <div className='boxFormInput'>
                                <form onSubmit={submitResult}>
                                    <InputGroup size="lg">
                                        <InputGroup.Text id="inputGroup-sizing-lg" disabled={disabledInput}>เลขล็อตเตอร์รี่ :</InputGroup.Text>
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
                        </Col>
                    </Row>  
            </Container>
        </div>
    )
}
