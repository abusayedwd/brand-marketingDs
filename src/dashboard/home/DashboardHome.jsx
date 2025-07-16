import React from 'react';
import Card from './Card';
import Barchart from './Barchart';
import Transaction from './Transaction';
 
 
 

const DashboardHome = () => {
 
    return (
        <div>
            <Card> </Card>
            <Barchart />
            <Transaction />
        </div>
    );
};

export default DashboardHome;