import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <>
      <main className={clsx(styles.contenedor_principal)}>
        <img src="img/Zapato.svg" className={clsx(styles.zapato)} />
        <img src="img/Zapato3.svg" className={clsx(styles.zapato3)} />
        <img src="img/Zapato4.svg" className={clsx(styles.zapato4)} />
        <section className={clsx(styles.contenedor_descripcion)}>
          <img src="img/Zapato2.svg" className={clsx(styles.zapato2)} />
          <h1>{siteConfig.title}</h1>
          <p>
            Juanito Shoes es una para empresa dedicada a la venta de calzado. La
            aplicación está centrada en el cliente y permite a los usuarios
            realizar pedidos de manera fácil y eficiente.
          </p>
          <div className={clsx(styles.contenedor_botones)}>
            <Link href="./docs/intro" className={clsx(styles.empezar)}>
              Empezar
            </Link>
            <Link href="https://github.com/osmarmora05/juanito_shoes_MobileApp" className={clsx(styles.github)}>
              Ver Github
            </Link>
          </div>
        </section>
        <picture className={clsx(styles.contenedor_imagen)}>
          <img src="img/Web.png" className={clsx(styles.background_web)} />
          <img
            src="img/Telefono.svg"
            className={clsx(styles.background_telefono)}
          />
        </picture>
      </main>
    </>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      description="Juanito Shoes es una empresa dedicada a la venta de calzadoJuanito Shoes es una para empresa dedicada a la venta de calzado. La aplicación está centrada en el cliente y permite a los usuarios realizar pedidos de manera fácil y eficiente.

"
    >
      <HomepageHeader />
    </Layout>
  );
}
