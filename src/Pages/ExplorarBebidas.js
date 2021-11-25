import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import ReceitasContext from '../Context/ReceitasContext';
import { randomDrink } from '../helper/helper';

function ExplorarBebidas() {
  const { getRandom, dataRandom } = useContext(ReceitasContext);
  const history = useHistory();

  useEffect(() => { getRandom(randomDrink); }, []);

  const handleClick = (path) => {
    history.push(path);
  };
  return (
    <section>
      <Header title="Explorar Bebidas" />
      <section>
        <button
          data-testid="explore-by-ingredient"
          type="button"
          onClick={ () => handleClick('/explorar/bebidas/ingredientes') }
        >
          Por Ingredientes
        </button>
        <button
          data-testid="explore-surprise"
          type="button"
          onClick={ () => handleClick(`/bebidas/${dataRandom.drinks[0].idDrink}`) }
        >
          Me Surpreenda!
        </button>
      </section>
      <Footer />
    </section>
  );
}

export default ExplorarBebidas;
