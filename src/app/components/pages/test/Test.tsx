import React from 'react';
import {contractTypesApi} from "../../lib/store/services/services";

const Test = () => {
    const {data: contractTypes,isLoading,refetch} = contractTypesApi.useFetchPostsQuery(0)
    console.log(contractTypes)

    return (
        <div>
            <button onClick={()=>refetch()}> обновить</button>
            {isLoading? 'загрузка...':
                contractTypes.map((post)=>(
                   <div style={{padding:'2rem'}}>
                       {post.title} - {post.id}
                   </div>
                ))
            }
        </div>
    );
};

export default Test;
