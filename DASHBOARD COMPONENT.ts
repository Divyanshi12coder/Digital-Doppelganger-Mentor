// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/progress').then(res => {
      setData(res.data);
    });
  }, []);

  const chartData = {
    labels: data.map((_, i) => `Day ${i + 1}`),
    datasets: [{
      label: 'Growth Score',
      data: data.map(d => d.score),
      borderColor: '#4f46e5',
      backgroundColor: '#c7d2fe',
      fill: true,
    }]
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Your Progress</h2>
      <Line data={chartData} />
    </div>
  );
}