import React from "react";

const TermsAndConditions: React.FC = () => {
  return (
    <main
      className="w-full bg-white text-[#111]"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {/* Contenedor */}
      <section className="mx-auto w-full" style={{ maxWidth: 1100 }}>
        {/* Header minimal */}
        <div className="px-6 md:px-10 pt-10 md:pt-14">
          <p className="text-sm tracking-wide uppercase text-[#444]">
            Blank
          </p>

          <h1 className="mt-2 text-3xl md:text-5xl font-semibold leading-tight">
            Términos y Condiciones
          </h1>
          {/* Divider */}
          <div className="mt-8 h-[1px] w-full bg-[#E7E7E7]" />
        </div>

        {/* Body */}
        <div className="px-6 md:px-10 py-10 md:py-14">
          {/* Tarjeta estilo “paper” minimal */}
          <article className="bg-transparent p-6 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            {/* Sección A */}
            <section className="mb-10">
              <h2 className="text-xl md:text-2xl font-semibold">
                A. Confidencialidad y No Divulgación (NDA)
              </h2>

              <div className="mt-4 space-y-4 text-[#222] leading-relaxed">
                <p>
                  Dada la naturaleza estratégica y exclusiva de los servicios, Blank se
                  compromete a proteger toda la información sensible (financiera, comercial,
                  planes de expansión) del CLIENTE.
                </p>

                <p>
                  El CLIENTE reconoce que las metodologías, frameworks de estrategia y
                  herramientas de consultoría utilizadas son propiedad intelectual (Know-How)
                  de Blank.
                </p>
              </div>
            </section>

            {/* Sección B */}
            <section className="mb-10">
              <h2 className="text-xl md:text-2xl font-semibold">
                B. Naturaleza de los Servicios (Obligación de Medios)
              </h2>

              <div className="mt-4 space-y-4 text-[#222] leading-relaxed">
                <p>
                  Blank actúa como consultor estratégico y agencia de ejecución. Si bien trabajamos
                  para optimizar el desempeño y los beneficios (Arquitectura de Marca), los resultados
                  financieros finales dependen de la ejecución comercial del CLIENTE y las condiciones
                  del mercado.
                </p>

                <p>
                  Blank no garantiza un ROI (Retorno de Inversión) específico, sino la entrega de
                  herramientas de alto estándar para lograrlo.
                </p>
              </div>
            </section>

            {/* Sección C */}
            <section>
              <h2 className="text-xl md:text-2xl font-semibold">
                C. Aprobación y Estándares de Calidad
              </h2>

              <div className="mt-4 space-y-4 text-[#222] leading-relaxed">
                <p>
                  Todo material promocional o de identidad corporativa debe ser validado por el CLIENTE
                  antes de su producción o difusión. Una vez aprobado el arte final, Blank no se hace
                  responsable por errores no detectados por el CLIENTE en la fase de revisión.
                </p>

                <p>
                  Los entregables se rigen por estándares de “sofisticación y exclusividad”; las
                  percepciones subjetivas sobre el estilo no eximen de la obligación de pago si se ha
                  cumplido con el brief acordado.
                </p>
              </div>
            </section>

            {/* Footer mini */}
            <div className="mt-10 pt-6 border-t border-[#EFEFEF] flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <a
                href="/"
                className="text-sm underline text-[#111] hover:opacity-80"
              >
                Volver al inicio
              </a>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
};

export default TermsAndConditions;
