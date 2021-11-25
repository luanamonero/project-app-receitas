import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

function Explorar() {
  return (
    <div>
      <Header title="Explorar" />
      <Link to="/explorar/comidas">
        <button
          type="button"
          name="explore-food"
          data-testid="explore-food"
        >
          Explorar Comidas
        </button>
      </Link>
      <Link to="/explorar/bebidas">
        <button
          type="button"
          name="explore-drinks"
          data-testid="explore-drinks"
        >
          Explorar Bebidas
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default Explorar;
