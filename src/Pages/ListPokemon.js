// eslint-disable-next-line
import React from 'react'

import { Link } from 'react-router-dom'
import { List, Typography, Divider,Avatar,Spin  } from 'antd';
import Axios from "axios";
import { LoadingOutlined } from '@ant-design/icons';
import DetailPokemon from './DetailPokemon';

export default function ListPokemon() {
const [data,setData] = React.useState([]);
const [loadingData, setLoadingData] = React.useState(false);
const [dialogOpen,setDialogOpen] = React.useState(false);
const [dialogID,setdialogID] = React.useState(0);


React.useEffect(() => {
 fetchPokemon_details();
},[]);

const fetchGraphQL = async(query, variables, operationName) => {
     setLoadingData(true)
     Axios.post("https://beta.pokeapi.co/graphql/v1beta",{query})
     .then(res => {
         setData(res.data.data.pokemon_v2_pokemon)
         setLoadingData(false)
        }).catch(function(error) {
           setLoadingData(false)
        })
}

const fetchPokemon_details = async() => {
   const query = `
 query samplePokeAPIquery {
  pokemon_v2_pokemon {
    name
    pokemon_species_id
  }
}
  `
  

  return fetchGraphQL(
    query,
    {},
    "pokemon_v2_pokemon"
  )
}

  return (
    <>
     { dialogOpen && <DetailPokemon 
     dialogOpen={dialogOpen} 
     setDialogOpen={setDialogOpen}
     dialogID={dialogID}
     />}
    <Divider orientation="left">List Of Pokemon</Divider>
    <Spin spinning={loadingData} tip="Loading...">  
    <List
      size="large"
      itemLayout="horizontal"
      bordered
      dataSource={data}
      renderItem={item =>
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + item.pokemon_species_id + ".png"} />}
          title={<a onClick={()=>{setdialogID(item.pokemon_species_id);setDialogOpen(true);}} >{item.name}</a>}
        />
      </List.Item>
       } />
    </Spin>
  </>

  )

}