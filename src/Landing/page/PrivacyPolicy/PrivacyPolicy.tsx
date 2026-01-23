import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy: React.FC = () => {
  return (
    <main
      className="w-full bg-white text-[#111]"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {/* Contenedor */}
      <section className="mx-auto w-full" style={{ maxWidth: 1100 }}>
        {/* Header */}
        <div className="px-6 md:px-10 pt-10 md:pt-14">
          <p className="text-sm tracking-wide uppercase text-[#444]">
            Blank Agency
          </p>

          <h1 className="mt-2 text-3xl md:text-5xl font-semibold leading-tight">
            Aviso de Privacidad
          </h1>

          <p className="mt-4 text-base md:text-lg text-[#444] max-w-[820px] leading-relaxed">
            Aviso de Privacidad Integral aplicable a los datos personales recabados
            por Blank en el desarrollo de sus servicios profesionales.
          </p>

          {/* Divider */}
          <div className="mt-8 h-[1px] w-full bg-[#E7E7E7]" />
        </div>

        {/* Body */}
        <div className="px-6 md:px-10 py-10 md:py-14">
          <article className="bg-transparent p-0 md:p-0">
            {/* Identidad y responsable */}
            <section className="mb-10">
              <h2 className="text-xl md:text-2xl font-semibold">
                Aviso de Privacidad Integral – Blank
              </h2>

              <p className="mt-4 text-[#222] leading-relaxed">
                <strong>BLANK MEDIA AGENCY PRODUCCIONES</strong>, con domicilio ubicado
                en Benito Juárez, Quintana Roo, es responsable del tratamiento de sus
                datos personales conforme a lo establecido en el presente Aviso de
                Privacidad.
              </p>
            </section>

            {/* Datos personales */}
            <section className="mb-10">
              <h2 className="text-xl md:text-2xl font-semibold">
                Datos Personales Recabados
              </h2>

              <p className="mt-4 text-[#222] leading-relaxed">
                Para la prestación de servicios de consultoría y marketing B2B,
                recabamos los siguientes datos:
              </p>

              <ul className="mt-4 list-disc pl-5 space-y-2 text-[#222] leading-relaxed">
                <li>Datos de identificación y contacto corporativo.</li>
                <li>Información sobre su puesto o cargo.</li>
                <li>
                  Datos fiscales y bancarios de la empresa o del representante legal.
                </li>
              </ul>

              <p className="mt-4 text-[#222] leading-relaxed">
                Blank no recaba datos personales sensibles para sus procesos estándar.
              </p>
            </section>

            {/* Finalidades */}
            <section className="mb-10">
              <h2 className="text-xl md:text-2xl font-semibold">
                Finalidades del Tratamiento
              </h2>

              <h3 className="mt-4 text-lg font-semibold">
                Finalidades Primarias
              </h3>

              <ul className="mt-3 list-disc pl-5 space-y-2 text-[#222] leading-relaxed">
                <li>
                  Desarrollo de estrategias de marca, consultoría de comunicación y
                  gestión de imagen corporativa.
                </li>
                <li>Formalización de contratos de servicios profesionales.</li>
                <li>Gestión de facturación y cobranza.</li>
                <li>
                  Análisis de información comercial confidencial (bajo acuerdos NDA)
                  para el desarrollo de la “Arquitectura de Marca”.
                </li>
              </ul>

              <h3 className="mt-6 text-lg font-semibold">
                Finalidades Secundarias
              </h3>

              <ul className="mt-3 list-disc pl-5 space-y-2 text-[#222] leading-relaxed">
                <li>
                  Envío de newsletters, tendencias de mercado B2B e invitaciones a
                  eventos exclusivos de la agencia.
                </li>
              </ul>
            </section>

            {/* Transferencias */}
            <section className="mb-10">
              <h2 className="text-xl md:text-2xl font-semibold">
                Transferencias de Datos
              </h2>

              <p className="mt-4 text-[#222] leading-relaxed">
                Sus datos personales pueden ser compartidos con proveedores de
                servicios de impresión, medios de comunicación (para fines de
                relaciones públicas) o plataformas de CRM, siempre bajo instrucciones
                de Blank y con las medidas de seguridad pertinentes.
              </p>
            </section>

            {/* Derechos / limitación */}
            <section className="mb-10">
              <h2 className="text-xl md:text-2xl font-semibold">
                Mecanismos para Limitar el Uso o Divulgación
              </h2>

              <p className="mt-4 text-[#222] leading-relaxed">
                Si desea dejar de recibir correos promocionales de Blank, puede
                solicitar su baja enviando un correo electrónico a{" "}
                <strong>administracion@blank.com.mx</strong> con el asunto
                <strong> “BAJA LISTA DE CORREO”</strong>.
              </p>
            </section>

            {/* Footer */}
            <div className="mt-10 pt-6 border-t border-[#EFEFEF] flex justify-end">
              <Link
                to="/"
                className="text-sm underline text-[#111] hover:opacity-80"
              >
                Volver al inicio
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
