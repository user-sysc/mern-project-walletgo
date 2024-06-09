import "../../styles/home.css";

function Home() {
  return (
    <div className="home-container">
      <section className="hero">
        <h1 className="hero-title">
          Bienvenido a Wallet<span className="go">GO</span>
        </h1>
        <p className="hero-description">
          WalletGO es una aplicación de gestión de ingresos y egresos
          personales. Te ayuda a llevar un control detallado de tus finanzas,
          permitiéndote registrar y categorizar tus ingresos y egresos, y
          proporcionándote una visión clara de tu situación financiera.
        </p>
      </section>
    </div>
  );
}

export default Home;
