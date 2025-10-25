'use client'
import { ArrowRight, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const ProductDescription = ({ product }) => {

    const [selectedTab, setSelectedTab] = useState('Description')

    return (
        // UPDATED: Reduced vertical margin for mobile
        <div className="my-12 sm:my-18 text-sm text-slate-600">

            {/* Tabs */}
            {/* UPDATED: Added 'overflow-x-auto' and 'flex-nowrap' for safety on small screens */}
            <div className="flex border-b border-slate-200 mb-6 max-w-2xl overflow-x-auto flex-nowrap no-scrollbar">
                {['Description', 'Reviews'].map((tab, index) => (
                    <button 
                        // UPDATED: Added 'flex-shrink-0' to prevent tabs from shrinking
                        className={`${tab === selectedTab ? 'border-b-[1.5px] border-green-600 text-green-600' : 'text-slate-400'} px-4 py-2 font-medium flex-shrink-0`} 
                        key={index} 
                        onClick={() => setSelectedTab(tab)}
                    >
                        {tab}
                    </button>
                ))}\
                {/* I see you removed the 'Store Page' tab, which is good. */}
            </div>

            {/* Description */}
            {selectedTab === "Description" && (
                <p className="max-w-xl leading-relaxed">{product.description}</p>
            )}

            {/* Reviews */}
            {selectedTab === "Reviews" && (
                <div className="flex flex-col gap-8 sm:gap-3 mt-10 sm:mt-14">
                    {product.rating.map((item,index) => (
                        // UPDATED: Made review item stack on mobile
                        <div key={index} className="flex flex-col sm:flex-row gap-4 sm:gap-5 pb-6 sm:pb-10 border-b last:border-b-0">
                            <Image src={item.user.image} alt="" className="size-10 rounded-full flex-shrink-0" width={100} height={100} />
                            <div>
                                <div className="flex items-center" >
                                    {Array(5).fill('').map((_, index) => (
                                        <StarIcon key={index} size={16} className='text-transparent' fill={item.rating >= index + 1 ? "#FBBF24" : "#D1D5DB"} />
                                    ))}
                                </div>
                                <p className="text-sm max-w-lg my-3 leading-relaxed">{item.review}</p>
                                <p className="font-medium text-slate-800">{item.user.name}</p>
                                <p className="mt-2 text-xs text-slate-500">{new Date(item.createdAt).toDateString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ProductDescription