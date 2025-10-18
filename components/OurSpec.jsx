import React from 'react'
import Title from './Title'
import { ourSpecsData } from '@/assets/assets'

const OurSpecs = () => {

    return (
        <div className='px-6 my-20 max-w-6xl mx-auto'>
            {/* 1. Kept the Title component from your file */}
            <Title 
                visibleButton={false} 
                title='Our Commitment to Quality'
                description="Experience the authentic taste of Mangalorean seafood. We deliver premium, fresh-caught fish directly to you every weekend."
            />

            {/* 2. Replaced the grid with the new UI you liked */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {ourSpecsData.map((spec, index) => {
                // Use the component directly from 'spec.icon'
                const Icon = spec.icon;

                const colors = [
                  { bg: "bg-blue-100", text: "text-blue-600" },
                  { bg: "bg-green-100", text: "text-green-600" },
                  { bg: "bg-cyan-100", text: "text-cyan-600" },
                ];
                const color = colors[index % colors.length];

                return (
                  <div
                    key={spec.title}
                    className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div
                      className={`flex items-center justify-center w-16 h-16 rounded-full ${color.bg} mx-auto mb-6`}
                    >
                      <Icon className={`w-8 h-8 ${color.text}`} />
                    </div>

                    <h3 className="text-xl text-center font-semibold text-slate-900 mb-3">
                      {spec.title}
                    </h3>
                    <p className="text-slate-600 text-center">
                      {spec.description}
                    </p>
                  </div>
                );
              })}
            </div>

        </div>
    )
}

export default OurSpecs