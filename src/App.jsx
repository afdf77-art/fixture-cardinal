import { useState } from "react";
import heroImage from "./assets/hero-full.jpg";
import copaImage from "./assets/copa.png";
import "./App.css";

export default function App() {

const [participant, setParticipant] = useState(() => {
    const savedParticipant = localStorage.getItem("participantData");
    return savedParticipant
      ? JSON.parse(savedParticipant)
      : { name: "", cedula: "", phone: "", whatsapp: false };
  });
  

  const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxD5cUKzqOV8dJo4UP-TFmoEiCMo_bMJwUANdJc74MBIkQgf9__aDEK2IAC4hzNMFZ-/exec";
const saveParticipant = async () => {

  if (!participant.whatsapp) {
    alert(
      "Debés aceptar recibir comunicaciones por WhatsApp para participar."
    );
    return;
  }
 const dataToSend = {
  nombre: participant.name,
  cedula: participant.cedula || "",
  whatsapp: participant.phone || "",
  predicciones: finalPredictions,
};

  localStorage.setItem("participantData", JSON.stringify(participant));

  await fetch(GOOGLE_SCRIPT_URL, {
  method: "POST",
  mode: "no-cors",
  body: JSON.stringify(dataToSend),
});

  alert("¡Participación enviada!");
  };
const [openRound, setOpenRound] = useState(null);
const [openFixtureRound, setOpenFixtureRound] = useState(null);
const [finalPredictions, setFinalPredictions] = useState(() => {
  const saved = localStorage.getItem("finalPredictions");
  return saved ? JSON.parse(saved) : {};
});

const updateFinalPrediction = (matchKey, side, value) => {
  const updated = {
    ...finalPredictions,
    [matchKey]: {
      ...finalPredictions[matchKey],
      [side]: value,
    },
  };

  setFinalPredictions(updated);
  localStorage.setItem("finalPredictions", JSON.stringify(updated));
};
  const [scores, setScores] = useState(() => {
    const savedScores = localStorage.getItem("fixtureScores");
    return savedScores ? JSON.parse(savedScores) : {};
  });

const updateScore = (groupName, matchIndex, side, value) => {
  const key = `${groupName}-${matchIndex}`;

  setScores((prev) => {
    const updatedScores = {
      ...prev,
      [key]: {
        ...prev[key],
        [side]: value,
      },
    };

    localStorage.setItem("fixtureScores", JSON.stringify(updatedScores));

    return updatedScores;
  });
};

const calculateStandings = (group) => {
  const table = {};

  group.teams.forEach((team) => {
    table[team.name] = {
      name: team.name,
      flag: team.flag,
      PJ: 0,
      G: 0,
      E: 0,
      P: 0,
      GF: 0,
      GC: 0,
      DG: 0,
      PTS: 0,
    };
  });

  group.matches.forEach((match, index) => {
    const score = scores[`${group.name}-${index}`];

    if (
      score &&
      score.home !== "" &&
      score.away !== ""
    ) {
      const homeGoals = Number(score.home);
      const awayGoals = Number(score.away);

      const homeTeam = table[match.home];
      const awayTeam = table[match.away];

      homeTeam.PJ += 1;
      awayTeam.PJ += 1;

      homeTeam.GF += homeGoals;
      homeTeam.GC += awayGoals;

      awayTeam.GF += awayGoals;
      awayTeam.GC += homeGoals;

      homeTeam.DG = homeTeam.GF - homeTeam.GC;
      awayTeam.DG = awayTeam.GF - awayTeam.GC;

      if (homeGoals > awayGoals) {
        homeTeam.G += 1;
        homeTeam.PTS += 3;
        awayTeam.P += 1;
      } else if (awayGoals > homeGoals) {
        awayTeam.G += 1;
        awayTeam.PTS += 3;
        homeTeam.P += 1;
      } else {
        homeTeam.E += 1;
        awayTeam.E += 1;
        homeTeam.PTS += 1;
        awayTeam.PTS += 1;
      }
    }
  });

  return Object.values(table).sort(
    (a, b) =>
      b.PTS - a.PTS ||
      b.DG - a.DG ||
      b.GF - a.GF
  );
};
return (
  <main id="inicio" style={page}>
      <section style={imageSection}>
        <div style={imageWrapper}>
          <img src={heroImage} alt="Promo Mundial Cardinal" style={heroImg} />

          <div style={socialButtons}>
            <a href="https://www.facebook.com/grupocardinal/" target="_blank" style={socialButton}>
              Facebook
            </a>
            <a
  href="https://www.instagram.com/cardinal.supermercados/"
  target="_blank"
  rel="noopener noreferrer"
  style={socialButton}
>
  Instagram
</a>

<a
  href="https://www.cardinalsupermercados.com/"
  target="_blank"
  rel="noopener noreferrer"
  style={socialButton}
>
  Web
</a>
          </div>
        </div>
      </section>

      <section style={buttonSection}>
       <a href="#fixture" style={greenButton}>GRUPOS</a>

<a href="#fase-final" style={darkButton}>FASE FINAL</a>
<a href="#pronosticos" style={darkButton}>JUGÁ Y GANÁ</a>
      </section>

     <section style={groupNavSection}>
  {groups.map((group) => (
    <a
      key={group.name}
      href={`#${group.name}`}
      style={groupNavButton}
    >
      {group.name.replace("GRUPO ", "")}
    </a>
  ))}

<a href="#16avos" style={groupNavButton}>16F</a>
<a href="#octavos" style={groupNavButton}>8F</a>
<a href="#cuartos" style={groupNavButton}>4F</a>
<a href="#semis" style={groupNavButton}>SF</a>
<a href="#tercer-puesto" style={groupNavButton}>3/4</a>
<a href="#final" style={groupNavButton}>F</a>
</section>

<section id="fixture" style={matchesSection}>
  {groups.map((group, groupIndex) => (
    <div key={groupIndex} id={group.name} style={groupBlock}>

      <h2 style={sectionTitle}>
  {group.name}
</h2>

      <div style={matchesGrid}>
        {group.matches.map((match, index) => (
          <div
            key={index}
            style={matchRow}
            className="match-row-mobile"
          >

            <div style={matchDate}>
              {match.date}
            </div>

            <div style={teamRight}>
              <img
                src={`https://flagcdn.com/w40/${match.homeFlag}.png`}
                alt={match.home}
                style={flagImage}
              />
              <span>{match.home}</span>
            </div>

            <div style={scoreBoxInline} className="score-mobile">
              <input
  type="number"
  style={scoreInput}
  value={scores[`${group.name}-${index}`]?.home ?? ""}
  onChange={(e) =>
    updateScore(group.name, index, "home", e.target.value)
  }
/>

              <span style={scoreSeparator}>-</span>

           <input
  type="number"
  inputMode="numeric"
  style={scoreInput}
  value={scores[`${group.name}-${index}`]?.away ?? ""}
  onChange={(e) =>
    updateScore(group.name, index, "away", e.target.value)
  }
/>
            </div>

            <div style={teamRight} className="team-mobile">
              <img
                src={`https://flagcdn.com/w40/${match.awayFlag}.png`}
                alt={match.away}
                style={flagImage}
              />
              <span>{match.away}</span>
            </div>

          </div>
        ))}
      </div>

      <div className="table-scroll">

        <table style={standingsTable}>

          <thead>
            <tr>
              <th style={th}>Equipo</th>
              <th style={th}>PJ</th>
              <th style={th}>G</th>
              <th style={th}>E</th>
              <th style={th}>P</th>
              <th style={th}>GF</th>
              <th style={th}>GC</th>
              <th style={th}>DG</th>
              <th style={th}>PTS</th>
            </tr>
          </thead>

          <tbody>
  {calculateStandings(group).map((team, index) => (
    <tr key={index}>
      <td style={teamCell}>
        <img
          src={`https://flagcdn.com/w40/${team.flag}.png`}
          alt={team.name}
          style={smallFlag}
        />
        {team.name}
      </td>

      <td style={td}>{team.PJ}</td>
      <td style={td}>{team.G}</td>
      <td style={td}>{team.E}</td>
      <td style={td}>{team.P}</td>
      <td style={td}>{team.GF}</td>
      <td style={td}>{team.GC}</td>
      <td style={td}>{team.DG}</td>
      <td style={pointsCell}>{team.PTS}</td>
    </tr>
  ))}
</tbody>

        </table>

      </div>

    </div>
  ))}
</section>
<section id="fase-final" style={knockoutSection}>
  <div className="playHero">
    <div>
      <p className="playSubtitle">DEL MANO A MANO A LA GRAN FINAL</p>
      <h2 className="playTitle">FASE FINAL</h2>
    </div>

    <img src={copaImage} alt="Copa del Mundo" className="playCup" />
  </div>

  <div className="predictionBox">
    {[
      { key: "16avos-fixture", title: "16 AVOS", icon: "16", matches: 16 },
      { key: "octavos-fixture", title: "OCTAVOS", icon: "8", matches: 8 },
      { key: "cuartos-fixture", title: "CUARTOS", icon: "4", matches: 4 },
      { key: "semis-fixture", title: "SEMIFINALES", icon: "SF", matches: 2 },
      { key: "tercer-fixture", title: "3º Y 4º PUESTO", icon: "3/4", matches: 1 },
      { key: "final-fixture", title: "FINAL", icon: "🏆", matches: 1 },
    ].map((round) => (
      <div key={round.key} className="roundPrediction">
        <button
          type="button"
          className="playCard roundButton"
          onClick={() =>
  setOpenFixtureRound(
    openFixtureRound === round.key ? null : round.key
  )
}
        >
          <span className="playIcon">{round.icon}</span>
          <div>
            <strong>{round.title}</strong>
            <small>
              {round.matches === 1
                ? "1 partido"
                : `${round.matches} partidos`}
            </small>
          </div>
          <b>{openFixtureRound === round.key ? "⌃" : "›"}</b>
        </button>

        {openFixtureRound === round.key && (
          <div className="roundPanel">
            {Array.from({ length: round.matches }, (_, index) => (
              <div key={index} className="predictionCard">
                <strong>Partido {index + 1}</strong>
                <div className="predictionInputs">
                  <input type="text" placeholder="Equipo 1" disabled />
                  <input type="text" placeholder="Equipo 2" disabled />
                  <input type="number" placeholder="G1" disabled />
                  <input type="number" placeholder="G2" disabled />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
</section>
<section id="pronosticos" style={knockoutSection}>
  <div className="playHero">
    <div>
      <p className="playSubtitle">PRONOSTICÁ LOS RESULTADOS Y SUMÁ PUNTOS</p>
      <h2 className="playTitle">JUGÁ Y GANÁ</h2>
    </div>

    <img src={copaImage} alt="Copa del Mundo" className="playCup" />
  </div>

  <div className="participantBox">
    <h3>Completá tus datos</h3>
    <p>
      Pronosticá los resultados de la Fase Final del Mundial, sumá puntos y participá por premios.
    </p>

    <ul className="pointsList">
      <li>Resultado exacto: 3 puntos</li>
      <li>Ganador correcto: 1 punto</li>
      <li>Campeón acertado: 5 puntos</li>
    </ul>

    <input
      type="text"
      placeholder="Nombre"
      value={participant.name}
      onChange={(e) =>
        setParticipant({ ...participant, name: e.target.value })
      }
    />
<input
  type="text"
  placeholder="Cédula de ID"
  value={participant.cedula ?? ""}
  onChange={(e) =>
    setParticipant({ ...participant, cedula: e.target.value })
  }
/>
    <input
  type="tel"
  placeholder="WhatsApp"
  value={participant.phone}
  onChange={(e) =>
    setParticipant({ ...participant, phone: e.target.value })
  }
/>

   <label className="checkBox">
  <input
    type="checkbox"
    checked={participant.whatsapp}
    onChange={(e) =>
      setParticipant({
        ...participant,
        whatsapp: e.target.checked,
      })
    }
  />
  Acepto recibir novedades y promociones de Cardinal por WhatsApp.
</label>

    <button onClick={saveParticipant}>
      GUARDAR PARTICIPACIÓN
    </button>
  </div>

  <div className="predictionBox">
    <h3>Mis predicciones</h3>

    {[
      { key: "16avos", title: "16 AVOS", icon: "16", matches: 16 },
      { key: "octavos", title: "OCTAVOS", icon: "8", matches: 8 },
      { key: "cuartos", title: "CUARTOS", icon: "4", matches: 4 },
      { key: "semis", title: "SEMIFINALES", icon: "SF", matches: 2 },
      { key: "tercer-puesto", title: "3º Y 4º PUESTO", icon: "3/4", matches: 1 },
      { key: "final", title: "FINAL", icon: "🏆", matches: 1 },
    ].map((round) => (
      <div key={round.key} className="roundPrediction">
        <button
          type="button"
          className="playCard roundButton"
          onClick={() =>
            setOpenRound(openRound === round.key ? null : round.key)
          }
        >
          <span className="playIcon">{round.icon}</span>
          <div>
            <strong>{round.title}</strong>
            <small>
              {round.matches === 1
                ? "1 partido para pronosticar"
                : `${round.matches} partidos para pronosticar`}
            </small>
          </div>
          <b>{openRound === round.key ? "⌃" : "›"}</b>
        </button>

        {openRound === round.key && (
          <div className="roundPanel">
            {Array.from({ length: round.matches }, (_, index) => {
              const matchKey = `${round.key}-${index + 1}`;

              return (
                <div key={matchKey} className="predictionCard">
                  <strong>Partido {index + 1}</strong>

                  <div className="predictionInputs">
                    <input
                      type="text"
                      placeholder="Equipo 1"
                      value={finalPredictions[matchKey]?.team1 ?? ""}
                      onChange={(e) =>
                        updateFinalPrediction(matchKey, "team1", e.target.value)
                      }
                    />

                    <input
                      type="text"
                      placeholder="Equipo 2"
                      value={finalPredictions[matchKey]?.team2 ?? ""}
                      onChange={(e) =>
                        updateFinalPrediction(matchKey, "team2", e.target.value)
                      }
                    />

                    <input
                      type="number"
                      placeholder="G1"
                      value={finalPredictions[matchKey]?.score1 ?? ""}
                      onChange={(e) =>
                        updateFinalPrediction(matchKey, "score1", e.target.value)
                      }
                    />

                    <input
                      type="number"
                      placeholder="G2"
                      value={finalPredictions[matchKey]?.score2 ?? ""}
                      onChange={(e) =>
                        updateFinalPrediction(matchKey, "score2", e.target.value)
                      }
                    />
                  </div>
                </div>
              );
            })}

            {round.key === "final" && (
              <div className="predictionCard">
                <strong>Campeón</strong>
                <input
                  type="text"
                  placeholder="Equipo campeón"
                  value={finalPredictions["champion"]?.team ?? ""}
                  onChange={(e) =>
                    updateFinalPrediction("champion", "team", e.target.value)
                  }
                />
              </div>
            )}
          </div>
        )}
      </div>
    ))}
  </div>
</section>
<a href="#inicio" className="menuFixed">
  ↑ MENÚ
</a>

</main>
);
}

const dieciseisavos = Array.from({ length: 16 }, (_, i) => ({
  home: `Equipo ${i * 2 + 1}`,
  away: `Equipo ${i * 2 + 2}`,
}));

const octavos = Array.from({ length: 8 }, (_, i) => ({
  home: `Ganador ${i * 2 + 1}`,
  away: `Ganador ${i * 2 + 2}`,
}));

const cuartos = Array.from({ length: 4 }, (_, i) => ({
  home: `Ganador 8F ${i * 2 + 1}`,
  away: `Ganador 8F ${i * 2 + 2}`,
}));

const semis = [
  { home: "Ganador 4F 1", away: "Ganador 4F 2" },
  { home: "Ganador 4F 3", away: "Ganador 4F 4" },
];

const tercerPuesto = [
  { home: "Perdedor SF 1", away: "Perdedor SF 2" },
];

const finals = [
  { home: "Ganador SF 1", away: "Ganador SF 2" },
];
const groups = [
  {
    name: "GRUPO A",
    teams: [
  { flag: "mx", name: "México" },
  { flag: "za", name: "Sudáfrica" },
  { flag: "kr", name: "Rep. de Corea" },
  { flag: "cz", name: "Chequia" },
],
    matches: [
      { date: "11 JUN · 16:00 UY", homeFlag: "mx", home: "México", awayFlag: "za", away: "Sudáfrica" },
      { date: "11 JUN · 23:00 UY", homeFlag: "kr", home: "Rep. de Corea", awayFlag: "cz", away: "Chequia" },
      { date: "18 JUN · 13:00 UY", homeFlag: "za", home: "Sudáfrica", awayFlag: "cz", away: "Chequia" },
      { date: "18 JUN · 22:00 UY", homeFlag: "mx", home: "México", awayFlag: "kr", away: "Rep. de Corea" },
      { date: "24 JUN · 22:00 UY", homeFlag: "mx", home: "México", awayFlag: "cz", away: "Chequia" },
      { date: "24 JUN · 22:00 UY", homeFlag: "za", home: "Sudáfrica", awayFlag: "kr", away: "Rep. de Corea" },
    ],
  },

{
  name: "GRUPO B",
  teams: [
    { flag: "ca", name: "Canadá" },
    { flag: "ba", name: "Bosnia y Herzegovina" },
    { flag: "qa", name: "Catar" },
    { flag: "ch", name: "Suiza" },
  ],
  matches: [
    { date: "12 JUN · 16:00 UY", homeFlag: "ca", home: "Canadá", awayFlag: "ba", away: "Bosnia y Herzegovina" },
    { date: "13 JUN · 16:00 UY", homeFlag: "qa", home: "Catar", awayFlag: "ch", away: "Suiza" },
    { date: "18 JUN · 16:00 UY", homeFlag: "ch", home: "Suiza", awayFlag: "ba", away: "Bosnia y Herzegovina" },
    { date: "18 JUN · 19:00 UY", homeFlag: "ca", home: "Canadá", awayFlag: "qa", away: "Catar" },
    { date: "24 JUN · 16:00 UY", homeFlag: "ch", home: "Suiza", awayFlag: "ca", away: "Canadá" },
    { date: "24 JUN · 16:00 UY", homeFlag: "ba", home: "Bosnia y Herzegovina", awayFlag: "qa", away: "Catar" },
  ],
},

{
  name: "GRUPO C",
  teams: [
    { flag: "br", name: "Brasil" },
    { flag: "ma", name: "Marruecos" },
    { flag: "ht", name: "Haití" },
    { flag: "gb-sct", name: "Escocia" },
  ],
  matches: [
    { date: "13 JUN · 19:00 UY", homeFlag: "br", home: "Brasil", awayFlag: "ma", away: "Marruecos" },

    { date: "13 JUN · 22:00 UY", homeFlag: "ht", home: "Haití", awayFlag: "gb-sct", away: "Escocia" },

    { date: "19 JUN · 19:00 UY", homeFlag: "gb-sct", home: "Escocia", awayFlag: "ma", away: "Marruecos" },

    { date: "19 JUN · 21:30 UY", homeFlag: "br", home: "Brasil", awayFlag: "ht", away: "Haití" },

    { date: "24 JUN · 19:00 UY", homeFlag: "gb-sct", home: "Escocia", awayFlag: "br", away: "Brasil" },

    { date: "24 JUN · 19:00 UY", homeFlag: "ma", home: "Marruecos", awayFlag: "ht", away: "Haití" },
  ],
},

{
  name: "GRUPO D",
  teams: [  
    { flag: "us", name: "Estados Unidos" },
    { flag: "py", name: "Paraguay" },
    { flag: "au", name: "Australia" },
    { flag: "tr", name: "Turquía" },
  ],
  matches: [
    { date: "12 JUN · 22:00 UY", homeFlag: "us", home: "Estados Unidos", awayFlag: "py", away: "Paraguay" },

    { date: "14 JUN · 01:00 UY", homeFlag: "au", home: "Australia", awayFlag: "tr", away: "Turquía" },

    { date: "19 JUN · 16:00 UY", homeFlag: "us", home: "Estados Unidos", awayFlag: "au", away: "Australia" },

    { date: "20 JUN · 00:00 UY", homeFlag: "tr", home: "Turquía", awayFlag: "py", away: "Paraguay" },

    { date: "25 JUN · 23:00 UY", homeFlag: "tr", home: "Turquía", awayFlag: "us", away: "Estados Unidos" },

    { date: "25 JUN · 23:00 UY", homeFlag: "py", home: "Paraguay", awayFlag: "au", away: "Australia" },
  ],
},

{
  name: "GRUPO E",
  teams: [
    { flag: "de", name: "Alemania" },
    { flag: "cw", name: "Curazao" },
    { flag: "ci", name: "Costa de Marfil" },
    { flag: "ec", name: "Ecuador" },
  ],
  matches: [
    { date: "14 JUN · 14:00 UY", homeFlag: "de", home: "Alemania", awayFlag: "cw", away: "Curazao" },

    { date: "14 JUN · 20:00 UY", homeFlag: "ci", home: "Costa de Marfil", awayFlag: "ec", away: "Ecuador" },

    { date: "20 JUN · 17:00 UY", homeFlag: "de", home: "Alemania", awayFlag: "ci", away: "Costa de Marfil" },

    { date: "20 JUN · 21:00 UY", homeFlag: "ec", home: "Ecuador", awayFlag: "cw", away: "Curazao" },

    { date: "25 JUN · 17:00 UY", homeFlag: "cw", home: "Curazao", awayFlag: "ci", away: "Costa de Marfil" },

    { date: "25 JUN · 17:00 UY", homeFlag: "ec", home: "Ecuador", awayFlag: "de", away: "Alemania" },
  ],
},

{
  name: "GRUPO F",
  teams: [
    { flag: "nl", name: "Países Bajos" },
    { flag: "jp", name: "Japón" },
    { flag: "se", name: "Suecia" },
    { flag: "tn", name: "Túnez" },
  ],
  matches: [
    { date: "14 JUN · 17:00 UY", homeFlag: "nl", home: "Países Bajos", awayFlag: "jp", away: "Japón" },

    { date: "14 JUN · 23:00 UY", homeFlag: "se", home: "Suecia", awayFlag: "tn", away: "Túnez" },

    { date: "20 JUN · 14:00 UY", homeFlag: "nl", home: "Países Bajos", awayFlag: "se", away: "Suecia" },

    { date: "21 JUN · 01:00 UY", homeFlag: "tn", home: "Túnez", awayFlag: "jp", away: "Japón" },

    { date: "25 JUN · 20:00 UY", homeFlag: "jp", home: "Japón", awayFlag: "se", away: "Suecia" },

    { date: "25 JUN · 20:00 UY", homeFlag: "tn", home: "Túnez", awayFlag: "nl", away: "Países Bajos" },
  ],
},

{
  name: "GRUPO G",
  teams: [
    { flag: "be", name: "Bélgica" },
    { flag: "eg", name: "Egipto" },
    { flag: "ir", name: "Irán" },
    { flag: "nz", name: "Nueva Zelanda" },
  ],
  matches: [
    { date: "15 JUN · 16:00 UY", homeFlag: "be", home: "Bélgica", awayFlag: "eg", away: "Egipto" },

    { date: "15 JUN · 22:00 UY", homeFlag: "ir", home: "Irán", awayFlag: "nz", away: "Nueva Zelanda" },

    { date: "21 JUN · 16:00 UY", homeFlag: "be", home: "Bélgica", awayFlag: "ir", away: "Irán" },

    { date: "21 JUN · 22:00 UY", homeFlag: "nz", home: "Nueva Zelanda", awayFlag: "eg", away: "Egipto" },

    { date: "27 JUN · 00:00 UY", homeFlag: "eg", home: "Egipto", awayFlag: "ir", away: "Irán" },

    { date: "27 JUN · 00:00 UY", homeFlag: "nz", home: "Nueva Zelanda", awayFlag: "be", away: "Bélgica" },
  ],
},

{
  name: "GRUPO H",
  teams: [
    { flag: "es", name: "España" },
    { flag: "sa", name: "Arabia Saudita" },
    { flag: "uy", name: "Uruguay" },
    { flag: "cv", name: "Cabo Verde" },
  ],
  matches: [
    { date: "15 JUN · 13:00 UY", homeFlag: "es", home: "España", awayFlag: "cv", away: "Cabo Verde" },

    { date: "15 JUN · 19:00 UY", homeFlag: "sa", home: "Arabia Saudita", awayFlag: "uy", away: "Uruguay" },

    { date: "21 JUN · 13:00 UY", homeFlag: "es", home: "España", awayFlag: "sa", away: "Arabia Saudita" },

    { date: "21 JUN · 19:00 UY", homeFlag: "uy", home: "Uruguay", awayFlag: "cv", away: "Cabo Verde" },

    { date: "26 JUN · 21:00 UY", homeFlag: "cv", home: "Cabo Verde", awayFlag: "sa", away: "Arabia Saudita" },

    { date: "26 JUN · 21:00 UY", homeFlag: "uy", home: "Uruguay", awayFlag: "es", away: "España" },
  ],
},

{
  name: "GRUPO I",
  teams: [
    { flag: "fr", name: "Francia" },
    { flag: "sn", name: "Senegal" },
    { flag: "iq", name: "Irak" },
    { flag: "no", name: "Noruega" },
  ],
  matches: [
    { date: "16 JUN · 16:00 UY", homeFlag: "fr", home: "Francia", awayFlag: "sn", away: "Senegal" },

    { date: "16 JUN · 19:00 UY", homeFlag: "iq", home: "Irak", awayFlag: "no", away: "Noruega" },

    { date: "22 JUN · 18:00 UY", homeFlag: "fr", home: "Francia", awayFlag: "iq", away: "Irak" },

    { date: "22 JUN · 21:00 UY", homeFlag: "no", home: "Noruega", awayFlag: "sn", away: "Senegal" },

    { date: "26 JUN · 16:00 UY", homeFlag: "no", home: "Noruega", awayFlag: "fr", away: "Francia" },

    { date: "26 JUN · 16:00 UY", homeFlag: "sn", home: "Senegal", awayFlag: "iq", away: "Irak" },
  ],
},

{
  name: "GRUPO J",
  teams: [
    { flag: "ar", name: "Argentina" },
    { flag: "dz", name: "Argelia" },
    { flag: "at", name: "Austria" },
    { flag: "jo", name: "Jordania" },
  ],
  matches: [
    { date: "16 JUN · 22:00 UY", homeFlag: "ar", home: "Argentina", awayFlag: "dz", away: "Argelia" },

    { date: "17 JUN · 01:00 UY", homeFlag: "at", home: "Austria", awayFlag: "jo", away: "Jordania" },

    { date: "22 JUN · 14:00 UY", homeFlag: "ar", home: "Argentina", awayFlag: "at", away: "Austria" },

    { date: "23 JUN · 00:00 UY", homeFlag: "jo", home: "Jordania", awayFlag: "dz", away: "Argelia" },

    { date: "27 JUN · 23:00 UY", homeFlag: "dz", home: "Argelia", awayFlag: "at", away: "Austria" },

    { date: "27 JUN · 23:00 UY", homeFlag: "jo", home: "Jordania", awayFlag: "ar", away: "Argentina" },
  ],
},

{
  name: "GRUPO K",
  teams: [
    { flag: "pt", name: "Portugal" },
    { flag: "cd", name: "Rep. del Congo" },
    { flag: "uz", name: "Uzbekistán" },
    { flag: "co", name: "Colombia" },
  ],
  matches: [
    { date: "17 JUN · 14:00 UY", homeFlag: "pt", home: "Portugal", awayFlag: "cd", away: "Rep. del Congo" },

    { date: "17 JUN · 23:00 UY", homeFlag: "uz", home: "Uzbekistán", awayFlag: "co", away: "Colombia" },

    { date: "23 JUN · 14:00 UY", homeFlag: "pt", home: "Portugal", awayFlag: "uz", away: "Uzbekistán" },

    { date: "23 JUN · 23:00 UY", homeFlag: "co", home: "Colombia", awayFlag: "cd", away: "Rep. del Congo" },

    { date: "27 JUN · 20:30 UY", homeFlag: "co", home: "Colombia", awayFlag: "pt", away: "Portugal" },

    { date: "27 JUN · 20:30 UY", homeFlag: "cd", home: "Rep. del Congo", awayFlag: "uz", away: "Uzbekistán" },
  ],
},

{
  name: "GRUPO L",
  teams: [
    { flag: "gb-eng", name: "Inglaterra" },
    { flag: "hr", name: "Croacia" },
    { flag: "gh", name: "Ghana" },
    { flag: "pa", name: "Panamá" },
  ],
  matches: [
    { date: "17 JUN · 17:00 UY", homeFlag: "gb-eng", home: "Inglaterra", awayFlag: "hr", away: "Croacia" },

    { date: "17 JUN · 20:00 UY", homeFlag: "gh", home: "Ghana", awayFlag: "pa", away: "Panamá" },

    { date: "23 JUN · 17:00 UY", homeFlag: "gb-eng", home: "Inglaterra", awayFlag: "gh", away: "Ghana" },

    { date: "23 JUN · 20:00 UY", homeFlag: "pa", home: "Panamá", awayFlag: "hr", away: "Croacia" },

    { date: "27 JUN · 18:00 UY", homeFlag: "pa", home: "Panamá", awayFlag: "gb-eng", away: "Inglaterra" },

    { date: "27 JUN · 18:00 UY", homeFlag: "hr", home: "Croacia", awayFlag: "gh", away: "Ghana" },
  ],
},

];

const page = {
  minHeight: "100vh",
  background: "#000",
  color: "white",
  fontFamily: "Arial, Helvetica, sans-serif",
};

const imageSection = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  background: "#000",
  paddingTop: "20px",
};

const imageWrapper = {
  position: "relative",
  width: "100%",
  maxWidth: "1400px",
};

const heroImg = {
  width: "100%",
  height: "auto",
  display: "block",
};

const socialButtons = {
  position: "absolute",
  right: "70px",
  bottom: "0px",
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  background: "rgba(0,0,0,.88)",
  padding: "14px 18px",
  borderRadius: "18px",
  border: "1px solid rgba(123,208,0,.25)",
  boxShadow: "0 0 25px rgba(180,0,255,.65)",
};

const socialButton = {
  background: "rgba(0,0,0,.58)",
  color: "white",
  border: "1px solid rgba(123,208,0,.55)",
  padding: "8px 14px",
  borderRadius: "10px",
  fontWeight: "800",
  fontSize: "13px",
  textDecoration: "none",
  backdropFilter: "blur(8px)",
  boxShadow: "0 0 14px rgba(123,208,0,.35)",
};

const buttonSection = {
  background: "#000",
  display: "flex",
  justifyContent: "center",
  gap: "24px",
  padding: "32px 20px 48px",
  flexWrap: "wrap",
};

const greenButton = {
  background: "linear-gradient(180deg,#1f1f1f,#111)",
  color: "white",
  border: "1px solid rgba(0,210,255,.55)",
  padding: "20px 70px",
  borderRadius: "18px",
  fontWeight: "900",
  fontSize: "24px",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-block",
  boxShadow: "0 0 30px rgba(0,210,255,.38)",
};

const darkButton = {
  background: "linear-gradient(180deg,#1f1f1f,#111)",
  color: "white",
  border: "1px solid rgba(123,208,0,.55)",
  padding: "20px 70px",
  borderRadius: "18px",
  fontWeight: "900",
  fontSize: "24px",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-block",
  boxShadow: "0 0 30px rgba(123,208,0,.38)",
};

const matchesSection = {
  background: "#050505",
  padding: "80px 30px",
};

const sectionTitle = {
  fontSize: "56px",
  fontWeight: "900",
  textAlign: "center",
  marginBottom: "40px",
  color: "white",
  textShadow: "0 0 22px rgba(123,208,0,.45)",
};

const matchesGrid = {
  display: "grid",
  gap: "16px",
  maxWidth: "1200px",
  margin: "0 auto",
};

const matchRow = {
  display: "grid",
  gridTemplateColumns: "180px 1fr 140px 1fr",
  alignItems: "center",
  gap: "12px",
  background: "linear-gradient(180deg,#141414,#0b0b0b)",
  border: "1px solid rgba(123,208,0,.22)",
  borderRadius: "18px",
  padding: "16px",
  boxShadow: "0 0 18px rgba(123,208,0,.08)",
};


const matchDate = {
  color: "#7bd000",
  fontWeight: "900",
  fontSize: "18px",
  lineHeight: "1.35",
};

const teamLeft = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
  fontSize: "24px",
  fontWeight: "900",
};

const teamRight = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
  fontSize: "24px",
  fontWeight: "900",
};

const flag = {
  fontSize: "38px",
};

const scoreBoxInline = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
};

const scoreInput = {
  width: "62px",
  height: "58px",
  background: "#101010",
  border: "1px solid rgba(123,208,0,.55)",
  borderRadius: "12px",
  color: "white",
  fontSize: "28px",
  fontWeight: "900",
  textAlign: "center",
  boxShadow: "0 0 12px rgba(123,208,0,.12)",
};

const scoreSeparator = {
  fontSize: "28px",
  fontWeight: "900",
  color: "#7bd000",
};

const flagBox = {
  width: "48px",
  height: "34px",
  borderRadius: "8px",
  background: "linear-gradient(135deg,#222,#111)",
  border: "1px solid rgba(255,255,255,.25)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "15px",
  fontWeight: "900",
  color: "#7bd000",
  boxShadow: "0 0 12px rgba(123,208,0,.2)",
};const flagImage = {
  width: "44px",
  borderRadius: "6px",
  boxShadow: "0 0 12px rgba(0,0,0,.35)",
};const groupBlock = {
  marginBottom: "90px",
};
const standingsTable = {
  width: "100%",
  maxWidth: "1200px",
  margin: "24px auto 0",
  borderCollapse: "collapse",
  background: "#0c0c0c",
  borderRadius: "18px",
  overflow: "hidden",
  border: "1px solid rgba(123,208,0,.2)",
};

const th = {
  background: "#111",
  color: "#7bd000",
  padding: "14px",
  fontSize: "13px",
  textAlign: "center",
};

const td = {
  padding: "14px",
  textAlign: "center",
  borderTop: "1px solid rgba(255,255,255,.06)",
  fontWeight: "800",
};

const teamCell = {
  ...td,
  display: "flex",
  alignItems: "center",
  gap: "4px",
  textAlign: "left",
  fontSize: "10px",
};

const smallFlag = {
  width: "18px",
  borderRadius: "3px",
};

const pointsCell = {
  ...td,
  color: "#7bd000",
  fontWeight: "900",
};const groupNavSection = {
  background: "#000",
  display: "flex",
  justifyContent: "center",
  gap: "10px",
  flexWrap: "wrap",
  padding: "0 20px 50px",
};

const groupNavButton = {
  background: "linear-gradient(180deg,#1f1f1f,#111)",
  color: "white",
  border: "1px solid rgba(123,208,0,.35)",
  width: "46px",
  height: "46px",
  borderRadius: "14px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "900",
  textDecoration: "none",
  boxShadow: "0 0 16px rgba(123,208,0,.18)",
};
const knockoutSection = {
  background: "#050505",
  padding: "100px 30px",
};

const bracketGrid = {
  display: "grid",
  gridTemplateColumns: "3fr 1.2fr",
  gap: "36px",
  maxWidth: "1400px",
  width: "100%",
  margin: "0 auto",
  alignItems: "start",
};

const roundColumn = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const roundTitle = {
  fontSize: "28px",
  fontWeight: "900",
  color: "#7bd000",
  marginBottom: "10px",
  textAlign: "center",
};

const knockoutCard = {
  background: "linear-gradient(180deg,#141414,#0d0d0d)",
  border: "1px solid rgba(123,208,0,.2)",
  borderRadius: "18px",
  padding: "18px",
};

const finalCard = {
  ...knockoutCard,
  border: "2px solid #7bd000",
  boxShadow: "0 0 25px rgba(123,208,0,.25)",
  transform: "scale(1.08)",
};

const knockoutTeam = {
  padding: "10px 0",
  fontWeight: "800",
  borderBottom: "1px solid rgba(255,255,255,.08)",
};
const finalZone = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "50px",
  marginTop: "40px",
};
const trophyImage = {
  width: "320px",
  margin: "0 auto",
  display: "block",
  filter: "drop-shadow(0 0 30px rgba(255,215,0,.35))",
};
const roundsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(120px,1fr))",
  gap: "16px",
  width: "100%",
};