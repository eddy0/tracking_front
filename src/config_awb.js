/*
air china
<form action="http://www.airchinacargo.com/en/search_order.php" method="post" class="jq-multi-form-185" name="trackform"
      target="_top">
    <input type="hidden" name="orders10" id="orders10" value="999">
    <input type="hidden" name="orders0" id="orders0" value="74472252">
    <input type="hidden" name="orders9" id="orders9" value="78oi">
    <input type="hidden" name="section" id="section" value="0-0001-0003-0081">
    <input id="add1" type="submit" value="ok" class="gua-button">

</form>
https://cargo.ana.co.jp/anaicoportal/portal/trackshipments?trkTxnValue=205-84489215

 */

import React from 'react'
import {Button} from 'antd'


const parse_awb = (prefix, body) => {
    const d = {
        '297': (
            <Button type={'primary'} htmlType={'button'}>
                <a target='_blank'
                   href={`https://cargo.china-airlines.com/CCNetv2/content/manage/ShipmentTracking.aspx?AwbPfx=297&AwbNum=${body}&checkcode=*7*upHGj`}>
                    click </a>
            </Button>),

        '205': (
            <Button type={'primary'} htmlType={'button'}>
                <a target='_blank'
                   href={`https://cargo.ana.co.jp/anaicoportal/portal/trackshipments?trkTxnValue=205-${body}`}> click</a>
            </Button>),
        '999':
            <form action={'http://www.airchinacargo.com/en/search_order.php'} method={'post'} target={'_blank'}>
                <input type="hidden" name="orders10" id="orders10" value={'999'}/>
                <input type="hidden" name="orders0" id="orders0" value={`${body}`}/>
                <input type="hidden" name="orders9" id="orders9" value="78oi"/>
                <input type="hidden" name="section" id="section" value="0-0001-0003-0081"/>
                <Button type={'primary'} id="add1" htmlType={'submit'}>click</Button>
            </form>
    }
    return d[prefix]
}

export {
    parse_awb,
}