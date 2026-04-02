import React from "react";

export default function Home({ onNavigate, user }) {
  return (
    <div className="home-wrap">
      <div className="home-header-row">
        <div>
          <h1 className="home-title">
            Hi{user ? `, ${user.name || user.email}` : ""} 👋
          </h1>

          <p className="home-subtitle">
            Welcome to Sudhaar Setu, your cute little repair hub for all things
            AC, fridge, mobile, and more.
          </p>
        </div>
      </div>

      <div className="home-grid">
        {/* START A REPAIR TILE */}
        <div className="home-tile home-tile-main">
          <div className="home-main-left">
            <h2>Start a repair</h2>
            <p>
              Unsure what&apos;s wrong? Get a quick estimate before you book a visit.
            </p>
            <button
              className="btn-primary"
              onClick={() => onNavigate && onNavigate("estimator")}
            >
              Open Repair Estimator
            </button>
          </div>

          <div className="home-main-right">
            <div className="gadget-chip">📱 Phone</div>
            <div className="gadget-chip">💻 Laptop</div>
            <div className="gadget-chip">📺 TV</div>
            <div className="gadget-chip">❄ AC</div>
          </div>
        </div>

        <div className="home-tile home-tile-pickup">
          <h3>Book a pickup</h3>
          <p>Doorstep pickup so your devices travel less and live more.</p>
          <button
            className="btn-secondary"
            onClick={() => onNavigate && onNavigate("pickup")}
          >
            Schedule pickup
          </button>
        </div>

        <div className="home-tile home-tile-passport">
          <h3>Repair Passport</h3>
          <p>See all your past repairs, parts used, and device health.</p>
          <button
            className="btn-ghost"
            onClick={() => onNavigate && onNavigate("passport")}
          >
            View passport
          </button>
        </div>

        <div className="home-tile home-tile-mini">
          <h4>Why repair?</h4>
          <p>Save money, cut e-waste, and give your gadgets a fresh start.</p>
        </div>

        <div className="home-tile home-tile-mini">
          <h4>Today&apos;s tip</h4>
          <p>
            Cleaning AC filters every 3 months can improve cooling and cut power use.
          </p>
        </div>
      </div>
    </div>
  );
}
