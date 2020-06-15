import React from 'react';
import {Button} from "antd";
import CardList from "./CardList";

function Card(props) {
    return (
        <main className={'main'}>
            <div className="main-container">
                <CardList  />
            </div>
        </main>
    );
}

export default Card;