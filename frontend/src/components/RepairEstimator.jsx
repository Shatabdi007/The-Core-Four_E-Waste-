import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { deviceCategories, commonIssues } from "../data/repairData";
import "./RepairEstimator.css";

const RepairEstimator = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedIssues, setSelectedIssues] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);

  /* ---------- AVAILABLE ISSUES ---------- */
  /* ---------- AVAILABLE ISSUES ---------- */
const availableIssues = useMemo(() => {
  if (!selectedCategory) return [];

  // ✅ FIX FOR APPLIANCES
  if (selectedCategory.id === "appliances") {
    return commonIssues.appliances?.[selectedDevice?.id] || [];
  }

  // ✅ NORMAL (phones/laptops)
  return commonIssues[selectedCategory.id] || [];
}, [selectedCategory, selectedDevice]);

  /* ---------- COST ESTIMATION ---------- */
  const estimate = useMemo(() => {
    if (!selectedDevice || selectedIssues.length === 0) return null;

    const baseCost = selectedDevice.baseRepairCost;

    const issuesCost = selectedIssues.reduce(
      (sum, issue) => sum + baseCost * issue.costMultiplier,
      0
    );

    const laborCost = Math.round(issuesCost * 0.3);
    const partsCost = Math.round(issuesCost * 0.7);

    const severityRank = { low: 1, medium: 2, high: 3 };
    const maxSeverity = selectedIssues.reduce(
      (max, issue) =>
        severityRank[issue.severity] > severityRank[max]
          ? issue.severity
          : max,
      "low"
    );

    const timeMap = {
      low: "1–2 hours",
      medium: "2–4 hours",
      high: "1–2 days",
    };

    return {
      totalCost: Math.round(issuesCost),
      laborCost,
      partsCost,
      estimatedTime: timeMap[maxSeverity],
      minCost: Math.round(issuesCost * 0.8),
      maxCost: Math.round(issuesCost * 1.3),
    };
  }, [selectedDevice, selectedIssues]);

  /* ---------- HANDLERS ---------- */
  const handleIssueToggle = (issue) => {
    setSelectedIssues((prev) =>
      prev.find((i) => i.id === issue.id)
        ? prev.filter((i) => i.id !== issue.id)
        : [...prev, issue]
    );
  };

  const handleCalculate = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      setStep(4);
    }, 1200);
  };

  const resetEstimator = () => {
    setStep(1);
    setSelectedCategory(null);
    setSelectedDevice(null);
    setSelectedIssues([]);
  };

  /* ---------- NAVIGATE TO REPAIR CENTERS ---------- */
  const goToRepairCenters = () => {
    navigate("/repair-centers", {
      state: {
        estimateData: {
          device: selectedDevice?.name,
          brand: selectedCategory?.name,
          issue: selectedIssues.map((i) => i.name).join(", "),
          cost: estimate.totalCost,
        },
      },
    });
  };

  return (
    <section className="repair-estimator">
      <div className="container">

        {/* PROGRESS */}
        <div className="progress-steps">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className={`step ${step >= s ? "active" : ""}`}>
              {step > s ? "✓" : s}
            </div>
          ))}
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h3>Select Device Category</h3>
            <div className="category-grid">
              {deviceCategories.map((cat) => (
                <div
                  key={cat.id}
                  className={`category-card ${
                    selectedCategory?.id === cat.id ? "selected" : ""
                  }`}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedDevice(null);
                    setSelectedIssues([]);
                  }}
                >
                  <div className="category-icon">{cat.icon}</div>
                  <h4>{cat.name}</h4>
                </div>
              ))}
            </div>

            <button
              className="btn-primary"
              disabled={!selectedCategory}
              onClick={() => setStep(2)}
            >
              Continue →
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && selectedCategory && (
          <>
            <h3>Select Device</h3>
            <div className="device-grid">
              {selectedCategory.devices.map((dev) => (
                <div
                  key={dev.id}
                  className={`device-card ${
                    selectedDevice?.id === dev.id ? "selected" : ""
                  }`}
                  onClick={() => setSelectedDevice(dev)}
                >
                  <h4>{dev.name}</h4>
                  <p>₹{dev.baseRepairCost}</p>
                </div>
              ))}
            </div>

            <button className="btn-secondary" onClick={() => setStep(1)}>
              Back
            </button>
            <button
              className="btn-primary"
              disabled={!selectedDevice}
              onClick={() => setStep(3)}
            >
              Continue →
            </button>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <h3>Select Issues</h3>
            <div className="issues-list">
              {Array.isArray(availableIssues) &&
  availableIssues.map((issue) => (
                <div
                  key={issue.id}
                  className={`issue-card ${
                    selectedIssues.find((i) => i.id === issue.id)
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleIssueToggle(issue)}
                >
                  <h4>{issue.name}</h4>
                  <p>{issue.description}</p>
                </div>
              ))}
            </div>

            <button className="btn-secondary" onClick={() => setStep(2)}>
              Back
            </button>
            <button
              className="btn-primary"
              disabled={!selectedIssues.length}
              onClick={handleCalculate}
            >
              {isCalculating ? "Calculating..." : "Calculate"}
            </button>
          </>
        )}

        {/* STEP 4 */}
        {step === 4 && estimate && (
          <div className="result-card">
            <h2>Estimated Repair Cost</h2>
            <h1>₹{estimate.totalCost}</h1>
            <p>
              Range: ₹{estimate.minCost} – ₹{estimate.maxCost}
            </p>

            <div className="breakdown">
              <p>Parts: ₹{estimate.partsCost}</p>
              <p>Labor: ₹{estimate.laborCost}</p>
              <p>Time: {estimate.estimatedTime}</p>
            </div>

            {/* ✅ FIXED BUTTON */}
            <button className="btn-primary" onClick={goToRepairCenters}>
              Find Repair Centers
            </button>

            <button className="btn-secondary" onClick={resetEstimator}>
              New Estimate
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default RepairEstimator;

