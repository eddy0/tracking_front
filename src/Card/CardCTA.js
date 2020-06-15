import React from 'react';
import {Divider, Space} from "antd";
import {MessageOutlined, LikeOutlined, StarOutlined, UserOutlined} from '@ant-design/icons';


const IconText = ({icon, text}) => (
    <Space style={{display:"flex", alignItems:"center"}} onClick={() => console.log('ss')}  >
        <span style={{display:"flex", alignItems:"center"}}>{React.createElement(icon)}</span>
        {text}
    </Space>
);

function CardCTA(props) {
    return (
        <div style={{display:"flex", alignItems:"center"}}>
            <IconText icon={StarOutlined}  text="156" key="list-vertical-star-o"/>
            <Divider type={"vertical"} />
            <IconText icon={MessageOutlined} text="2" key="list-vertical-message"/>
        </div>
    );
}

export default CardCTA;