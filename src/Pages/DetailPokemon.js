// eslint-disable-next-line
import React, { useState } from 'react';
import { Modal, Button, Row, Col, Divider,message,Form,Spin  } from 'antd';
import { useParams } from 'react-router-dom';
import Axios from "axios";
import { CheckSquareOutlined,QqOutlined } from '@ant-design/icons';
import { Field, Label, Input } from '@zendeskgarden/react-forms';
import { PokemonContext } from "../Utility/PokemonContext";

export default function DetailPokemon(props){
    const { MyPokemon, setMyPokemon } = React.useContext(PokemonContext);
    let [data,setData] = React.useState();

    const [visible, setVisible] = React.useState(false);
    const [loadingData, setLoadingData] = React.useState(false);
    const [ModalName,setModalName] = React.useState(false);
    const [namePokemon,setNamePokemon] = React.useState("");
    
   

    React.useEffect(() => {
    //console.log("masuk detail");
    pokemonDetail(props.dialogID);
    setVisible(true);
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
  setLoadingData(true)
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
setVisible(false); 
setData();  
props.setDialogOpen(false);
}
    
const Movespokemon = () => {
    if(data){
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
  return(null)
}


const Typepokemon = () => {
  if(data){
     const type = data.pokemon_v2_pokemontypes.map((value) => (
              <p id={value.type_id}>
                {value.pokemon_v2_type.name}
              </p>
          ));
          return (
    <>
        {type}
    </>
  );
  }
  return(null)
}


const handleCatch = () => {
  if(Math.random() > 0.5){
    setModalName(true);
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

const handleSubmit = () => {
//console.log(namePokemon)
if(MyPokemon.some(values => namePokemon === values.pokemonName)){
  message.error({
    content: "your name already taken",
    className: 'custom-class',
    style: {
      marginTop: '20vh',
    },
  });
}else{
setMyPokemon([...MyPokemon, {pokemonName: namePokemon, idPokemon:props.dialogID, pokemonType: data.name} ])
message.success({
    content: namePokemon+' has been added to My Pokemon',
    className: 'custom-class',
    style: {
      marginTop: '20vh',
    },
  });
setNamePokemon(""); 
setModalName(false)
}

}

const handleBack = () =>{setNamePokemon(""); setModalName(false)}

    return (
    <>
   
      <Modal
        title={"pokemon detail"}
        centered
        closable={false}
        visible={visible}
         footer={ModalName ? [
              <Button key="back" onClick={handleBack}>
              back
            </Button>,
             <Button icon={<CheckSquareOutlined />} onClick={handleSubmit}>Submit</Button>,] : [
            <Button icon={<QqOutlined />} onClick={handleCatch}>Catch</Button>,
            <Button key="back" onClick={handleClosed}>
              Closed
            </Button>,
          ]}
        width={512}
      > 
       <Spin spinning={loadingData} tip="Loading...">  
       <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + props.dialogID+ ".png"} className="sprite" />
     <Divider>
        <h1 align={"center"}>{data !== undefined ? data.name : null}</h1>
     </Divider> 

     { ModalName ?
     <>
     <h3 align={"center"}>your pokemon name</h3>
     <Input value={namePokemon} onChange={event =>
                 setNamePokemon(event.target.value)
                  } /> 
                  </>
      :
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
      } 
       </Spin>
      </Modal>
     
    </>
  );


}