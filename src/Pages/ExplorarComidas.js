import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import ReceitasContext from '../Context/ReceitasContext';
import { randomFood } from '../helper/helper';

function ExplorarComidas() {
  const { getRandom, dataRandom } = useContext(ReceitasContext);
  const history = useHistory();

  useEffect(() => { getRandom(randomFood); }, []);

  const handleClick = (path) => {
    history.push(path);
  };

  return (
    <section>
      <Header title="Explorar Comidas" />
      <section>
        <button
          data-testid="explore-by-ingredient"
          type="button"
          onClick={ () => handleClick('/explorar/comidas/ingredientes') }
        >
          Por Ingredientes
        </button>
        <button
          data-testid="explore-by-area"
          type="button"
          onClick={ () => handleClick('/explorar/comidas/area') }
        >
          Por Local de Origem
        </button>
        <button
          data-testid="explore-surprise"
          type="button"
          onClick={ () => handleClick(`/comidas/${dataRandom.meals[0].idMeal}`) }
        >
          Me Surpreenda!
        </button>
      </section>
      <Footer />
    </section>
  );
}

export default ExplorarComidas;
