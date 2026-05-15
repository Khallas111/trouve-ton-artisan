const steps = [
  {
    number: "1",
    tone: "blue",
    title: "Choisir la categorie d'artisanat dans le menu",
    description:
      "Commencez par sélectionner la catégorie d’artisanat qui correspond à votre projet depuis le menu principal du site.",
  },
  {
    number: "2",
    tone: "sand",
    title: "Choisir un artisan",
    description:
      "Parcourez la liste des artisans disponibles dans la catégorie choisie et sélectionnez celui qui correspond le mieux à vos attentes.",
  },
  {
    number: "3",
    tone: "violet",
    title: "Le contacter via le formulaire de contact",
    description:
      "Une fois votre artisan choisi, utilisez le formulaire de contact disponible sur sa fiche pour lui envoyer votre demande en précisant votre besoin.",
  },
  {
    number: "4",
    tone: "coral",
    title: "Une réponse sera apportée sous 48h",
    description:
      "L’artisan prendra connaissance de votre demande et vous apportera une réponse dans un délai maximum de 48 heures.",
  },
];

function StepVisual({ number, tone }) {
  return (
    <div className={`step-visual step-visual--${tone}`} aria-hidden="true">
      <div className="step-visual__circle" />
      <div className="step-visual__card" />
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
            <StepVisual number={step.number} tone={step.tone} />
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
