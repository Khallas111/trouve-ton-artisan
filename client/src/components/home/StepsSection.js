import artisanIllustration from "../../assets/illustrations/Artisan.jpg";
import choisirIllustration from "../../assets/illustrations/Choisir.jpg";
import contactIllustration from "../../assets/illustrations/Contact.jpg";
import reponseIllustration from "../../assets/illustrations/Réponse.png";

const steps = [
  {
    number: "1",
    tone: "blue",
    image: choisirIllustration,
    imageAlt: "Illustration de selection d'une categorie",
    imagePosition: "center 28%",
    title: "Choisir la categorie d'artisanat dans le menu",
    description:
      "Commencez par selectionner la categorie d'artisanat qui correspond a votre projet depuis le menu principal du site.",
  },
  {
    number: "2",
    tone: "sand",
    image: artisanIllustration,
    imageAlt: "Illustration de selection d'un artisan",
    imagePosition: "center 24%",
    title: "Choisir un artisan",
    description:
      "Parcourez la liste des artisans disponibles dans la categorie choisie et selectionnez celui qui correspond le mieux a vos attentes.",
  },
  {
    number: "3",
    tone: "violet",
    image: contactIllustration,
    imageAlt: "Illustration d'une prise de contact",
    imagePosition: "center 22%",
    title: "Le contacter via le formulaire de contact",
    description:
      "Une fois votre artisan choisi, utilisez le formulaire de contact disponible sur sa fiche pour lui envoyer votre demande en precisant votre besoin.",
  },
  {
    number: "4",
    tone: "coral",
    image: reponseIllustration,
    imageAlt: "Illustration d'une reponse sous 48 heures",
    imagePosition: "center 26%",
    title: "Une reponse sera apportee sous 48h",
    description:
      "L'artisan prendra connaissance de votre demande et vous apportera une reponse dans un delai maximum de 48 heures.",
  },
];

function StepVisual({ number, tone, image, imageAlt, imagePosition }) {
  return (
    <div className={`step-visual step-visual--${tone}`}>
      <img
        src={image}
        alt={imageAlt}
        loading="lazy"
        style={{ objectPosition: imagePosition }}
      />
      <div className="step-visual__overlay" />
      <span>{number}</span>
    </div>
  );
}

export default function StepsSection() {
  return (
    <section className="steps-section">
      <div className="section-heading">
        <span className="section-marker section-marker--green" />
        <h2>Comment trouver mon artisan?</h2>
      </div>

      <p className="section-copy">
        Trouver l&apos;artisan qui correspond a votre besoin se fait en quelques
        etapes simples :
      </p>

      <div className="steps-grid">
        {steps.map((step) => (
          <article className="step-card" key={step.number}>
            <StepVisual
              number={step.number}
              tone={step.tone}
              image={step.image}
              imageAlt={step.imageAlt}
              imagePosition={step.imagePosition}
            />
            <h3>
              {step.number}. {step.title}
            </h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
