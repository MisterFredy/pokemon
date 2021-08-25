// eslint-disable-next-line
import React, { useState } from 'react';
import { Modal, Button, Row, Col, Divider,message  } from 'antd';
import { useParams } from 'react-router-dom';
import Axios from "axios";
import { SearchOutlined } from '@ant-design/icons';

export default function DetailPokemon(props){
    let [data,setData] = React.useState();
    const [visible, setVisible] = React.useState(false);
    const [loadingData, setLoadingData] = React.useState(false);
    
   

    React.useEffect(() => {
   // console.log("masuk detail");
    //setVisible(true);
    pokemonDetail(props.dialogID);
    },[props]);


const fetchGraphQL = async(query, variables, operationName) => {
     setLoadingData(true)
     Axios.post("https://beta.pokeapi.co/graphql/v1beta",{query})
     .then(res => {
         setData(res.data.data.pokemon_v2_pokemon[0])
         setVisible(true);
         setLoadingData(false)
        }).catch(function(error) {
         //  console.log(error.response.status) // 401
          // console.log(error.response.data.error) //Please Authenticate or whatever returned from server
           setLoadingData(false)
        })
}

const pokemonDetail = async(id) => {
   const query = `
   query samplePokeAPIquery {
 pokemon_v2_pokemon(where: {id: {_eq: `+id+`}}) {
    name
    height
    id
    base_experience
    pokemon_v2_pokemonmoves(limit: 5 , where: {pokemon_id: {_eq: `+id+`}}) {
      level
      pokemon_v2_move {
        name
      }
    }
    pokemon_v2_pokemontypes(where: {pokemon_id: {_eq: `+id+`}}) {
      slot
      type_id
      pokemon_v2_type {
        name
      }
    }
  }
  }
  `
  

  return fetchGraphQL(
    query,
    {},
    "pokemon_v2_pokemon"
  )
}

const handleClosed = () => {
setData();  
setVisible(false); 
props.setDialogOpen(false);
}
    
const Movespokemon = () => {
   const moves = data.pokemon_v2_pokemonmoves.map((value) => (
            <>
              <p>
                {value.pokemon_v2_move.level}
              </p>
              <p>
                {value.pokemon_v2_move.name}
              </p> 
            </>
          ));
          return (
    <div>
        {moves}
    </div>
  );
}


const Typepokemon = () => {
  const type = data.pokemon_v2_pokemontypes.map((value) => (
              <p id={value.type_id}>
                {value.pokemon_v2_type.name}
            </p>
          ));
          return (
    <div>
        {type}
    </div>
  );
}


const handleCatch = () => {
  if(Math.random() > 0.5){
    message.success({
    content: 'Yo catch pokemon',
    className: 'custom-class',
    style: {
      marginTop: '20vh',
    },
  });
  }else{
      message.error({
    content: 'Failed catch pokemon please try again',
    className: 'custom-class',
    style: {
      marginTop: '20vh',
    },
  });
  }
}

    return (
    <>
      <Modal
        title={"pokemon detail"}
        centered
        closable={false}
        visible={visible}
         footer={[
            <Button key="back" onClick={handleClosed}>
              Return
            </Button>,
             <Button icon={<SearchOutlined />} onClick={handleCatch}>Catch</Button>,
          ]}
        width={512}
      >
       <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + props.dialogID+ ".png"} className="sprite" />
     <Divider>
        <h1 align={"center"}>{data !== undefined ? data.name : null}</h1>
     </Divider>  
        <Row>
        <Col span={12}>
          <h2>Type</h2>
          <Typepokemon/>
       </Col>
       <Col span={12}>
          <h2>Moves</h2>
          <Movespokemon/>
       </Col>
      </Row>


      </Modal>
    </>
  );


}