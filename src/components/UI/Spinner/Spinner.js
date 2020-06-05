
import React from 'react';
import { Spinner } from "reactstrap";

const spinner = () => (
<div  style= {{textAlign: "center",position: "center"}}> 
    <Spinner color="secondary" style={{ width: '10rem', height: '10rem' , position: "center", textAlign: "center"}} />
</div>
);

export default spinner;