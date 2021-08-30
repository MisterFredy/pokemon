// eslint-disable-next-line
import React from 'react';

import { useParams } from 'react-router-dom';
import { PokemonContext } from "../Utility/PokemonContext";
import { Modal, Button, Row, Col, Divider,message,Form,Spin,Card,Meta  } from 'antd';


export default function MyPokemonList(props) {
const { MyPokemon, setMyPokemon } = React.useContext(PokemonContext);

const { Meta } = Card;


const Loaddata = () => {
  const pokemons =   MyPokemon.map((value) => (
            <>
            <Col sm={12} md={6}>
            <Card
                hoverable
                cover={<img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + value.idPokemon+ ".png"} className="sprite" />}
            >
                <Meta title={value.pokemonName} description={value.pokemonType} />
            </Card>
            </Col>
            </>
          ));

     return (
    <>
        {pokemons}
    </>
  );
}

return (

<>
<Row gutter={[16, 16]}>
  <Loaddata />
</Row>
</>

);

}