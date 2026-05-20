import heroImage from "./assets/hero-full.jpg";
import "./App.css";
export default function App() {
  return (
    <main style={page}>
      <section style={imageSection}>
        <div style={imageWrapper}>
          <img src={heroImage} alt="Promo Mundial Cardinal" style={heroImg} />

          <div style={socialButtons}>
            <a href="https://www.facebook.com/grupocardinal/" target="_blank" style={socialButton}>
              Facebook
            </a>
            <a href="https://www.instagram.com/cardinal.supermercados/" target="_blank" style={socialButton}>
              Instagram
            </a>
            <a href="https://cardinal.com.uy" target="_blank" style={socialButton}>
              Web
            </a>
          </div>
        </div>
      </section>

      <section style={buttonSection}>
        <a href="#fixture" style={greenButton}>Ver Partidos</a>
        <button style={darkButton}>Participa</button>
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
</section>

<section id="fixture" style={matchesSection}>
  {groups.map((group, groupIndex) => (
    <div key={groupIndex} id={group.name} style={groupBlock}>
      <h2 style={sectionTitle}>
        {group.name}
      </h2>

      <div style={matchesGrid}>
        {group.matches.map((match, index) => (
          <div key={index} style={matchRow} className="match-row-mobile">
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
              />

              <span style={scoreSeparator}>
                -
              </span>

              <input
                type="number"
                style={scoreInput}
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
   {group.teams?.map((team, index) => (
      <tr key={index}>
        <td style={teamCell}>
          <img
            src={`https://flagcdn.com/w40/${team.flag}.png`}
            alt={team.name}
            style={smallFlag}
          />
          {team.name}
        </td>

        <td style={td}>0</td>
        <td style={td}>0</td>
        <td style={td}>0</td>
        <td style={td}>0</td>
        <td style={td}>0</td>
        <td style={td}>0</td>
        <td style={td}>0</td>

        <td style={pointsCell}>0</td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  ))}
</section>
    </main>
  );
}

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
  gridTemplateColumns: "200px 1fr 170px 1fr",
  alignItems: "center",
  gap: "18px",
  background: "linear-gradient(180deg,#141414,#0b0b0b)",
  border: "1px solid rgba(123,208,0,.22)",
  borderRadius: "18px",
  padding: "18px 22px",
  boxShadow: "0 0 18px rgba(123,208,0,.08)",
  overflowX: "auto",
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
  gap: "10px",
  textAlign: "left",
};

const smallFlag = {
  width: "28px",
  borderRadius: "4px",
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