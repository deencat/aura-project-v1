'use client'

import React from 'react'

interface ResultsGraphProps {
  title: string
  subtitle?: string
  dataPoints: {
    label: string
    value: number
    milestone?: boolean
  }[]
  maxValue: number
  yAxisLabel?: string
  gradientColors?: {
    from: string
    to: string
  }
}

const ResultsGraph: React.FC<ResultsGraphProps> = ({
  title,
  subtitle,
  dataPoints,
  maxValue,
  yAxisLabel = 'Results Visibility',
  gradientColors = { from: 'rgba(59, 130, 246, 0.8)', to: 'rgba(59, 130, 246, 0.1)' }
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      
      <div className="relative h-64">
        {/* Y-axis labels */}
        <div className="absolute inset-y-0 left-0 w-14 flex flex-col justify-between pb-8 pt-2 text-xs text-gray-500">
          <div>100%</div>
          <div>75%</div>
          <div>50%</div>
          <div>25%</div>
          <div>0%</div>
        </div>
        
        {/* Y-axis label */}
        <div className="absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-medium text-gray-500 whitespace-nowrap">
          {yAxisLabel}
        </div>
        
        {/* Graph area */}
        <div className="absolute inset-y-0 left-14 right-0 pb-8">
          {/* Horizontal grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            <div className="border-b border-gray-200 h-full"></div>
            <div className="border-b border-gray-200 h-full"></div>
            <div className="border-b border-gray-200 h-full"></div>
            <div className="border-b border-gray-200 h-full"></div>
            <div className="border-b border-gray-200 h-full"></div>
          </div>
          
          {/* Line graph */}
          <svg className="absolute inset-0" preserveAspectRatio="none" viewBox={`0 0 ${dataPoints.length - 1} 100`}>
            <defs>
              <linearGradient id="line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={gradientColors.from} />
                <stop offset="100%" stopColor={gradientColors.to} />
              </linearGradient>
            </defs>
            
            {/* Area under the line */}
            <path
              d={`
                M 0 ${100 - (dataPoints[0].value / maxValue) * 100}
                ${dataPoints.map((point, index) => `L ${index} ${100 - (point.value / maxValue) * 100}`).join(' ')}
                L ${dataPoints.length - 1} 100
                L 0 100
                Z
              `}
              fill="url(#line-gradient)"
              opacity="0.8"
            />
            
            {/* Line */}
            <path
              d={`
                M 0 ${100 - (dataPoints[0].value / maxValue) * 100}
                ${dataPoints.map((point, index) => `L ${index} ${100 - (point.value / maxValue) * 100}`).join(' ')}
              `}
              fill="none"
              stroke="rgba(59, 130, 246, 0.8)"
              strokeWidth="2"
              className="drop-shadow"
            />
            
            {/* Points */}
            {dataPoints.map((point, index) => (
              <circle
                key={index}
                cx={index}
                cy={100 - (point.value / maxValue) * 100}
                r={point.milestone ? "2" : "1.5"}
                fill={point.milestone ? "white" : "rgba(59, 130, 246, 0.8)"}
                stroke="rgba(59, 130, 246, 0.8)"
                strokeWidth={point.milestone ? "1.5" : "0"}
                className=""
              />
            ))}
          </svg>
          
          {/* X-axis labels */}
          <div className="absolute inset-x-0 bottom-0 flex justify-between text-xs text-gray-500">
            {dataPoints.map((point, index) => (
              <div key={index} className="text-center">
                {point.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultsGraph 