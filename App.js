import React, { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "YOUR_API_KEY"; // 👉 openweathermap.org saytidan o'z API kalitingizni qo'ying

  const getWeather = async () => {
    if (!city.trim()) {
      setError("Iltimos, shahar nomini kiriting!");
      return;
    }
    setError("");
    setLoading(true);
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=uz`
      );
      if (!response.ok) throw new Error("Shahar topilmadi!");
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #74ABE2, #5563DE)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontFamily: "'Poppins', sans-serif",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "20px" }}>
        🌤️ Ob-havo Ilovasi
      </h1>

      <div
        style={{
          background: "rgba(255, 255, 255, 0.15)",
          padding: "25px 30px",
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          width: "320px",
          textAlign: "center",
        }}
      >
        <input
          type="text"
          placeholder="Shahar nomini kiriting..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            fontSize: "16px",
            textAlign: "center",
            marginBottom: "15px",
          }}
        />
        <button
          onClick={getWeather}
          style={{
            background: "linear-gradient(90deg, #00c6ff, #0072ff)",
            border: "none",
            color: "white",
            padding: "10px 20px",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.opacity = "0.85")}
          onMouseOut={(e) => (e.target.style.opacity = "1")}
        >
          Qidirish
        </button>

        {loading && <p style={{ marginTop: "15px" }}>Yuklanmoqda...</p>}
        {error && <p style={{ color: "#ffeb3b", marginTop: "15px" }}>{error}</p>}

        {weather && (
          <div style={{ marginTop: "25px" }}>
            <h2 style={{ marginBottom: "10px" }}>{weather.name}</h2>
            <h3 style={{ fontSize: "48px", margin: "10px 0" }}>
              {Math.round(weather.main.temp)}°C
            </h3>
            <p style={{ textTransform: "capitalize", opacity: "0.9" }}>
              {weather.weather[0].description}
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "20px",
                fontSize: "14px",
              }}
            >
              <div>
                💧 Namlik <br />
                <b>{weather.main.humidity}%</b>
              </div>
              <div>
                🌬️ Shamol <br />
                <b>{weather.wind.speed} m/s</b>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer style={{ marginTop: "40px", fontSize: "14px", opacity: "0.8" }}>
        <p>🌈 React bilan yaratilgan zamonaviy ob-havo ilovasi</p>
      </footer>
    </div>
  );
}

export default App;
