// Uses the same styles as Product
import styles from "./Product.module.css";

import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function Product() {
  const navigate = useNavigate();
  return (
    <main className={styles.product}>
      <section>
        <div>
          <h2>
            Simple pricing.
            <br />
            Just $9/month.
          </h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel
            labore mollitia iusto. Recusandae quos provident, laboriosam fugit
            voluptatem iste.
          </p>
          <div>
            <Button type="back" onClick={() => navigate("/")}>
              Back to Homepage
            </Button>
          </div>
        </div>
        <img src="img-2.jpg" alt="overview of a large city with skyscrapers" />
      </section>
    </main>
  );
}
