import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import React from 'react';


export default function AuthorsPanel(){

    const content = (<h1>Authors Panel</h1>);
    return (
        <>
            {content}
        </>
    );
}