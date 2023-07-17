import GlobalHeroFilter from '../common/GlobalHeroFilter';

const Hero = () => {
  return (
    <section className="home-six home6-overlay">
      <div className="container">
        <div className="row posr">
          <div className="col-lg-12">
            <div className="home_content home6">
              <div className="home-text home6 text-center">
                <h2 className="fz55">
                  Bucurați-vă de cele mai bune case și apartamente
                </h2>
                <p className="fz18">De la chirie până la vânzare</p>
              </div>
              <GlobalHeroFilter className="home6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
